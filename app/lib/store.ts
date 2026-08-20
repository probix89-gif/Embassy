"use client";
import type { MenuItem } from "./menu-data";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "served" | "cancelled";

export interface OrderItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  qty: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  tableNo: string;
  notes: string;
  status: OrderStatus;
  total: number;
  createdAt: number;
  confirmedAt?: number;
  readyAt?: number;
}

const STORAGE_KEY = "embassy_orders";
const CART_KEY = "embassy_cart";

// ============ CART ============
export function getCart(): OrderItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToCart(item: MenuItem, qty = 1) {
  const cart = getCart();
  const existing = cart.find((c) => c.itemId === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: crypto.randomUUID(),
      itemId: item.id,
      name: item.name,
      price: item.price,
      qty,
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function updateCartQty(id: string, qty: number) {
  const cart = getCart();
  const item = cart.find((c) => c.id === id);
  if (item) item.qty = Math.max(1, qty);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((c) => c.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.setItem(CART_KEY, "[]");
}

export function cartTotal(): number {
  return getCart().reduce((s, c) => s + c.price * c.qty, 0);
}

// ============ ORDERS ============
export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function placeOrder(name: string, phone: string, table: string, notes: string) {
  const cart = getCart();
  if (cart.length === 0) return null;
  const order: Order = {
    id: crypto.randomUUID().slice(0, 8).toUpperCase(),
    items: [...cart],
    customerName: name,
    customerPhone: phone,
    tableNo: table,
    notes,
    status: "pending",
    total: cart.reduce((s, c) => s + c.price * c.qty, 0),
    createdAt: Date.now(),
  };
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  clearCart();
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  order.status = status;
  if (status === "confirmed") order.confirmedAt = Date.now();
  if (status === "ready") order.readyAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return getOrders().filter((o) => o.status === status);
}

export function todayOrders(): Order[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return getOrders().filter((o) => o.createdAt >= today.getTime());
}

// ============ STAFF ACCOUNTS (demo) ============
export interface StaffUser {
  id: string;
  name: string;
  role: "waiter" | "kitchen" | "admin";
  pin: string;
}

const STAFF_KEY = "embassy_staff";
export function getStaff(): StaffUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STAFF_KEY) || "[]");
  } catch {
    return [];
  }
}

export function initStaff() {
  if (getStaff().length === 0) {
    const defaults: StaffUser[] = [
      { id: "w1", name: "Rajesh (Waiter)", role: "waiter", pin: "1234" },
      { id: "k1", name: "Chef Anand", role: "kitchen", pin: "5678" },
      { id: "a1", name: "Manager", role: "admin", pin: "0000" },
    ];
    localStorage.setItem(STAFF_KEY, JSON.stringify(defaults));
  }
}

export function staffLogin(pin: string): StaffUser | null {
  return getStaff().find((s) => s.pin === pin) || null;
}