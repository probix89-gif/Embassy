import { NextRequest } from "next/server";
import { MENU } from "@/lib/menu-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Compact menu context for the AI (name + price + veg + tags + desc)
const menuContext = MENU.map(
  (m) =>
    `${m.name} | ₹${m.price} | ${m.isVeg ? "VEG" : "NON-VEG"}${
      m.chefSpecial ? " | CHEF'S SPECIAL" : ""
    }${m.mostSelling ? " | MOST SELLING" : ""}${
      m.signature ? " | SIGNATURE" : ""
    }${m.spicy ? " | SPICY" : ""} | ${m.desc}`
).join("\n");

const SYSTEM_PROMPT = `You are "Embassy Assistant" — the friendly AI menu guide for The Embassy restaurant, 11-D, Middle Circle, Connaught Place, New Delhi. A legendary North Indian & Continental restaurant since 1948 (4.0★ on Zomato, 2000+ reviews).

You know the COMPLETE menu (100+ items) — every dish, price, description, veg/non-veg status, and what's a Chef's Special, Signature, Most Selling or Spicy.

THE MENU (name | price | veg | tags | description):
${menuContext}

RULES:
1. Respond in SHORT, friendly Hinglish (Hindi + English, Roman script) — 3-4 lines max.
2. When recommending dishes, format as: **[Dish Name]** — ₹price (VEG/NON-VEG) then 1 line why.
3. "Best dish / most selling" → recommend MOST SELLING + CHEF'S SPECIAL items (Butter Chicken, Dal Makhani, Paneer Tikka, Chicken Biryani, Embassy Rolls, Kebab Platter).
4. "Budget / cheap / low price" → filter by price: under ₹300, under ₹400, under ₹500 etc.
5. "Veg / non-veg / spicy / healthy" → filter by those tags.
6. NEVER invent dishes not in the menu. If asked about something not on the menu, say "Yeh dish menu pe nahi hai, par aap ye try kar sakte hain: [suggestion from menu]".
7. For bar/drinks questions, only recommend from the bar & beverages items.
8. Be warm and helpful, like a knowledgeable Delhi waiter who loves his restaurant.
9. If the question is not about food/menu/restaurant (politics, coding, etc.), politely say you only know about The Embassy's food & restaurant, and offer menu help.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "NVIDIA_API_KEY not configured on server" },
        { status: 500 }
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-6) : []),
      { role: "user", content: message },
    ];

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);

    try {
      const res = await fetch(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-3-ultra-550b-a55b",
            messages,
            temperature: 0.4,
            max_tokens: 400,
            top_p: 0.9,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timer);

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error("NVIDIA API error:", res.status, errText.slice(0, 300));
        return Response.json(
          { error: `NVIDIA API error: ${res.status}` },
          { status: 502 }
        );
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return Response.json({ error: "Empty AI response" }, { status: 502 });
      }

      return Response.json({ reply });
    } finally {
      clearTimeout(timer);
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const isAbort = e instanceof Error && e.name === "AbortError";
    console.error("AI route error:", msg);
    return Response.json(
      { error: isAbort ? "AI timed out" : "AI request failed" },
      { status: 500 }
    );
  }
}
