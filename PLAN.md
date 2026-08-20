# The Embassy Restaurant — Website Project Plan

## 📋 Research Summary

### The Embassy Restaurant
| Field | Data |
|-------|------|
| **Name** | The Embassy Restaurant |
| **Location** | D-Block, Connaught Place, New Delhi 110001 |
| **Established** | 1948 (76+ years) |
| **Cuisine** | North Indian · Mughlai · Tandoor |
| **Instagram** | @theembassyindia — 2,487 followers, 295 posts |
| **Current web** | ❌ No website — only IG + Zomato |
| **Zomato** | Listed (high rating) |
| **Known for** | Butter Chicken, Dal Makhani, Galouti Kebab, Tandoori specialities |

### Gap Analysis
The Embassy has **no website** — only Instagram + Zomato presence. This is a massive opportunity:
- No online menu to browse
- No direct reservation system
- No AI menu assistant (differentiator)
- No online ordering (competitors have it)

---

## 🎯 Project Goals

1. **Professional restaurant website** — showcase The Embassy's heritage, menu, ambience
2. **AI Menu Assistant** — NVIDIA NIM-powered chatbot that knows the full menu + food images
3. **Online Ordering** — customer → waiter → kitchen flow with Supabase Realtime
4. **Admin Dashboard** — menu CRUD, order management, staff, analytics
5. **Staff Area** — waiter & kitchen interfaces with real-time order updates

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 14 (App Router) + TypeScript | SEO, SSR, file-based routing |
| **Styling** | Tailwind CSS | Rapid UI, responsive, already proven |
| **Backend/Auth** | Supabase (PostgreSQL + Auth + RLS) | Free tier, RLS, realtime, storage |
| **AI** | NVIDIA NIM (nvidia/nemotron-3-ultra-550b-a55b) | Already configured, no extra API key needed |
| **AI Embeddings** | NVIDIA Embeddings API or text-embedding-3-small | RAG for menu |
| **Realtime** | Supabase Realtime | Live order updates (waiter/kitchen) |
| **Storage** | Supabase Storage | Food images, gallery |
| **Deploy** | Vercel (frontend) + Supabase (backend) | Free tier, built-in CI/CD |

---

## 📐 Database Schema

### Roles & Auth
```sql
-- Supabase Auth handles user auth
-- Profiles table extends auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'waiter', 'kitchen', 'customer')),
  display_name TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true
);
```

### Menu
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_veg BOOLEAN DEFAULT false,
  is_most_selling BOOLEAN DEFAULT false,
  chef_special BOOLEAN DEFAULT false,
  tags TEXT[], -- e.g. ['spicy', 'gluten-free', 'popular']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  table_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled')),
  total_amount DECIMAL(10,2),
  special_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items,
  item_name TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  notes TEXT
);
```

### AI Knowledge Base
```sql
CREATE TABLE menu_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID REFERENCES menu_items ON DELETE CASCADE,
  content TEXT NOT NULL, -- combined name + description + category + tags
  embedding VECTOR(1536), -- NVIDIA embedding dimension
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policies
- **Public**: Read published categories, menu_items; create orders
- **Customers**: Read own orders
- **Waiters**: Read all pending/confirmed orders, update status
- **Kitchen**: Read confirmed/preparing orders, update status
- **Admin**: Full CRUD on all tables

---

## 🤖 AI Menu Assistant — NVIDIA NIM

### Architecture
```
User Query (e.g., "Best dish under ₹500?")
  → Query Classification (menu-related? → proceed)
  → Vector Search (menu_embeddings, top 5 matches)
  → Context Assembly (matching items + their images)
  → NVIDIA NIM API call (nemotron-3-ultra-550b-a55b)
    Prompt: [menu context + user query + "respond short, include image URLs"]
  → Response with dish images
```

### Features
| Feature | How | Data Source |
|---------|-----|-------------|
| **Best dish** | Most selling + chef special + ratings | `is_most_selling` + `chef_special` flags |
| **Budget pick** | Filter by price range → top-rated | `price` field |
| **Dietary** | Filter by `is_veg`, tags | `is_veg`, `tags` |
| **Show images** | Return `image_url` in response | Supabase Storage |
| **Pairing suggestions** | NIM recommends based on category + cuisine | Category + description |
| **Most selling** | Real order count from `orders` table | Aggregated order data |
| **Explain dish** | NIM generates description from menu data | Description + tags |

