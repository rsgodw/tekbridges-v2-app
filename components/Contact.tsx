"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { usePostHog } from "posthog-js/react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Globe,
  Activity,
  RotateCcw,
  Search,
} from "lucide-react";

type Stage = 1 | 2 | 3 | 4;

interface FunnelData {
  industry: string;
  domain: string;
  objective: string;
}

const STAGE_1_OPTIONS = [
  "Accounting/CPA",
  "Financial Consulting",
  "IT/Tech Consulting",
  "Legal Counsel",
  "Fractional CFO",
  "Other",
];

const STAGE_3_OPTIONS = [
  {
    title: "Lead Acquisition",
    desc: "Engineered pipelines to convert enterprise corporate traffic into booked strategy calls.",
  },
  {
    title: "Secure Client Portal",
    desc: "Zero-trust client onboarding, document intake, and encrypted communication channels.",
  },
  {
    title: "Brand & Compliance Authority",
    desc: "Institutional web presence that satisfies security audits, SSL/DLP protocols, and partner scrutiny.",
  },
];

export default function Contact() {
  const posthog = usePostHog();

  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [formData, setFormData] = useState<FunnelData>({
    industry: "",
    domain: "",
    objective: "",
  });

  const [domainInput, setDomainInput] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditText, setAuditText] = useState("Scanning SSL protocols...");
  const [auditProgress, setAuditProgress] = useState(0);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Stage 1: Industry Selection
  const handleStage1Select = (selectedIndustry: string) => {
    setFormData((prev) => ({ ...prev, industry: selectedIndustry }));
    try {
      posthog?.capture("funnel_stage_1_completed", {
        industry: selectedIndustry,
      });
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }
    setCurrentStage(2);
  };

  // Stage 2: Domain Audit Simulation (2.5 seconds)
  const triggerDomainAudit = (enteredDomain: string) => {
    const finalDomain = enteredDomain.trim() || "None / Skipped";
    setFormData((prev) => ({ ...prev, domain: finalDomain }));

    try {
      posthog?.capture("funnel_stage_2_audit_run", {
        domain: finalDomain,
      });
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }

    setIsAuditing(true);
    setAuditProgress(15);
    setAuditText("Scanning SSL protocols...");

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Cycle: "Scanning SSL protocols..." -> "Evaluating Edge Network speed..." -> "Checking schema markup..." -> "Audit complete."
    const t1 = setTimeout(() => {
      setAuditText("Evaluating Edge Network speed...");
      setAuditProgress(48);
    }, 650);

    const t2 = setTimeout(() => {
      setAuditText("Checking schema markup...");
      setAuditProgress(78);
    }, 1300);

    const t3 = setTimeout(() => {
      setAuditText("Audit complete.");
      setAuditProgress(100);
    }, 1950);

    const t4 = setTimeout(() => {
      setIsAuditing(false);
      setCurrentStage(3);
    }, 2500);

    timersRef.current.push(t1, t2, t3, t4);
  };

  const handleDomainSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerDomainAudit(domainInput);
  };

  const handleDomainSkip = () => {
    triggerDomainAudit("None / Skipped");
  };

  // Stage 3: Infrastructure Objective
  const handleStage3Select = (selectedGoal: string) => {
    setFormData((prev) => ({ ...prev, objective: selectedGoal }));
    try {
      posthog?.capture("funnel_stage_3_completed", {
        goal: selectedGoal,
      });
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }
    setCurrentStage(4);
  };

  // Stage 4: Checkout terminal tracking
  const handleCheckoutClick = () => {
    try {
      posthog?.capture("checkout_initiated");
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }
  };

  const handleCalendarClick = () => {
    try {
      posthog?.capture("calendar_booked");
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        {/* Left Column: Contact & Brand Context */}
        <div className="contact-copy rv">
          <div className="sec-tag">08 / Get started</div>
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <h2>Let&apos;s get you online.</h2>
          </div>
          <p>
            Tell us about your business and we&apos;ll call you back{" "}
            <b>within one business day</b> with a plan and a preview timeline.
            15 minutes on the phone is all it takes to get started.
          </p>
          <div className="contact-points">
            <div>
              <Phone className="w-5 h-5 text-[var(--accent)] flex-none mt-1" />
              <div>
                <b>(555) 010-4848</b>
                <span>Mon&ndash;Fri 8am&ndash;6pm &middot; Sat 9am&ndash;2pm</span>
              </div>
            </div>
            <div>
              <Mail className="w-5 h-5 text-[var(--accent)] flex-none mt-1" />
              <div>
                <b>hello@tekbridges.com</b>
                <span>We answer every email personally</span>
              </div>
            </div>
            <div>
              <MapPin className="w-5 h-5 text-[var(--accent)] flex-none mt-1" />
              <div>
                <b>Serving all 50 states</b>
                <span>Remote build, local SEO for your exact area</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Stage Funnel Container */}
        <div className="rv bg-[#171512] border-2 border-[#3A362D] p-6 sm:p-8 rounded-[var(--radius)] shadow-[8px_8px_0_#000] flex flex-col justify-between min-h-[460px]">
          {/* Funnel Progress Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#3A362D] font-mono text-xs text-[#8A8578]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-bold">
                STAGE 0{currentStage}
              </span>
              <span>/ 04</span>
              <span className="hidden sm:inline text-[#3A362D]">|</span>
              <span className="hidden sm:inline uppercase tracking-wider text-[#B9B5AA]">
                {currentStage === 1 && "Industry Focus"}
                {currentStage === 2 && "Digital Footprint"}
                {currentStage === 3 && "Infrastructure Goal"}
                {currentStage === 4 && "Deployment Blueprint"}
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-6 rounded-sm transition-all duration-300 ${
                    s < currentStage
                      ? "bg-[#3ECF6E]"
                      : s === currentStage
                      ? "bg-[var(--accent)]"
                      : "bg-[#3A362D]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Funnel Stage Body with Smooth Transition */}
          <div className="flex-1 flex flex-col justify-center">
            {/* STAGE 1: Industry Selection */}
            {currentStage === 1 && (
              <div key="stage-1" className="funnel-fade space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--dark-text)]">
                    Let&apos;s architect your infrastructure.
                  </h3>
                  <p className="text-sm text-[#B9B5AA] mt-1.5">
                    What is your firm&apos;s primary focus?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {STAGE_1_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleStage1Select(opt)}
                      className="group p-4 bg-[#201E19] hover:bg-[#2A231D] border-2 border-[#3A362D] hover:border-[var(--accent)] text-left transition-all duration-150 rounded-[var(--radius)] flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-semibold text-sm sm:text-base text-[var(--dark-text)] group-hover:text-white transition-colors">
                        {opt}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#8A8578] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all flex-none ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 2: Domain Audit */}
            {currentStage === 2 && (
              <div key="stage-2" className="funnel-fade space-y-5">
                {isAuditing ? (
                  <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-[#3A362D] border-t-[var(--accent)] rounded-full animate-spin" />
                      <Activity className="w-6 h-6 text-[var(--accent)] absolute inset-0 m-auto animate-pulse" />
                    </div>

                    <div className="w-full max-w-sm space-y-2">
                      <div className="flex justify-between font-mono text-xs text-[#8A8578]">
                        <span>INFRASTRUCTURE SCAN</span>
                        <span>{auditProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#201E19] border border-[#3A362D] rounded-[var(--radius)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                          style={{ width: `${auditProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="font-mono text-sm text-[var(--dark-text)] bg-[#201E19] px-4 py-2 border border-[#3A362D] rounded-[var(--radius)] flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                      <span>{auditText}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--dark-text)]">
                        Current Digital Footprint
                      </h3>
                      <p className="text-sm text-[#B9B5AA] mt-1.5">
                        Enter your existing website to run an automated edge and
                        compliance audit.
                      </p>
                    </div>

                    <form onSubmit={handleDomainSubmit} className="space-y-4 pt-4">
                      <div className="field">
                        <label htmlFor="domain-input">Website URL</label>
                        <div className="relative">
                          <input
                            id="domain-input"
                            type="text"
                            placeholder="e.g. acmeadvisory.com"
                            value={domainInput}
                            onChange={(e) => setDomainInput(e.target.value)}
                            className="w-full"
                          />
                          <Globe className="w-5 h-5 text-[#8A8578] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="submit"
                          className="btn btn-solid btn-accent flex-1 justify-center text-center cursor-pointer"
                        >
                          <Search className="w-4 h-4 flex-none" />
                          Run Domain Audit
                        </button>
                        <button
                          type="button"
                          onClick={handleDomainSkip}
                          className="btn btn-ghost justify-center text-center cursor-pointer border-2 border-[#3A362D] text-[var(--dark-text)] hover:border-[var(--accent)]"
                        >
                          Skip / I don&apos;t have one
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: Infrastructure Objective */}
            {currentStage === 3 && (
              <div key="stage-3" className="funnel-fade space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--dark-text)]">
                    Primary Infrastructure Goal
                  </h3>
                  <p className="text-sm text-[#B9B5AA] mt-1.5">
                    Select the key operational objective for your new managed
                    platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {STAGE_3_OPTIONS.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleStage3Select(item.title)}
                      className="group p-4 sm:p-5 bg-[#201E19] hover:bg-[#2A231D] border-2 border-[#3A362D] hover:border-[var(--accent)] text-left transition-all duration-150 rounded-[var(--radius)] flex items-center justify-between cursor-pointer"
                    >
                      <div className="pr-2">
                        <div className="font-bold text-base sm:text-lg text-[var(--dark-text)] group-hover:text-white transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#8A8578] mt-1 group-hover:text-[#B9B5AA] transition-colors leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#8A8578] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all flex-none" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 4: Checkout Fork */}
            {currentStage === 4 && (
              <div key="stage-4" className="funnel-fade space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--dark-text)]">
                    Your deployment blueprint is ready.
                  </h3>
                  <p className="text-sm text-[#B9B5AA] mt-1.5">
                    We&apos;ve generated your custom infrastructure
                    specification. Choose your deployment path below.
                  </p>
                </div>

                {/* UI Component A: Stylized Summary Card */}
                <div className="p-4 sm:p-5 bg-[#201E19] border-2 border-[#3A362D] rounded-[var(--radius)] font-mono text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3A362D]">
                    <span className="text-[var(--accent)] font-bold text-xs uppercase tracking-wider">
                      SPECIFICATION BLUEPRINT
                    </span>
                    <span className="text-[#3ECF6E] flex items-center gap-1.5 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#3ECF6E] animate-pulse" />
                      COMPILED
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-[#3A362D]/40">
                      <span className="text-[#8A8578]">Industry:</span>
                      <span className="text-[var(--dark-text)] font-semibold">
                        {formData.industry || "Advisory"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#3A362D]/40">
                      <span className="text-[#8A8578]">Domain:</span>
                      <span className="text-[var(--dark-text)] font-semibold">
                        {formData.domain || "None / Skipped"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#3A362D]/40">
                      <span className="text-[#8A8578]">Goal:</span>
                      <span className="text-[var(--dark-text)] font-semibold">
                        {formData.objective || "Lead Acquisition"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-xs">
                      <span className="text-[#8A8578]">Architecture:</span>
                      <span className="text-[var(--accent)] font-semibold">
                        Next.js Edge · SOC2 · DLP Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* UI Component B: Primary Action (Stripe Checkout) & UI Component C: Secondary Action (Strategy Call) */}
                <div className="space-y-3 pt-1">
                  <a
                    href="https://buy.stripe.com/test"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCheckoutClick}
                    className="btn btn-solid btn-accent w-full justify-center text-center font-bold py-4 text-sm sm:text-base tracking-wide flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 flex-none" />
                    Deploy Core Infrastructure - $199/mo (Zero Setup)
                  </a>

                  <a
                    href="https://cal.com/tekbridges"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCalendarClick}
                    className="btn btn-ghost w-full justify-center text-center font-semibold py-3.5 text-xs sm:text-sm tracking-wide border-2 border-[#3A362D] text-[var(--dark-text)] hover:border-[var(--accent)] flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 flex-none" />
                    I need custom scope. Book a Strategy Call.
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStage(1)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8A8578] hover:text-[var(--accent)] font-mono transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reconfigure blueprint
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
