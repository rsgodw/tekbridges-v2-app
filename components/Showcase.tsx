"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface DemoTrade {
  name: string;
  biz: string;
  accent: string;
  tag: string;
  h: string;
  sub: string;
  svcs: string[];
  cta: string;
}

const DEMOS: DemoTrade[] = [
  {
    name: "Accounting Firm",
    biz: "Ledger & Co. Tax",
    accent: "#1D4ED8",
    tag: "CPA · Enrolled agent",
    h: "Taxes handled. Money kept.",
    sub: "Secure individual and corporate returns.",
    svcs: [
      "Corporate Tax Prep",
      "Compliance Auditing",
      "Fractional CFO Services",
    ],
    cta: "Schedule Consultation →",
  },
  {
    name: "Tech Consultant",
    biz: "Apex Cloud Consulting",
    accent: "#0B6E4F",
    tag: "AWS Certified · SOC2 Compliant",
    h: "Cloud architecture that scales.",
    sub: "We migrate and secure enterprise data systems.",
    svcs: [
      "Cloud Migration",
      "Data Pipeline Engineering",
      "Security Audits",
    ],
    cta: "Request Audit →",
  },
  {
    name: "B2B Agency",
    biz: "Nexus B2B Growth",
    accent: "#FF4A00",
    tag: "Enterprise Lead Generation",
    h: "We fill your pipeline.",
    sub: "Data-driven outbound strategies for B2B SaaS.",
    svcs: [
      "Outbound Strategy",
      "Sales Enablement",
      "CRM Architecture",
    ],
    cta: "View Case Studies →",
  },
];

export default function Showcase() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % DEMOS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const current = DEMOS[activeTab];

  return (
    <section className="showcase" id="showcase">
      <div className="wrap">
        <div className="showcase-copy rv">
          <div className="sec-tag">01 / The Architecture</div>
          <h2 className="sec-head" style={{ marginBottom: 0 }}>
            Built to capture
            <br />
            enterprise leads.
          </h2>
          <p>
            This isn&apos;t a generic template. Every deployment is an independent digital asset built for one job: <b>turning traffic into high-ticket consultations.</b> Fast, secure, and fully managed.
          </p>
          <ul className="tick-list">
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Loads in under 1 second &mdash; decision-makers evaluate your firm instantly.
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Optimized schema architecture &mdash; rank for high-intent B2B searches.
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Frictionless conversion funnels &mdash; book more strategy calls automatically.
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>Direct integrations with your calendar and CRM.</span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Bank-grade credibility &mdash; actively build trust with stakeholders.
              </span>
            </li>
          </ul>
        </div>

        <div className="phone-area rv">
          <div className="tabs" id="tabs">
            {DEMOS.map((demo, idx) => (
              <button
                key={demo.name}
                className={`tab ${activeTab === idx ? "active" : ""}`}
                onClick={() => handleTabClick(idx)}
                type="button"
              >
                {demo.name}
              </button>
            ))}
          </div>

          <div className="phone">
            <div
              className={`screen fade`}
              key={activeTab}
              style={
                {
                  "--biz-accent": current.accent,
                } as React.CSSProperties
              }
            >
              <div className="screen-head">
                <span className="biz">{current.biz}</span>
                <span
                  className="screen-call"
                  style={{ backgroundColor: current.accent }}
                >
                  Call Now
                </span>
              </div>
              <div className="screen-body">
                <div className="screen-hero">
                  <span
                    className="tag"
                    style={{ color: current.accent }}
                  >
                    {current.tag}
                  </span>
                  <h4>{current.h}</h4>
                  <p>{current.sub}</p>
                </div>
                <div className="screen-services">
                  <div className="lbl">Services</div>
                  <div>
                    {current.svcs.map((svc, i) => (
                      <div key={i} className="svc-row">
                        <i style={{ backgroundColor: current.accent }} />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="screen-cta"
                  style={{ backgroundColor: current.accent }}
                >
                  {current.cta}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
