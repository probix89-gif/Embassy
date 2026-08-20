"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "Heritage" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Visit" },
    { href: "/staff", label: "Staff" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf6ef]/95 backdrop-blur border-b border-[#21402e]/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className={`font-serif-display text-xl tracking-[0.18em] uppercase ${
            scrolled ? "text-[#1e2a24]" : "text-white"
          }`}
        >
          The Embassy
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] tracking-[0.22em] uppercase transition-colors ${
                scrolled
                  ? "text-[#1e2a24] hover:text-[#c5a24e]"
                  : "text-white/85 hover:text-[#c5a24e]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className={`text-[11px] tracking-[0.2em] uppercase border px-5 py-2.5 transition-colors ${
              scrolled
                ? "border-[#21402e] text-[#21402e] hover:bg-[#c5a24e] hover:border-[#c5a24e] hover:text-white"
                : "border-white/60 text-white hover:bg-[#c5a24e] hover:border-[#c5a24e]"
            }`}
          >
            Order Now
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={scrolled ? "#1e2a24" : "white"} strokeWidth="1.6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#faf6ef] border-b border-[#21402e]/10 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[12px] tracking-[0.2em] uppercase text-[#1e2a24] py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
