"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";
import MenuCard from "@/components/MenuCard";
import { MENU, CATEGORIES, formatPrice } from "@/lib/menu-data";
import { getCart, placeOrder, clearCart } from "@/lib/store";

function MenuPageInner() {
  const params = useSearchParams();
  const checkout = params.get("checkout") === "1";

  const [activeCat, setActiveCat] = useState("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", table: "1", notes: "" });

  // cart reads localStorage on each render for checkout display
  const cart = getCart();

  const filtered = useMemo(() => {
    let items = MENU;
    if (activeCat !== "all") items = items.filter((m) => m.category === activeCat);
    if (vegOnly) items = items.filter((m) => m.isVeg);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q) ||
          m.category.includes(q)
      );
    }
    return items;
  }, [activeCat, vegOnly, search]);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const order = placeOrder(form.name, form.phone, form.table, form.notes);
    if (order) {
      setOrderId(order.id);
      setOrderPlaced(true);
      clearCart();
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      {/* Header */}
      <header className="pt-32 pb-12 bg-[#16291d] text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
          The Full Menu
        </div>
        <h1 className="font-serif-display text-4xl md:text-5xl text-[#f3eee3] mt-3">
          100+ dishes, cooked to order
        </h1>
        <p className="text-[#e4ce9c]/80 font-light mt-4 max-w-xl mx-auto px-4">
          North Indian · Mughlai · Continental · Bar — sab kuch ek jagah.
          AI assistant se poochhiye kya acha lagega!
        </p>
      </header>

      {/* Category tabs */}
      <div className="sticky top-0 z-30 bg-[#faf6ef]/95 backdrop-blur border-b border-[#21402e]/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCat("all")}
            className={`whitespace-nowrap text-[11px] tracking-[0.14em] uppercase px-4 py-2 rounded-full transition-colors ${
              activeCat === "all"
                ? "bg-[#21402e] text-[#f3eee3]"
                : "bg-white border border-[#21402e]/15 text-[#21402e] hover:bg-[#f3ecdf]"
            }`}
          >
            All ({MENU.length})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCat(c.slug)}
              className={`whitespace-nowrap text-[11px] tracking-[0.14em] uppercase px-4 py-2 rounded-full transition-colors ${
                activeCat === c.slug
                  ? "bg-[#21402e] text-[#f3eee3]"
                  : "bg-white border border-[#21402e]/15 text-[#21402e] hover:bg-[#f3ecdf]"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3 flex items-center gap-4 flex-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes... (butter chicken, biryani, ₹500)"
            className="flex-1 min-w-[200px] bg-white border border-[#21402e]/15 rounded-full px-5 py-2.5 text-[13px] outline-none focus:border-[#c5a24e]"
          />
          <label className="flex items-center gap-2 text-[12px] text-[#21402e] cursor-pointer">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="accent-[#21402e]"
            />
            Veg Only 🥦
          </label>
        </div>
      </div>

      {/* Menu grid */}
      <section className="py-12 min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-[#6b756e] font-light">
                Kuch nahi mila — search ya filter change karke dekhiye.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CHECKOUT */}
      {checkout && !orderPlaced && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-7 py-5 border-b border-[#21402e]/10 flex items-center justify-between">
              <h3 className="font-serif-display text-xl text-[#16291d]">Checkout</h3>
              <Link href="/menu" className="text-[#6b756e] hover:text-[#16291d]">
                ✕
              </Link>
            </div>
            <div className="px-7 py-5">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-[#6b756e]">Aapka order khaali hai. Pehle dishes add karein!</p>
                  <Link
                    href="/menu"
                    className="inline-block mt-4 bg-[#21402e] text-[#f3eee3] text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div key={c.id} className="flex justify-between text-[13px] border-b border-[#21402e]/5 pb-2">
                        <span className="text-[#1e2a24]">
                          {c.qty}× {c.name}
                        </span>
                        <span className="text-[#7a2b2b]">{formatPrice(c.price * c.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={submitOrder} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#c5a24e]"
                      />
                      <input
                        required
                        placeholder="Phone number"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#c5a24e]"
                      />
                    </div>
                    <select
                      value={form.table}
                      onChange={(e) => setForm({ ...form, table: e.target.value })}
                      className="w-full bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#c5a24e]"
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Takeaway"].map((t) => (
                        <option key={t} value={t}>
                          {t === "Takeaway" ? "Takeaway / Pickup" : `Table ${t}`}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={2}
                      placeholder="Special notes (optional) — jaise 'extra spicy', 'no onion'"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-4 py-3 text-[13px] outline-none focus:border-[#c5a24e]"
                    />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[13px] text-[#6b756e]">Total</span>
                      <span className="font-serif-display text-2xl text-[#16291d]">{formatPrice(total)}</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#c5a24e] text-[#16291d] text-[12px] tracking-[0.22em] uppercase py-4 rounded font-semibold hover:bg-[#e4ce9c] transition-colors"
                    >
                      Place Order → Waiter Confirm Karega
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ORDER CONFIRMED */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-serif-display text-2xl text-[#16291d]">Order Placed!</h3>
            <p className="text-[#6b756e] font-light mt-3">
              Aapka order <span className="font-bold text-[#7a2b2b]">#{orderId}</span> waiter ke
              paas pahunch gaya hai. Waiter confirm karke kitchen ko bhejega — aap{" "}
              <Link href="/staff" className="text-[#21402e] underline">
                staff page
              </Link>{" "}
              pe status dekh sakte hain.
            </p>
            <button
              onClick={() => {
                setOrderPlaced(false);
                window.location.href = "/menu";
              }}
              className="mt-6 bg-[#21402e] text-[#f3eee3] text-[12px] tracking-[0.2em] uppercase px-8 py-3.5 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuPageInner />
    </Suspense>
  );
}
