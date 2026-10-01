"use client";

import { useState, useEffect } from "react";
import { Hammer, Eye } from "lucide-react";

const WORDS = ["platform.", "portal.", "engine.", "security."];
const TRADES = [
  "Accounting Firms",
  "Fractional CFOs",
  "Tech Consultants",
  "B2B Freelancers",
  "Legal Counsel",
  "Tax Professionals",
  "Data Analysts",
  "Compliance Officers",
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
      <div className="wrap">
        <div>
          <span className="kicker rv">
            Websites for the people who do the real work
          </span>
          <h1 className="rv">
            Your trade
            <br />
            deserves a
            <br />
            <span className="rotator">
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
            <span className="outline">Not a cheap template.</span>
          </h1>
          <p className="hero-sub rv">
            TekBridges engineers lightning-fast, highly secure web platforms for
            financial professionals, consultants, and independent agencies. Zero
            setup fees. Managed flawlessly.
          </p>
          <div className="hero-cta rv">
            <a className="btn btn-solid" href="#pricing">
              <Hammer className="w-4 h-4" /> Build My Website
            </a>
            <a className="btn btn-ghost" href="#showcase">
              <Eye className="w-4 h-4" /> See What You Get
            </a>
          </div>
        </div>

        <div className="stamp rv">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="circ"
                d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
              />
            </defs>
            <text
              style={{
                fontFamily: "'Big Shoulders', sans-serif",
                fontSize: "21px",
                fontWeight: 700,
                letterSpacing: "3.5px",
                fill: "#171512",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#circ">
                0 DOWN &middot; 48HR LAUNCH &middot; 0 DOWN &middot; 48HR LAUNCH
                &middot;
              </textPath>
            </text>
          </svg>
          <div className="stamp-center">
            <div>
              <b>$0</b>
              <br />
              <small>upfront</small>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee rv">
        <div className="marquee-track" id="mq">
          {[...TRADES, ...TRADES].map((trade, idx) => (
            <span key={idx}>{trade}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
