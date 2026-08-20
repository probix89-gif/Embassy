"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";

const ALL = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900&auto=format&fit=crop", cap: "The Dining Room", tag: "restaurant" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=900&auto=format&fit=crop", cap: "Morning Table", tag: "food" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=900&auto=format&fit=crop", cap: "Evenings at CP", tag: "restaurant" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=900&auto=format&fit=crop", cap: "From Our Kitchen", tag: "food" },
  { src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=900&auto=format&fit=crop", cap: "Private Dining", tag: "restaurant" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=900&auto=format&fit=crop", cap: "The Tandoor", tag: "kitchen" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop", cap: "Seasonal Special", tag: "food" },
  { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=900&auto=format&fit=crop", cap: "Dal Makhani", tag: "food" },
  { src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=900&auto=format&fit=crop", cap: "Butter Chicken", tag: "food" },
  { src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=900&auto=format&fit=crop", cap: "Tandoori Chicken", tag: "food" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=900&auto=format&fit=crop", cap: "From the Tandoor", tag: "kitchen" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop", cap: "The Embassy Room", tag: "restaurant" },
];

const TABS = [
  { slug: "all", label: "All" },
  { slug: "food", label: "Food" },
  { slug: "restaurant", label: "Restaurant" },
  { slug: "kitchen", label: "Kitchen" },
];

export default function GalleryPage() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? ALL : ALL.filter((i) => i.tag === tab);

  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      <header className="pt-36 pb-14 bg-[#16291d] text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
          Gallery
        </div>
        <h1 className="font-serif-display text-4xl md:text-5xl text-[#f3eee3] mt-3">
          Moments at The Embassy
        </h1>
        <p className="text-[#e4ce9c]/80 font-light mt-4">
          Follow <span className="text-[#c5a24e]">@theembassyindia</span> on Instagram for daily glimpses.
        </p>
      </header>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.slug}
                onClick={() => setTab(t.slug)}
                className={`text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 rounded-full transition-colors ${
                  tab === t.slug
                    ? "bg-[#21402e] text-[#f3eee3]"
                    : "bg-white border border-[#21402e]/15 text-[#21402e] hover:bg-[#f3ecdf]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
            {filtered.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-lg ${i % 5 === 0 ? "row-span-2" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.cap}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-14 bg-gradient-to-t from-[#16291d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#fdfaf3] text-[11px] tracking-[0.22em] uppercase">
                    {img.cap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
