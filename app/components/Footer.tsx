import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#16291d] text-[#f3eee3]/60 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-serif-display text-2xl text-[#f3eee3] tracking-[0.18em] uppercase">
            The Embassy
          </div>
          <p className="text-[13px] font-light mt-4 leading-relaxed max-w-[260px]">
            An icon of Connaught Place since 1948. Timeless North Indian
            dining, warm hospitality, and decades of stories worth telling.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.26em] uppercase text-[#c5a24e] mb-5">
            Explore
          </h4>
          <Link href="/menu" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Full Menu
          </Link>
          <Link href="/about" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Our Heritage
          </Link>
          <Link href="/gallery" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Gallery
          </Link>
          <Link href="/staff" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Staff Area
          </Link>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.26em] uppercase text-[#c5a24e] mb-5">
            Contact
          </h4>
          <p className="text-[13px] font-light py-1.5">11-D, D Block, Middle Circle</p>
          <p className="text-[13px] font-light py-1.5">Connaught Place</p>
          <p className="text-[13px] font-light py-1.5">New Delhi 110001</p>
          <p className="text-[13px] font-light py-1.5">+91 11 2341 6434</p>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.26em] uppercase text-[#c5a24e] mb-5">
            Follow
          </h4>
          <a href="https://instagram.com/theembassyindia" target="_blank" rel="noreferrer" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Instagram — @theembassyindia
          </a>
          <a href="https://www.zomato.com/ncr/embassy-connaught-place-new-delhi" target="_blank" rel="noreferrer" className="block text-[13px] font-light py-1.5 hover:text-[#c5a24e]">
            Zomato
          </a>
          <p className="text-[13px] font-light py-1.5 mt-3 text-[#f3eee3]/40">
            ⭐ 4.0 on Zomato · 2,000+ reviews
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 text-[12px] font-light">
        <span>© 2026 The Embassy, Connaught Place. All rights reserved.</span>
        <span>
          Crafted with <span className="text-[#c5a24e]">♥</span> in New Delhi
        </span>
      </div>
    </footer>
  );
}
