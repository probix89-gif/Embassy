import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import CartDrawer from "@/components/CartDrawer";

const timeline = [
  { year: "1948", title: "The Beginning", desc: "The Embassy opens its doors in Connaught Place — one of New Delhi's first fine-dining destinations." },
  { year: "1960s", title: "A Delhi Institution", desc: "Becomes a favourite of diplomats, politicians, writers and families gathering around its iconic dining room." },
  { year: "1990s", title: "The Modern Era", desc: "Menus evolve with continental & European classics while the North Indian soul stays untouched." },
  { year: "Today", title: "Still Standing", desc: "76 years on, the same warmth, the same standards — now with online ordering and an AI menu assistant." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AIChatWidget />
      <CartDrawer />

      <header className="pt-36 pb-16 bg-[#16291d] text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
          Our Heritage
        </div>
        <h1 className="font-serif-display text-4xl md:text-6xl text-[#f3eee3] mt-3">
          Seventy-six years of stories
        </h1>
        <p className="text-[#e4ce9c]/80 font-light mt-5 max-w-2xl mx-auto px-4 leading-relaxed">
          From the heart of Connaught Place — a restaurant that has watched
          Delhi grow, and fed it well along the way.
        </p>
      </header>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#16291d] font-medium leading-tight">
              The Embassy is more than a restaurant — it&apos;s a Delhi landmark
            </h2>
            <p className="text-[#4d5a52] font-light mt-6 leading-relaxed">
              In the grand colonnaded circle of Connaught Place, The Embassy
              has served generations of Delhi — from the city&apos;s first
              families to visitors from every corner of the world. The dining
              room still carries the unhurried elegance of another era, where
              every meal feels like an occasion.
            </p>
            <p className="text-[#4d5a52] font-light mt-4 leading-relaxed">
              Our philosophy is simple: take the finest ingredients, cook them
              with patience and pride, and serve them with warmth. The dal is
              simmered overnight. The kebabs are hand-pressed. The breads come
              straight from the tandoor.
            </p>
            <div className="flex gap-8 mt-8">
              {[
                ["4.0★", "Zomato rating"],
                ["2,000+", "Guest reviews"],
                ["100+", "Dishes on menu"],
              ].map(([n, d]) => (
                <div key={d}>
                  <div className="font-serif-display text-3xl text-[#7a2b2b]">{n}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#7c867f] mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop"
              alt="The Embassy dining room"
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute -bottom-6 -left-4 bg-[#c5a24e] text-[#16291d] px-6 py-4 shadow-lg">
              <div className="font-serif-display text-lg">11-D, Connaught Place</div>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-0.5">Middle Circle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-y border-[#21402e]/10 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#c5a24e] font-semibold">
              The Journey
            </div>
            <h2 className="font-serif-display text-4xl text-[#16291d] mt-3">Through the decades</h2>
          </div>
          <div className="space-y-0 relative before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-px before:bg-[#c5a24e]/40 md:before:left-1/2">
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative pl-10 pb-12 md:w-1/2 ${i % 2 === 0 ? "md:pr-14 md:text-right md:pl-0" : "md:ml-auto md:pl-14"}`}>
                <div className={`absolute w-4 h-4 rounded-full bg-[#c5a24e] border-2 border-[#faf6ef] left-0 top-1.5 ${i % 2 === 0 ? "md:left-auto md:-right-2" : "md:-left-2"}`} />
                <div className="font-serif-display text-2xl text-[#7a2b2b]">{t.year}</div>
                <div className="font-medium text-[#16291d] mt-1">{t.title}</div>
                <p className="text-[13.5px] text-[#6b756e] font-light mt-2 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="font-serif-display text-3xl md:text-4xl text-[#16291d]">
          Come taste the legacy
        </h2>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link
            href="/menu"
            className="bg-[#21402e] text-[#f3eee3] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#c5a24e] hover:text-[#16291d] transition-colors"
          >
            View the Menu
          </Link>
          <Link
            href="/contact"
            className="border border-[#21402e]/40 text-[#21402e] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#21402e] hover:text-[#f3eee3] transition-colors"
          >
            Visit Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
