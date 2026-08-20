"use client";
export default function OpenAIChatButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={() => {
        const btn = document.querySelector(
          "button[title*='Ask about menu']"
        ) as HTMLButtonElement | null;
        btn?.click();
      }}
      className="mt-8 bg-[#c5a24e] text-[#16291d] text-[12px] tracking-[0.24em] uppercase px-10 py-4 rounded hover:bg-[#e4ce9c] transition-colors font-semibold"
    >
      {children}
    </button>
  );
}