### NIM API Integration
```typescript
// /src/app/api/ai/chat/route.ts
const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'nvidia/nemotron-3-ultra-550b-a55b',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: query }
    ],
    temperature: 0.3,
    max_tokens: 500,
  })
});
```

### System Prompt
```
You are a helpful menu assistant for The Embassy Restaurant, Connaught Place, New Delhi.
You know the full menu — each dish, its description, price, category, and image URL.

Rules:
- Respond in SHORT, conversational text (max 3-4 lines)
- Always include the dish image URL when showing items
- Format: "**[Dish Name]** — ₹Price" on one line, then 1-2 lines of explanation
- For most selling: check menu_items.is_most_selling
- For budget picks: filter by price range
- For dietary: check is_veg, tags
- Never make up dishes not in the menu
- Respond in English + Hindi mix (Hinglish) naturally
- Be friendly and helpful, like a knowledgeable waiter
```

---

## 🛒 Order Flow

```
Customer on Website               Waiter (Dashboard)           Kitchen (Display)
┌─────────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ Browse menu         │          │ Live order queue │          │ Confirmed orders │
│ Add to cart         │          │ [New]  [Confirm] │          │ [Preparing]      │
│ Place order (name,  │ ─────>   │ Order #1: Table 3│ ─────>   │ Order #1:        │
│  phone, table,      │          │   Butter Chicken │          │   Butter Chicken │
│  special notes)     │          │   Dal Makhani    │          │   Dal Makhani    │
│                     │ Realtime │   [Confirm] [X]  │ Realtime  │   [Ready]        │
│                     │          │                  │          │                  │
│ Live order status <─── Supabase ─────────────────>│                  │
│ "Confirmed"        │  Channel │                  │          │                  │
│ "Preparing"        │          │                  │          │                  │
│ "Ready"            │          │                  │          │                  │
└─────────────────────┘          └─────────────────┘          └─────────────────┘
```

### Status Lifecycle
```
pending → confirmed (by waiter) → preparing (by kitchen) → ready (by kitchen) → served (by waiter)
    ↓
cancelled (by waiter/admin)
```

---

## 🗺️ Site Structure

```
/ (public)
├── Home           — Hero, about, signature dishes, stats, gallery preview
├── Menu           — Full menu with categories, images, filters (veg/non-veg/budget)
├── About          — Heritage story, 76-year legacy, photos
├── Gallery        — Restaurant ambience, dishes, behind-the-scenes
├── Contact        — Map, hours, phone, location, reservation form
└── AI Chat        — Floating widget on every page, or dedicated page

/waiter (protected — waiter role)
├── Dashboard      — New orders, confirm, mark served
└── Orders         — All today's orders, search by table/phone

/kitchen (protected — kitchen role)
├── Display        — Confirmed orders, mark preparing/ready
└── History        — Completed orders today

/admin (protected — admin role)
├── Dashboard      — Today's stats (orders, revenue, popular items)
├── Menu           — CRUD: categories, items, prices, images, tags
├── Orders         — All orders, filter by date/status
├── Staff          — Manage waiters, kitchen staff profiles
├── Analytics      — Most selling items, revenue trends, peak hours
└── Settings       — Restaurant info, hours, AI prompt config
```

---

## 📦 Phase Plan

### Phase 1: Foundation (Day 1-2)
- [ ] Next.js 14 project setup (App Router, TypeScript, Tailwind)
- [ ] Supabase project + schema + RLS
- [ ] Auth (admin, waiter, kitchen signup flow)
- [ ] Deployment to Vercel

### Phase 2: Public Website (Day 3-5)
- [ ] Home page (hero, about, signatures, stats, gallery)
- [ ] Menu page (categories, items with images, filters)
- [ ] About page (heritage, history, timeline)
- [ ] Gallery page (grid, categories)
- [ ] Contact page (map, hours, form)
- [ ] Responsive design (mobile-first)
- [ ] SEO meta tags, sitemap

### Phase 3: AI Menu Assistant (Day 6-7)
- [ ] Supabase vector extensions + menu_embeddings
- [ ] Embedding generation script (menu items → embeddings)
- [ ] NVIDIA NIM API integration
- [ ] Chat UI component (floating widget + full page)
- [ ] Image display in chat responses
- [ ] Edge cases: out-of-scope queries, fallback responses

