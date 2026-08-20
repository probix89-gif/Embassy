"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2 guests", msg: "" });

  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      <header className="pt-36 pb-14 bg-[#16291d] text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
          Visit Us
        </div>
        <h1 className="font-serif-display text-4xl md:text-5xl text-[#f3eee3] mt-3">
          We look forward to hosting you
        </h1>
      </header>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            {[
              { icon: "📍", t: "Address", d: "11-D, Middle Circle, Connaught Place", s: "New Delhi, Delhi 110001" },
              { icon: "🕛", t: "Hours", d: "12:30 PM – 11:00 PM", s: "Open all days · Lunch & Dinner" },
              { icon: "📞", t: "Reservations", d: "+91 98XXX XXXXX", s: "For parties of 6+, please call ahead" },
              { icon: "📱", t: "Online", d: "@theembassyindia · Instagram", s: "Book via Zomato · 4.0★ rating" },
            ].map((r) => (
              <div key={r.t} className="flex gap-5 py-5 border-b border-[#21402e]/10">
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#c5a24e] flex items-center justify-center text-lg">
                  {r.icon}
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.26em] uppercase text-[#c5a24e] font-semibold">
                    {r.t}
                  </div>
                  <div className="text-[15px] text-[#39473e] mt-1">{r.d}</div>
                  <div className="text-[12.5px] text-[#7c867f] font-light">{r.s}</div>
                </div>
              </div>
            ))}
            <div className="mt-8 bg-[#f3ecdf] border border-[#c5a24e]/30 rounded-lg p-5">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#7a2b2b] font-semibold mb-2">
                💡 Dining offers (Zomato)
              </div>
              <ul className="text-[13px] text-[#39473e] font-light space-y-1.5">
                <li>• Flat 15% OFF — 3 to 4 PM pre-book</li>
                <li>• Flat 15% OFF on bill payments</li>
                <li>• 25% OFF up to ₹5,000 (RBL LUMIÈRE card)</li>
              </ul>
            </div>
          </div>

          {/* Reservation form */}
          <div className="bg-[#21402e] rounded-2xl p-8 text-[#f3eee3] h-fit">
            {sent ? (
              <div className="text-center py-14">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="font-serif-display text-2xl">Request Received!</h3>
                <p className="text-[#e4ce9c] font-light mt-3">
                  Hum aapko call karke booking confirm karenge. Shukriya!
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif-display text-2xl mb-1">Reserve a Table</h3>
                <p className="text-[12px] text-[#e4ce9c]/80 mb-7">
                  Hum aapki booking 1 ghante me confirm karenge.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-white/7 border border-white/22 rounded-lg px-4 py-3 text-[13px] text-[#f3eee3] placeholder-[#f3eee3]/40 outline-none focus:border-[#c5a24e]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-white/7 border border-white/22 rounded-lg px-4 py-3 text-[13px] text-[#f3eee3] placeholder-[#f3eee3]/40 outline-none focus:border-[#c5a24e]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="bg-white/7 border border-white/22 rounded-lg px-4 py-3 text-[13px] text-[#f3eee3] outline-none focus:border-[#c5a24e] [color-scheme:dark]"
                    />
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="bg-white/7 border border-white/22 rounded-lg px-4 py-3 text-[13px] text-[#f3eee3] outline-none focus:border-[#c5a24e] [&>option]:text-[#16291d]"
                    >
                      {["2 guests", "4 guests", "6 guests", "8+ guests"].map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Special requests (optional)"
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    className="w-full bg-white/7 border border-white/22 rounded-lg px-4 py-3 text-[13px] text-[#f3eee3] placeholder-[#f3eee3]/40 outline-none focus:border-[#c5a24e]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#c5a24e] text-[#16291d] text-[12px] tracking-[0.22em] uppercase py-4 rounded font-semibold hover:bg-[#e4ce9c] transition-colors"
                  >
                    Request Reservation
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-[#21402e]/10 h-[380px] bg-[#f3ecdf] relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">🗺️</div>
              <div className="font-serif-display text-xl text-[#16291d]">
                11-D, Middle Circle, Connaught Place
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=28.6336834722,77.2212360799"
                target="_blank"
                rel="noreferrer"
                className="mt-4 bg-[#21402e] text-[#f3eee3] text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
