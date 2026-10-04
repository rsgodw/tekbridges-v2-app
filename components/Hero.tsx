"use client";

import { useState, useEffect } from "react";
import { Zap, Eye } from "lucide-react";

const WORDS = [
  "scale.",
  "performance.",
  "authority.",
  "dominance.",
];
const TRADES = [
  "Private Equity",
  "M&A Advisors",
  "Fractional CFOs",
  "Enterprise SaaS",
  "Corporate Counsel",
  "Wealth Management",
  "Venture Capital",
  "Tech Consultancies",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="wrap flex justify-between items-center relative z-10">
        <div className="max-w-3xl">
          <span className="kicker rv">
            Elite Infrastructure for High-Ticket Firms
          </span>
          <h1 className="rv text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Engineered for
            <br />
            <span className="rotator text-[var(--accent)] drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <span
                className="rotator-inner"
                id="rot"
                style={{ transform: `translateY(-${wordIndex * 1.02}em)` }}
              >
                {WORDS.map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </span>
            </span>
            <br />
            <span className="text-zinc-500 font-medium tracking-normal text-4xl sm:text-6xl block mt-2">Uncompromising quality.</span>
          </h1>
          <p className="hero-sub rv text-lg text-zinc-400 max-w-xl leading-relaxed">
            We design, engineer, and deploy bespoke web applications and secure digital pipelines for elite professionals and B2B consultancies. Liquid performance. Bank-grade security.
          </p>
          <div className="hero-cta rv mt-10">
            <a className="btn btn-solid border-none bg-white/10 hover:bg-white/20 backdrop-blur-md text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all" href="/blueprint">
              <Zap className="w-4 h-4 text-[var(--accent)]" /> Configure Architecture
            </a>
            <a className="btn btn-ghost border border-white/10 text-white hover:bg-white/5 transition-all" href="#showcase">
              <Eye className="w-4 h-4" /> View Deployments
            </a>
          </div>
        </div>

        {/* Liquid Glass Orb / Abstract element instead of cheap stamp */}
        <div className="hidden lg:block relative w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-purple-600 rounded-full blur-[80px] opacity-40 mix-blend-screen animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center">
             <div className="text-center">
               <div className="font-bold text-4xl text-white drop-shadow-md">99.9%</div>
               <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mt-2">Uptime SLA</div>
             </div>
          </div>
        </div>
      </div>

      <div className="marquee rv mt-32 border-y border-white/5 bg-black/40 backdrop-blur-md py-6">
        <div className="marquee-track" id="mq">
          {[...TRADES, ...TRADES].map((trade, idx) => (
            <span key={idx} className="text-zinc-500 font-medium tracking-wide">
              {trade}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