### Phase 4: Order System (Day 8-10)
- [ ] Cart system (client-side, local storage)
- [ ] Order creation (public → Supabase)
- [ ] Realtime order channel setup
- [ ] Waiter dashboard (order list, confirm, cancel)
- [ ] Kitchen display (confirmed orders, preparing/ready)
- [ ] Customer order status tracking (real-time)
- [ ] Order history

### Phase 5: Admin Dashboard (Day 11-12)
- [ ] Menu CRUD (categories, items, images upload)
- [ ] Staff management (add/remove waiters, kitchen staff)
- [ ] Order management (filter, search, cancel)
- [ ] Analytics dashboard (sales, popular items, trends)
- [ ] Restaurant settings (hours, contact, tax)

### Phase 6: Polish & Launch (Day 13-14)
- [ ] Testing (all flows, RLS, error states)
- [ ] Performance optimization (images, caching)
- [ ] Final design polish
- [ ] Client demo & handoff
- [ ] Deployment documentation

---

## 🎨 Design Direction

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Cream | #FAF6EF |
| Text | Deep Green | #1E2A24 |
| Accent | Gold | #C5A24E |
| Secondary | Forest Green | #21402E |
| Highlight | Burgundy | #7A2B2B |
| Surface | White | #FFFFFF |

### Typography
- **Headings**: Playfair Display (serif, elegance)
- **Body**: Inter (sans-serif, readability)
- **Display**: Large serif for hero, tight letter-spacing for luxury

### Design References
- Heritage restaurant aesthetic (warm, timeless)
- Dark green + gold = classic Indian luxury
- Generous whitespace, full-bleed food photography
- Subtle gold lines and borders for refinement

---

## 📁 Project Structure

```
embassy-website/
├── src/
│   ├── app/
│   │   ├── (public)/           # Home, Menu, About, Gallery, Contact
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # Home
│   │   │   ├── menu/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (staff)/            # Waiter & Kitchen (auth required)
│   │   │   ├── waiter/page.tsx
│   │   │   └── kitchen/page.tsx
│   │   ├── (admin)/            # Admin dashboard (admin role)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── menu/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── staff/page.tsx
│   │   │   └── analytics/page.tsx
│   │   └── api/
│   │       ├── ai/chat/route.ts
│   │       ├── orders/route.ts
│   │       └── menu/route.ts
│   ├── components/
│   │   ├── ui/                 # Button, Card, Badge, Input, Select
│   │   ├── sections/           # Hero, MenuCard, Gallery, Testimonial
│   │   ├── chat/               # AIChatButton, AIChatWidget, AIChatFull
│   │   └── orders/             # OrderCard, OrderStatus, Cart
│   ├── lib/
│   │   ├── supabase/client.ts
│   │   ├── supabase/server.ts
│   │   └── nvidia/ai.ts
│   ├── types/
│   │   └── database.ts
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
├── supabase/
│   └── migrations/
│       ├── 001_profiles.sql
│       ├── 002_categories.sql
│       ├── 003_menu_items.sql
│       ├── 004_orders.sql
│       ├── 005_menu_embeddings.sql
│       └── 006_rls.sql
├── scripts/
│   ├── seed-menu.ts
│   └── generate-embeddings.ts
└── package.json
```

---

## 🚀 Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| NVIDIA NIM API rate limits | Cache common queries, fallback to menu-only response |
| Supabase free tier limits | 500MB DB, 2GB storage — enough for menu + images |
| Customer doesn't provide real menu/images | Use placeholders, handoff to client for final content |
| Order flow complexity | Start simple (no payments), add features iteratively |
| AI hallucination (wrong dishes) | Strong system prompt + menu context injection + temperature 0.3 |

---

## 📊 Success Metrics

- [ ] **Public site**: Loads < 3s, responsive, all pages render
- [ ] **AI Chat**: Responses within 2-3s, images load, no hallucination
- [ ] **Order flow**: Waiter sees order within 5s of customer submitting
- [ ] **Admin**: Menu CRUD works, order management, analytics show real data
- [ ] **Client demo**: Can be shown to The Embassy owner as a working prototype

---

*Plan generated: 2026-08-20 · Ready for Phase 1 build*