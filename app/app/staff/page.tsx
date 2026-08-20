"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";
import {
  updateOrderStatus,
  initStaff,
  staffLogin,
  todayOrders,
  type StaffUser,
  type Order,
  type OrderStatus,
} from "@/lib/store";
import { formatPrice } from "@/lib/menu-data";

export default function StaffPage() {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<OrderStatus | "all">("pending");

  useEffect(() => {
    initStaff();
    refresh();
    const t = setInterval(refresh, 3000);
    return () => clearInterval(t);
  }, []);

  const refresh = () => setOrders(todayOrders());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const u = staffLogin(pin);
    if (u) {
      setUser(u);
      setPin("");
    } else {
      setErr("Wrong PIN. Try: 1234 (waiter), 5678 (kitchen), 0000 (admin)");
    }
  };

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  if (!user) {
    return (
      <>
        <Navbar />
        <AIChatWidget />
        <CartDrawer />
        <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] pt-20">
          <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🔐</div>
              <h2 className="font-serif-display text-2xl text-[#16291d]">Staff Login</h2>
              <p className="text-[12px] text-[#6b756e] mt-2 font-light">
                Demo PINs: 1234 · 5678 · 0000
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your PIN"
                className="w-full bg-[#faf6ef] border border-[#21402e]/15 rounded-lg px-5 py-3.5 text-center text-lg outline-none focus:border-[#c5a24e]"
                autoFocus
              />
              {err && <p className="text-[#7a2b2b] text-[12px]">{err}</p>}
              <button
                type="submit"
                className="w-full bg-[#21402e] text-[#f3eee3] text-[12px] tracking-[0.2em] uppercase py-3.5 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="pt-28 pb-8 bg-[#16291d]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[#c5a24e]">
              {user.role.toUpperCase()}
            </div>
            <h1 className="font-serif-display text-2xl text-[#f3eee3] mt-1">
              Welcome, {user.name}
            </h1>
          </div>
          <button
            onClick={() => setUser(null)}
            className="text-[11px] tracking-[0.2em] uppercase border border-white/30 text-white/80 px-5 py-2.5 rounded hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["all", "pending", "confirmed", "preparing", "ready", "served", "cancelled"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full transition-colors ${
                  tab === t
                    ? "bg-[#21402e] text-white"
                    : "bg-white border border-[#21402e]/15 text-[#21402e] hover:bg-[#f3ecdf]"
                }`}
              >
                {t} ({orders.filter((o) => t === "all" || o.status === t).length})
              </button>
            ))}
          </div>

          {/* Orders */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📋</div>
              <p className="text-[#6b756e] font-light">
                No {tab === "all" ? "" : tab} orders right now.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((order) => (
                <div
                  key={order.id}
                  className={`bg-white rounded-xl border p-5 shadow-sm ${
                    order.status === "pending"
                      ? "border-[#c5a24e]/50 shadow-[#c5a24e]/10"
                      : order.status === "confirmed"
                      ? "border-[#21402e]/30"
                      : order.status === "preparing"
                      ? "border-[#7a2b2b]/30"
                      : order.status === "ready"
                      ? "border-green-500/30"
                      : "border-[#21402e]/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-[#16291d] text-lg">#{order.id}</span>
                    <span
                      className={`text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded ${
                        order.status === "pending"
                          ? "bg-[#c5a24e]/20 text-[#c5a24e]"
                          : order.status === "confirmed"
                          ? "bg-[#21402e]/10 text-[#21402e]"
                          : order.status === "preparing"
                          ? "bg-[#7a2b2b]/10 text-[#7a2b2b]"
                          : order.status === "ready"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#6b756e]">
                    {order.customerName} · Table {order.tableNo}
                    {order.customerPhone && ` · ${order.customerPhone}`}
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[13px]">
                        <span className="text-[#1e2a24]">
                          {item.qty}× {item.name}
                        </span>
                        <span className="text-[#7a2b2b]">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <div className="mt-2 text-[11px] text-[#7a2b2b] italic bg-[#faf6ef] px-3 py-1.5 rounded">
                      📝 {order.notes}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#21402e]/5">
                    <span className="font-serif-display text-lg text-[#16291d]">
                      {formatPrice(order.total)}
                    </span>
                    <div className="flex gap-1.5">
                      {/* Waiter actions */}
                      {user.role === "waiter" && order.status === "pending" && (
                        <>
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, "confirmed");
                              refresh();
                            }}
                            className="bg-[#21402e] text-white text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, "cancelled");
                              refresh();
                            }}
                            className="border border-[#7a2b2b]/30 text-[#7a2b2b] text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded"
                          >
                            ✕
                          </button>
                        </>
                      )}
                      {user.role === "waiter" && order.status === "ready" && (
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, "served");
                            refresh();
                          }}
                          className="bg-green-600 text-white text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                          Mark Served
                        </button>
                      )}
                      {/* Kitchen actions */}
                      {user.role === "kitchen" && order.status === "confirmed" && (
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, "preparing");
                            refresh();
                          }}
                          className="bg-[#7a2b2b] text-white text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded hover:bg-[#a22b2b] transition-colors"
                        >
                          Start Preparing
                        </button>
                      )}
                      {user.role === "kitchen" && order.status === "preparing" && (
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, "ready");
                            refresh();
                          }}
                          className="bg-green-600 text-white text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                      {/* Admin actions */}
                      {user.role === "admin" && (
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, "cancelled");
                            refresh();
                          }}
                          className="border border-[#7a2b2b]/30 text-[#7a2b2b] text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}