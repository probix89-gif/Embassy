"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const send = async () => {
    if (!msg.trim() || loading) return;
    const userMsg = msg.trim();
    setMsg("");
    setChat((c) => [...c, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chat.slice(-6).map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setChat((c) => [
        ...c,
        { role: "ai", content: data.reply || "Sorry, kuch error aa gaya. Dobara poochiye!" },
      ]);
    } catch {
      setChat((c) => [
        ...c,
        { role: "ai", content: "Network error. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    "Best dish yahan kya hai?",
    "Budget me ₹500 under kya acha hai?",
    "Veg options dikhao",
    "Kya spicy hai?",
    "Most selling dish?",
    "Butter Chicken kaunsa hai?",
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#c5a24e] text-[#16291d] shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        title="Ask about menu"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5H6l4-4a8.5 8.5 0 1111-4.5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[75vh] bg-white rounded-xl shadow-2xl border border-[#21402e]/10 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#21402e] text-[#f3eee3] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a24e] flex items-center justify-center text-[#16291d] font-bold text-lg">
              🍽️
            </div>
            <div>
              <div className="font-serif-display text-base">Embassy Assistant</div>
              <div className="text-[11px] text-[#e4ce9c]">AI Menu Guide · Ask anything!</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chat.length === 0 && (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">👋</div>
                <p className="text-[13px] text-[#6b756e] font-light">
                  Namaste! Main Embassy ka AI assistant hoon.
                  <br />
                  Menu ke baare mein poochiye — best dish, budget options, veg/non-veg, kuch bhi!
                </p>
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setChat((c) => [...c, { role: "user", content: s }]);
                        setMsg(s);
                        setTimeout(() => {
                          const btn = document.querySelector(".chat-send-btn") as HTMLButtonElement;
                          btn?.click();
                        }, 100);
                      }}
                      className="text-[11px] bg-[#f3ecdf] text-[#21402e] px-3 py-2 rounded-full hover:bg-[#c5a24e]/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed rounded-2xl ${
                    m.role === "user"
                      ? "bg-[#21402e] text-[#f3eee3] rounded-br-md"
                      : "bg-[#f3ecdf] text-[#1e2a24] rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#f3ecdf] px-5 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#c5a24e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#c5a24e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#c5a24e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#21402e]/10 flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Poochhiye menu ke baare mein..."
              className="flex-1 bg-[#faf6ef] border border-[#21402e]/15 rounded-full px-4 py-2.5 text-[13px] outline-none focus:border-[#c5a24e]"
            />
            <button
              onClick={send}
              disabled={loading || !msg.trim()}
              className="chat-send-btn bg-[#c5a24e] disabled:opacity-40 text-[#16291d] px-4 py-2.5 rounded-full hover:bg-[#c5a24e] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}