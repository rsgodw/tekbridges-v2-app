"use client";

import { useState } from "react";
import { Globe, TrendingUp, Bot, Check, X, BadgeCheck } from "lucide-react";

export default function Pricing() {
  const [billing, setBilling] = useState<"m" | "y">("m");
  const isYearly = billing === "y";

  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
        <div className="pricing-head rv">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <div className="sec-tag">06 / Pricing</div>
            <h2>
              Pick your plan.
              <br />
              Keep your cash.
            </h2>
          </div>
          <div className="toggle">
            <button
              id="tMonthly"
              className={!isYearly ? "active" : ""}
              onClick={() => setBilling("m")}
              type="button"
            >
              Monthly
            </button>
            <button
              id="tYearly"
              className={isYearly ? "active" : ""}
              onClick={() => setBilling("y")}
              type="button"
            >
              Yearly <span className="save">&minus;2 MO</span>
            </button>
          </div>
        </div>

        <div className="plans rv">
          {/* Starter Plan */}
          <div className="plan">
            <h3>
              <Globe className="w-5 h-5 text-[var(--accent)]" />
              <span>Starter</span>
            </h3>
            <p className="plan-desc">
              High-performance web infrastructure for independent practitioners.
            </p>
            <div className="price">
              <small>$</small>
              <span>{isYearly ? "166" : "199"}</span>
              <small>/mo</small>
            </div>
            <div className="price-yearly">
              {isYearly ? "BILLED ANNUALLY — 2 MONTHS FREE" : "\u00A0"}
            </div>
            <ul>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>1-page lead website</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Hosting + domain + SSL</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Contact form &rarr; your inbox</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Tap-to-call, mobile-first</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>1 monthly content update</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[var(--ink)] flex-none mt-1" />
                <span>Advanced local SEO</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[var(--ink)] flex-none mt-1" />
                <span>Smart AI chat</span>
              </li>
            </ul>
            <a className="btn btn-ghost" href="#contact">
              Start Now - $0 Setup Fee
            </a>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="plan plan-feat">
            <div className="plan-flag">Most firms choose this</div>
            <h3>
              <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
              <span>Pro</span>
            </h3>
            <p className="plan-desc">
              Dominate search rankings and establish enterprise authority.
            </p>
            <div className="price">
              <small>$</small>
              <span>{isYearly ? "332" : "399"}</span>
              <small>/mo</small>
            </div>
            <div className="price-yearly">
              {isYearly ? "BILLED ANNUALLY — 2 MONTHS FREE" : "\u00A0"}
            </div>
            <ul>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Everything in Starter</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Multi-page site (services, about, reviews)</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Full local SEO + Google Business setup help</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Reviews &amp; testimonials section</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Visitor analytics &mdash; see where leads come from</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Priority edits, 24h turnaround</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[#F4F1E9] flex-none mt-1" />
                <span>Smart AI chat</span>
              </li>
            </ul>
            <a className="btn" href="#contact">
              Start Now - $0 Setup Fee
            </a>
          </div>

          {/* Pro + AI Plan */}
          <div className="plan">
            <h3>
              <Bot className="w-5 h-5 text-[var(--accent)]" />
              <span>Pro + AI</span>
            </h3>
            <p className="plan-desc">
              24/7 AI client intake and lead qualification built in.
            </p>
            <div className="price">
              <small>$</small>
              <span>{isYearly ? "499" : "599"}</span>
              <small>/mo</small>
            </div>
            <div className="price-yearly">
              {isYearly ? "BILLED ANNUALLY — 2 MONTHS FREE" : "\u00A0"}
            </div>
            <ul>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Everything in Pro</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Smart Chat trained on your business</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Answers FAQs, hours, pricing &amp; services 24/7</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Qualifies visitors &amp; pushes them to call/book</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Chat transcripts sent to your inbox</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Best for busy practitioners who can&apos;t answer during meetings</span>
              </li>
            </ul>
            <a className="btn btn-ghost" href="#contact">
              Start Now - $0 Setup Fee
            </a>
          </div>
        </div>

        <div className="pricing-note rv">
          <BadgeCheck className="w-4 h-4 text-[var(--accent)] flex-none" />
          <span>
            ALL PLANS: ZERO SETUP FEES &middot; $0 TO START &middot; CANCEL
            ANYTIME &middot; YOU OWN YOUR DOMAIN &amp; CONTENT
          </span>
        </div>
      </div>
    </section>
  );
}
