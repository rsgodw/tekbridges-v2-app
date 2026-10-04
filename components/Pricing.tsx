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
                <span>Single-page deployment</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Hosting, domain, &amp; SSL</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Secure contact routing</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Mobile-first architecture</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Monthly managed updates</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[var(--ink)] flex-none mt-1" />
                <span>Advanced technical SEO</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[var(--ink)] flex-none mt-1" />
                <span>AI client intake automation</span>
              </li>
            </ul>
            <a className="btn btn-ghost" href="/blueprint">
              Configure Architecture
            </a>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="plan plan-feat">
            <div className="plan-flag">Most firms choose this</div>
            <h3>
              <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
              <span>Pro Growth</span>
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
                <span>Multi-page scaling (services, firm profile)</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Full technical SEO & schema markup</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Trust & compliance integration</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Data pipeline analytics</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Priority 24h engineering turnaround</span>
              </li>
              <li className="no">
                <X className="w-4 h-4 text-[#F4F1E9] flex-none mt-1" />
                <span>AI client intake automation</span>
              </li>
            </ul>
            <a className="btn" href="/blueprint">
              Configure Architecture
            </a>
          </div>

          {/* Pro + AI Plan */}
          <div className="plan">
            <h3>
              <Bot className="w-5 h-5 text-[var(--accent)]" />
              <span>Enterprise + AI</span>
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
                <span>Everything in Pro Growth</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Custom AI model trained on your firm</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Autonomous client intake 24/7</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Pre-qualifies leads & budgets</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>Direct CRM push integrations</span>
              </li>
              <li>
                <Check className="w-4 h-4 text-[var(--accent)] flex-none mt-1" />
                <span>For elite firms demanding high conversion</span>
              </li>
            </ul>
            <a className="btn btn-ghost" href="/blueprint">
              Configure Architecture
            </a>
          </div>
        </div>

        <div className="pricing-note rv">
          <BadgeCheck className="w-4 h-4 text-[var(--accent)] flex-none" />
          <span>
            B2B INFRASTRUCTURE &middot; CANCEL
            ANYTIME &middot; YOU MAINTAIN 100% DATA OWNERSHIP
          </span>
        </div>
      </div>
    </section>
  );
}
