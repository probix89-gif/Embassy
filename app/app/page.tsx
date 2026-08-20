import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";
import MenuCard from "@/components/MenuCard";
import OpenAIChatButton from "@/components/OpenAIChatButton";
import { CHEF_SPECIALS, MOST_SELLING, formatPrice } from "@/lib/menu-data";

const HERO_IMG =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop";

export default function Home() {
  const signatures = CHEF_SPECIALS.slice(0, 3);
  const bestsellers = MOST_SELLING.slice(0, 4);
  const gallery = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=900&auto=format&fit=crop",
  ];

  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16291d]/80 via-[#16291d]/60 to-[#16291d]/90" />
        <div className="relative z-10 text-center px-6 pt-24 pb-20">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold mb-6 fade-up">
            Connaught Place · New Delhi
          </div>
          <h1 className="font-serif-display text-white text-[clamp(52px,9vw,110px)] font-medium tracking-[0.06em] leading-[1.05] uppercase fade-up">
            The <em className="italic text-[#e4ce9c]">Embassy</em>
          </h1>
          <div className="text-white/75 text-[clamp(13px,2vw,17px)] tracking-[0.32em] uppercase mt-6 font-light fade-up">
            Timeless Indian Dining
          </div>
          <div className="font-serif-display italic text-[#c5a24e] text-lg mt-3 fade-up">
            — since 1948 —
          </div>
          <div className="flex gap-4 justify-center mt-10 flex-wrap fade-up">
            <Link
              href="/menu"
              className="bg-[#c5a24e] text-[#16291d] text-[12px] tracking-[0.24em] uppercase px-9 py-4 rounded hover:bg-[#e4ce9c] transition-colors font-semibold"
            >
              Explore the Menu
            </Link>
            <a
              href="#signatures"
              className="border border-white/55 text-white text-[12px] tracking-[0.24em] uppercase px-9 py-4 rounded hover:bg-white/10 transition-colors"
            >
              Chef&apos;s Specials
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[11px] tracking-[0.3em] uppercase floaty">
          Scroll
        </div>
      </header>

      {/* ABOUT STRIP */}
      <section className="bg-white border-y border-[#21402e]/10 py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="border border-[#21402e]/10 p-4">
              <div className="absolute inset-5 border border-[#e4ce9c] pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Inside The Embassy"
                className="w-full h-[460px] object-cover relative"
              />
            </div>
            <div className="absolute -bottom-7 -right-4 bg-[#21402e] text-[#fdfaf3] px-8 py-6 text-center shadow-xl">
              <div className="font-serif-display text-4xl text-[#c5a24e] leading-none">76</div>
              <div className="text-[10px] tracking-[0.24em] uppercase mt-1">Years of Legacy</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
              Our Heritage
            </div>
            <h2 className="font-serif-display text-4xl md:text-[44px] font-medium text-[#16291d] leading-tight mt-4">
              An icon in the heart of New Delhi since 1948
            </h2>
            <p className="text-[#4d5a52] font-light mt-6 leading-relaxed first-letter:font-serif-display first-letter:text-5xl first-letter:text-[#7a2b2b] first-letter:float-left first-letter:mr-2">
              For over seven decades, The Embassy has stood at the centre of
              Connaught Place — a quiet landmark of warm hospitality and
              uncompromising taste. Our kitchen honours the classic repertoire
              of North Indian cuisine: slow-simmered gravies, charcoal-fired
              kebabs, hand-pounded spices and breads drawn fresh from the
              tandoor.
            </p>
            <div className="flex gap-12 mt-9 flex-wrap">
              {[
                ["1948", "Established"],
                ["100+", "Dish repertoire"],
                ["4.0★", "Zomato rating"],
              ].map(([n, d]) => (
                <div key={d}>
                  <div className="font-serif-display text-3xl text-[#7a2b2b]">{n}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#7c867f] mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURES */}
      <section id="signatures" className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
              Chef&apos;s Signatures
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl font-medium text-[#16291d] mt-4">
              Dishes that made us famous
            </h2>
            <p className="text-[#5a665e] mt-5 font-light">
              Recipes refined over generations — cooked the same way, with the
              same care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {signatures.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="bg-[#16291d] py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
              Guest Favourites
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl font-medium text-[#f3eee3] mt-4">
              Most loved at The Embassy
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {bestsellers.map((item) => (
              <MenuCard key={item.id} item={item} compact />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block border border-[#c5a24e] text-[#c5a24e] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
            >
              View Full Menu — 100+ Dishes
            </Link>
          </div>
        </div>
      </section>

      {/* AI BANNER */}
      <section className="bg-[#21402e] py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-5">🤖</div>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#f3eee3] font-medium">
            Meet the Embassy Assistant
          </h2>
          <p className="text-[#e4ce9c] font-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Hamara AI menu guide poora menu yaad rakhta hai — best dish
            poochhiye, budget options maangiye, veg/non-veg filter kariye.
            Photos ke saath short & sweet jawab milega.
          </p>
          <OpenAIChatButton>Chat with AI — It&apos;s Free</OpenAIChatButton>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
              Gallery
            </div>
            <h2 className="font-serif-display text-4xl font-medium text-[#16291d] mt-4">
              Moments at The Embassy
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-lg ${i % 3 === 0 ? "row-span-2" : ""}`}>
                <img
                  src={src}
                  alt="The Embassy"
                  className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${i % 3 === 0 ? "h-[480px]" : "h-[230px]"}`}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-block border border-[#21402e]/40 text-[#21402e] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#21402e] hover:text-[#f3eee3] transition-colors"
            >
              See Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f3ecdf] py-20 border-y border-[#21402e]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif-display text-3xl md:text-5xl font-medium text-[#16291d]">
            A table is waiting for you
          </h2>
          <p className="text-[#5a665e] font-light mt-5">
            11-D, Middle Circle, Connaught Place · Open 12:30 PM – 11:00 PM ·{" "}
            <span className="text-[#7a2b2b]">{formatPrice(1500)}</span> for two
          </p>
          <div className="flex gap-4 justify-center mt-9 flex-wrap">
            <Link
              href="/contact"
              className="bg-[#16291d] text-[#f3eee3] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#21402e] transition-colors"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="border border-[#16291d]/40 text-[#16291d] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#16291d] hover:text-[#f3eee3] transition-colors"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
