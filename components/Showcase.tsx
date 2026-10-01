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
          <div className="sec-tag">01 / The product</div>
          <h2 className="sec-head" style={{ marginBottom: 0 }}>
            Built to ring
            <br />
            your phone.
          </h2>
          <p>
            This isn&apos;t a template with your logo slapped on. Every site is a{" "}
            <b>brochure built for one job: turning visitors into calls.</b> Fast
            on a phone, found on Google, trusted at a glance.
          </p>
          <ul className="tick-list">
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Loads in under 2 seconds &mdash; most customers browse on their
                phone in a truck cab
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Your real address, service area &amp; license info &mdash; the
                stuff Google needs to rank you locally
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Tap-to-call button on every screen &mdash; one thumb, one ring
              </span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>Contact form straight to your email or text</span>
            </li>
            <li>
              <CheckCircle2 className="w-5 h-5 flex-none text-[var(--accent)]" />
              <span>
                Credibility your banker can see &mdash; hand them the link at
                your next loan meeting
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
