"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { useChat } from "@/context/ChatContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

const KB = [
  {
    k: ["price", "cost", "how much", "pricing", "fee", "charge", "expensive", "afford"],
    a: "We have three plans: <b>Starter $199/mo</b>, <b>Pro $399/mo</b>, and <b>Pro + AI $599/mo</b> — all of them <b>$0 down</b>. Your first bill doesn't come until your site is live. <a href='#pricing'>See the full plan comparison</a>. Want the yearly option? That's 2 months free.",
  },
  {
    k: ["ai", "chat", "chatbot", "smart", "assistant"],
    a: "Our <b>Smart Chat assistant</b> answers your clients' questions 24/7 — services, qualifications, compliance — even outside business hours while you're in client meetings. It's included in the Pro + AI plan, and you're talking to one right now 😄",
  },
  {
    k: ["own", "domain", "mine", "hostage", "cancel", "leave", "contract"],
    a: "You own your custom domain and all your business data. Because we provide high-security managed infrastructure, the codebase itself remains on our secure servers. If you ever leave, you take your domain and content with zero friction.",
  },
  {
    k: ["fast", "launch", "long", "quick", "when", "48", "time", "start", "how soon"],
    a: "<b>48 hours.</b> One 15-minute call, we build overnight, you review on a preview link, then we launch. Most sites are live within 2 days.",
  },
  {
    k: ["seo", "google", "search", "rank", "found", "visible"],
    a: "Local SEO is baked in: page titles, schema markup, your address and service area structured the way Google reads it. The Pro plan adds full local SEO plus Google Business setup help.",
  },
  {
    k: [
      "cpa",
      "account",
      "tax",
      "consult",
      "cfo",
      "legal",
      "agency",
      "advisor",
      "b2b",
      "finance",
      "compliance",
      "firm",
    ],
    a: "That's exactly who we build for! Financial professionals, fractional CFOs, tech consultants, and B2B agencies. Your platform becomes a 24/7 lead machine for your high-ticket services.",
  },
  {
    k: ["hour", "saturday", "weekend", "open", "calendar", "consult", "booking"],
    a: "Our team is available for initial strategy consultations Monday through Friday. Would you like me to share a link to our secure booking calendar so we can evaluate your firm's needs?",
  },
  {
    k: ["update", "change", "edit", "maintain", "maintenance", "fix"],
    a: "Every plan includes <b>one content update per month</b> — hours, prices, photos, services, address, anything. Pro and Pro+ get priority edits with 24-hour turnaround.",
  },
  {
    k: ["loan", "bank", "credib", "legit", "financ"],
    a: "Great thinking — enterprise-grade infrastructure with active SSL and secure lead capture instantly signals legitimacy to high-ticket clients and corporate partners. <a href='#cred'>Jump to the 'What your clients see' section</a> for exactly what they look for.",
  },
  {
    k: ["form", "lead", "contact", "inquiry", "email"],
    a: "Your contact form delivers every inquiry straight to your inbox the moment it's sent — no dashboard to check. Add tap-to-call buttons and (on Pro + AI) chat transcripts, and nothing slips through.",
  },
  {
    k: ["host", "ssl", "secure", "server"],
    a: "Hosting, SSL security, and your custom domain are all included in every plan. You never touch a server, renewal, or plugin update.",
  },
  {
    k: ["ecommerce", "store", "shop", "sell online", "cart"],
    a: "We build lead-generating platforms and client portals, not retail consumer storefronts — perfect for professional services firms. If you need custom integrations down the road, our team handles it directly.",
  },
  {
    k: ["hello", "hi", "hey", "yo", "sup"],
    a: "Hey there! 👋 I can answer questions about pricing, our 48-hour launch process, the AI chat qualification feature, or how this works for your firm. What's on your mind?",
  },
  {
    k: ["thank", "thanks", "appreciate"],
    a: "Anytime! If you're ready, scroll down to the form and our team will follow up within one business day. Or keep asking — I'm here all day and night.",
  },
];

const FALLBACK =
  "Good question! I can definitely help with that — but a real human will answer it even better. <a href='#contact'>Drop your details in the form below</a> and we'll call you within one business day, or ask me about <b>pricing, launch time, or the AI feature</b>.";

const INITIAL_CHIPS = [
  "Pricing?",
  "How fast can I launch?",
  "Do I own my site?",
  "What about my firm?",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "bot-greeting",
    sender: "bot",
    text: "Hey! I'm the TekBridges assistant — the exact feature your clients' websites get. Ask me anything, or tap a shortcut below. 👇",
  },
];

export default function ChatWidget() {
  const { isOpen, toggleChat, closeChat } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [chips, setChips] = useState<string[]>(INITIAL_CHIPS);
  const [inputVal, setInputVal] = useState("");

  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat body
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    const typingId = `typing-${Date.now() + 1}`;
    const typingMsg: ChatMessage = {
      id: typingId,
      sender: "bot",
      text: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInputVal("");

    const q = text.toLowerCase();
    const hit = KB.find((e) => e.k.some((k) => q.includes(k)));
    const botReply = hit ? hit.a : FALLBACK;

    // Filter used chips
    setChips((prev) =>
      prev.filter((c) => !text.includes(c.replace("?", ""))).slice(0, 3)
    );

    const delay = 700 + Math.random() * 500;
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                id: `bot-${Date.now()}`,
                sender: "bot",
                text: botReply,
                isTyping: false,
              }
            : m
        )
      );
    }, delay);
  }, []);

  // Subscribe to external question events triggered from demo chips
  useEffect(() => {
    const handleAskEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleSend(customEvent.detail);
      }
    };

    window.addEventListener("tekbridges:ask", handleAskEvent);
    return () => {
      window.removeEventListener("tekbridges:ask", handleAskEvent);
    };
  }, [handleSend]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chat-fab"
        id="chatFab"
        aria-label="Open chat"
        onClick={toggleChat}
        type="button"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="ping" />
      </button>

      {/* Chat Window */}
      <div
        className={`chat-win ${isOpen ? "open" : ""}`}
        id="chatWin"
        role="dialog"
        aria-label="TekBridges Assistant Chat"
      >
        <div className="chat-head">
          <span className="dot-online" />
          <div>
            <b>TekBridges Assistant</b>
            <small>Online &middot; usually replies instantly</small>
          </div>
          <button
            id="chatClose"
            aria-label="Close chat"
            onClick={closeChat}
            type="button"
          >
            <X className="w-4 h-4 text-[#F4F1E9]" />
          </button>
        </div>

        <div 
          className="chat-body" 
          id="chatBody" 
          ref={chatBodyRef}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a') {
              closeChat();
            }
          }}
        >
          {messages.map((msg) =>
            msg.isTyping ? (
              <div key={msg.id} className="bubble bot typing">
                <i />
                <i />
                <i />
              </div>
            ) : (
              <div
                key={msg.id}
                className={`bubble ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            )
          )}
        </div>

        {chips.length > 0 && (
          <div className="chat-chips" id="chatChips">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() =>
                  handleSend(chip.replace("?", "").replace("…", ""))
                }
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input">
          <input
            id="chatInput"
            type="text"
            placeholder="Ask about pricing, process, anything…"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend(inputVal);
              }
            }}
          />
          <button
            id="chatSend"
            aria-label="Send"
            type="button"
            onClick={() => handleSend(inputVal)}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
