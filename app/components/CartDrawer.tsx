"use client";
import { useState, useEffect } from "react";
import { getCart, updateCartQty, removeFromCart } from "@/lib/store";
import { formatPrice } from "@/lib/menu-data";
import Link from "next/link";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(getCart());

  const refresh = () => {
    setCart(getCart());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("cart-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#16291d] text-[#f3eee3] px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
        title="Your order"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
        <span className="text-[12px] tracking-[0.14em] uppercase">Order</span>
        {count > 0 && (
          <span className="bg-[#c5a24e] text-[#16291d] text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[400px] max-w-[90vw] bg-white shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-[#21402e]/10 flex items-center justify-between">
              <h3 className="font-serif-display text-xl text-[#16291d]">
                Your Order
              </h3>
              <button onClick={() => setOpen(false)} className="text-[#6b756e] hover:text-[#16291d]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-[#6b756e] font-light">Order abhi khaali hai.</p>
                  <Link
                    href="/menu"
                    onClick={() => setOpen(false)}
                    className="inline-block mt-5 bg-[#21402e] text-[#f3eee3] text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 border-b border-[#21402e]/5 pb-4">
                      <div className="flex-1">
                        <div className="text-[14px] text-[#1e2a24] font-medium">{c.name}</div>
                        <div className="text-[12px] text-[#7a2b2b]">{formatPrice(c.price)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (c.qty <= 1) removeFromCart(c.id);
                            else updateCartQty(c.id, c.qty - 1);
                            refresh();
                          }}
                          className="w-7 h-7 rounded-full border border-[#21402e]/20 flex items-center justify-center text-[#21402e] hover:bg-[#f3ecdf]"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[14px]">{c.qty}</span>
                        <button
                          onClick={() => {
                            updateCartQty(c.id, c.qty + 1);
                            refresh();
                          }}
                          className="w-7 h-7 rounded-full border border-[#21402e]/20 flex items-center justify-center text-[#21402e] hover:bg-[#f3ecdf]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(c.id);
                          refresh();
                        }}
                        className="text-[#6b756e] hover:text-[#7a2b2b]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#21402e]/10">
                <div className="flex justify-between mb-4">
                  <span className="text-[13px] uppercase tracking-[0.16em] text-[#6b756e]">Total</span>
                  <span className="font-serif-display text-xl text-[#16291d]">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/menu?checkout=1"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-[#c5a24e] text-[#16291d] text-[12px] tracking-[0.22em] uppercase py-3.5 rounded hover:bg-[#e4ce9c] transition-colors font-semibold"
                >
                  Checkout & Place Order
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
