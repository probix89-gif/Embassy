"use client";
import { useState } from "react";
import { addToCart } from "@/lib/store";
import type { MenuItem } from "@/lib/menu-data";
import { formatPrice } from "@/lib/menu-data";

export default function MenuCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    window.dispatchEvent(new Event("cart-updated"));
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="bg-white border border-[#21402e]/10 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-48 bg-[#f3ecdf] overflow-hidden">
        {item.image && !imgErr ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f3ecdf] to-[#e4ce9c]">
            <span className="text-5xl">{item.isVeg ? "🥘" : "🍗"}</span>
          </div>
        )}
        {item.chefSpecial && (
          <span className="absolute top-3 left-3 bg-[#7a2b2b] text-white text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded">
            Chef&apos;s Special
          </span>
        )}
        {item.mostSelling && (
          <span className="absolute top-3 right-3 bg-[#c5a24e] text-[#16291d] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded font-semibold">
            ★ Bestseller
          </span>
        )}
        {item.signature && (
          <span className="absolute bottom-3 left-3 bg-[#16291d] text-[#e4ce9c] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded">
            Signature
          </span>
        )}
        <span
          className={`absolute bottom-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
            item.isVeg ? "border-green-600 text-green-700" : "border-red-600 text-red-700"
          } bg-white`}
          title={item.isVeg ? "Veg" : "Non-Veg"}
        >
          {item.isVeg ? "V" : "N"}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif-display text-lg text-[#16291d] leading-snug">
            {item.name}
          </h3>
          <span className="font-serif-display text-[#7a2b2b] font-semibold whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        {!compact && (
          <p className="text-[12.5px] text-[#6b756e] mt-2 leading-relaxed">
            {item.desc}
          </p>
        )}
        <button
          onClick={handleAdd}
          className={`mt-4 w-full py-2.5 text-[11px] tracking-[0.2em] uppercase rounded transition-all ${
            added
              ? "bg-green-700 text-white"
              : "bg-[#21402e] text-[#f3eee3] hover:bg-[#c5a24e] hover:text-[#16291d]"
          }`}
        >
          {added ? "✓ Added to Order" : "+ Add to Order"}
        </button>
      </div>
    </div>
  );
}
