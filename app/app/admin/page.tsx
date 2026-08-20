"use client";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";
import {
  todayOrders,
  initStaff,
  staffLogin,
  getStaff,
  type StaffUser,
  type Order,
} from "@/lib/store";
import { MENU, CATEGORIES, formatPrice } from "@/lib/menu-data";

export default function AdminPage() {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<"dashboard" | "orders" | "menu" | "staff">("dashboard");

  useEffect(() => {
    initStaff();
    refresh();
    const t = setInterval(refresh, 4000);
    return () => clearInterval(t);
  }, []);

  const refresh = () => setOrders(todayOrders());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = staffLogin(pin);
    if (u && u.role === "admin") {
      setUser(u);
      setPin("");
    } else {
      setErr("Admin PIN chahiye (0000)");
    }
  };

  // Stats
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const completed = orders.filter((o) => o.status === "served").length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const active = orders.filter((o) => ["confirmed", "preparing"].includes(o.status)).length;

  // Popular items from orders
  const popular = useMemo(() => {
    const counts = new Map<string, { name: string; qty: number; revenue: number }>();
    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((o) =>
        o.items.forEach((i) => {
          const cur = counts.get(i.itemId) || { name: i.name, qty: 0, revenue: 0 };
          cur.qty += i.qty;
          cur.revenue += i.qty * i.price;
          counts.set(i.itemId, cur);
        })
      );
    return Array.from(counts.entries()).sort((a, b) => b[1].qty - a[1].qty).slice(0, 8);
  }, [orders]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] pt-20">
          <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🛡️</div>
              <h2 className="font-serif-display text-2xl text-[#16291d]">Admin Login</h2>
              <p className="text-[12px] text-[#6b756e] mt-2 font-light">Demo PIN: 0000</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Admin PIN"
                className="w-full bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-5 py-3.5 text-center text-lg outline-none focus:border-[#c5a24e]"
                autoFocus
              />
              {err && <p className="text-[#7a2b2b] text-[12px]">{err}</p>}
              <button
                type="submit"
                className="w-full bg-[#16291d] text-[#f3eee3] text-[12px] tracking-[0.2em] uppercase py-3.5 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const staff = getStaff();

  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      <header className="pt-28 pb-8 bg-[#16291d]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[#c5a24e]">ADMIN</div>
            <h1 className="font-serif-display text-2xl text-[#f3eee3] mt-1">The Embassy Dashboard</h1>
          </div>
          <button
            onClick={() => setUser(null)}
            className="text-[11px] tracking-[0.2em] uppercase border border-white/30 text-white/80 px-5 py-2.5 rounded hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { slug: "dashboard", label: "📊 Dashboard" },
              { slug: "orders", label: "📋 Orders" },
              { slug: "menu", label: "🍽️ Menu (100+)" },
              { slug: "staff", label: "👥 Staff" },
            ].map((t) => (
              <button
                key={t.slug}
                onClick={() => setView(t.slug as "dashboard" | "orders" | "menu" | "staff")}
                className={`text-[11px] tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-colors ${
                  view === t.slug
                    ? "bg-[#21402e] text-white"
                    : "bg-white border border-[#21402e]/15 text-[#21402e] hover:bg-[#f3ecdf]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* DASHBOARD */}
          {view === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Today's Revenue", value: formatPrice(totalRevenue), icon: "💰" },
                  { label: "Orders Served", value: String(completed), icon: "✅" },
                  { label: "Pending", value: String(pending), icon: "⏳" },
                  { label: "In Progress", value: String(active), icon: "🔥" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl border border-[#21402e]/10 p-6 shadow-sm">
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="font-serif-display text-2xl text-[#16291d]">{s.value}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#7c867f] mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-[#21402e]/10 p-6 shadow-sm">
                <h3 className="font-serif-display text-xl text-[#16291d] mb-5">🔥 Most Ordered Today</h3>
                {popular.length === 0 ? (
                  <p className="text-[#6b756e] font-light text-[13px]">
                    Aaj abhi tak koi order nahi aaya. Menu pe jaa kar order test karo!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {popular.map(([id, p], i) => (
                      <div key={id} className="flex items-center gap-4">
                        <span className="w-6 text-center font-serif-display text-[#c5a24e]">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-[#1e2a24] font-medium">{p.name}</span>
                            <span className="text-[#7a2b2b]">{p.qty}× · {formatPrice(p.revenue)}</span>
                          </div>
                          <div className="h-1.5 bg-[#f3ecdf] rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#c5a24e] to-[#7a2b2b] rounded-full"
                              style={{ width: `${(p.qty / popular[0][1].qty) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-[#21402e]/10 p-6 shadow-sm">
                <h3 className="font-serif-display text-xl text-[#16291d] mb-4">🤖 AI Assistant Note</h3>
                <p className="text-[13px] text-[#6b756e] font-light leading-relaxed">
                  Menu assistant NVIDIA NIM (nemotron-3-ultra-550b) se chalta hai — poora menu
                  yaad hai, most-selling real order data se update hota rahega. &quot;Most selling&quot;
                  flag manually set kiya ja sakta hai menu tab me.
                </p>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {view === "orders" && (
            <div className="bg-white rounded-xl border border-[#21402e]/10 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#21402e]/10">
                <h3 className="font-serif-display text-lg text-[#16291d]">All Today&apos;s Orders ({orders.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="text-[10px] tracking-[0.18em] uppercase text-[#7c867f] border-b border-[#21402e]/10">
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Table</th>
                      <th className="px-6 py-3">Items</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-[#21402e]/5 hover:bg-[#faf6ef]">
                        <td className="px-6 py-3 font-semibold text-[#16291d]">#{o.id}</td>
                        <td className="px-6 py-3">{o.customerName}</td>
                        <td className="px-6 py-3">{o.tableNo}</td>
                        <td className="px-6 py-3 text-[#6b756e]">
                          {o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                        </td>
                        <td className="px-6 py-3 text-[#7a2b2b] font-medium">{formatPrice(o.total)}</td>
                        <td className="px-6 py-3">
                          <span className={`text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded ${
                            o.status === "pending" ? "bg-[#c5a24e]/20 text-[#c5a24e]"
                            : o.status === "confirmed" ? "bg-[#21402e]/10 text-[#21402e]"
                            : o.status === "preparing" ? "bg-[#7a2b2b]/10 text-[#7a2b2b]"
                            : o.status === "ready" ? "bg-green-100 text-green-700"
                            : o.status === "served" ? "bg-gray-100 text-gray-500"
                            : "bg-red-50 text-red-600"
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-[#6b756e]">
                          {new Date(o.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-[#6b756e] font-light">
                          Aaj koi order nahi.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MENU */}
          {view === "menu" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-serif-display text-xl text-[#16291d]">
                  Menu Items ({MENU.length})
                </h3>
                <span className="text-[11px] text-[#6b756e] bg-[#f3ecdf] px-4 py-2 rounded-full">
                  Demo mode — data lib/menu-data.ts me edit hota hai
                </span>
              </div>
              {CATEGORIES.map((cat) => {
                const items = MENU.filter((m) => m.category === cat.slug);
                return (
                  <div key={cat.slug} className="bg-white rounded-xl border border-[#21402e]/10 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-[#faf6ef] border-b border-[#21402e]/10 flex items-center justify-between">
                      <h4 className="font-serif-display text-base text-[#16291d]">
                        {cat.emoji} {cat.name} ({items.length})
                      </h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-px bg-[#21402e]/5">
                      {items.map((item) => (
                        <div key={item.id} className="px-6 py-3.5 bg-white flex items-center gap-3">
                          <span className={`w-5 h-5 shrink-0 rounded-full border-2 text-[9px] font-bold flex items-center justify-center ${
                            item.isVeg ? "border-green-600 text-green-700" : "border-red-600 text-red-700"
                          }`}>
                            {item.isVeg ? "V" : "N"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] text-[#1e2a24] truncate">
                              {item.name}
                              {item.chefSpecial && <span className="text-[#7a2b2b]"> ★</span>}
                              {item.mostSelling && <span className="text-[#c5a24e]"> 🔥</span>}
                            </div>
                            <div className="text-[11px] text-[#7c867f] truncate">{item.desc}</div>
                          </div>
                          <span className="text-[13px] text-[#7a2b2b] font-medium whitespace-nowrap">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STAFF */}
          {view === "staff" && (
            <div className="bg-white rounded-xl border border-[#21402e]/10 shadow-sm p-6">
              <h3 className="font-serif-display text-xl text-[#16291d] mb-5">Staff Accounts</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {staff.map((s) => (
                  <div key={s.id} className="border border-[#21402e]/10 rounded-lg p-5">
                    <div className="text-3xl mb-2">
                      {s.role === "waiter" ? "🤵" : s.role === "kitchen" ? "👨‍🍳" : "🛡️"}
                    </div>
                    <div className="font-medium text-[#16291d]">{s.name}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#7c867f] mt-1">
                      {s.role} · PIN {s.pin}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#faf6ef] border border-[#c5a24e]/30 rounded-lg p-5 text-[12.5px] text-[#6b756e] font-light leading-relaxed">
                <b className="text-[#16291d]">Admin actions:</b> menu edit, staff manage, order
                cancel, analytics — ye demo mode me localStorage pe chalta hai. Production me
                Supabase + RLS se replace hoga (PLAN.md me schema ready hai).
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}