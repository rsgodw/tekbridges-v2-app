"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { usePostHog } from "posthog-js/react";
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Globe,
  Activity,
  RotateCcw,
  Search,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

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

interface BlueprintRecommendation {
  planName: string;
  price: string;
  stripeLink: string;
  focus: string;
  features: string[];
}

function getRecommendation(industry: string, objective: string): BlueprintRecommendation {
  // Scenario A: Heavy Compliance
  if (
    (industry.includes("Accounting") || industry.includes("Legal") || industry.includes("CFO") || industry.includes("Financial")) &&
    (objective === "Secure Client Portal" || objective === "Brand & Compliance Authority")
  ) {
    return {
      planName: "Pro + AI",
      price: "$599/mo",
      stripeLink: "https://buy.stripe.com/test_599", // placeholder
      focus: "Bank-Grade Compliance & Portal",
      features: [
        "Zero-trust client onboarding",
        "Encrypted document pipelines",
        "24/7 AI client intake & qualification",
        "SOC2-ready web architecture"
      ]
    };
  }

  // Scenario B: Lead Gen & Performance
  if (objective === "Lead Acquisition" || industry.includes("Tech") || industry.includes("Other")) {
    return {
      planName: "Pro",
      price: "$399/mo",
      stripeLink: "https://buy.stripe.com/test_399", // placeholder
      focus: "High-Velocity Edge Performance",
      features: [
        "Advanced Local SEO & Schema",
        "Multi-page conversion funnels",
        "Sub-2-second Edge load times",
        "Frictionless lead routing"
      ]
    };
  }

  // Fallback
  return {
    planName: "Starter",
    price: "$199/mo",
    stripeLink: "https://buy.stripe.com/test_199", // placeholder
    focus: "Enterprise Digital Footprint",
    features: [
      "Lightning-fast Edge hosting",
      "SSL & Privacy Protocols",
      "Mobile-first responsive design",
      "Managed monthly updates"
    ]
  };
}

export default function BlueprintEngine() {
  const posthog = usePostHog();

  // Custom logging function for user validation
  const captureEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
      console.log(`[PostHog Debug] Event Captured: '${eventName}'`, properties || {});
      if (posthog) {
        posthog.capture(eventName, properties);
      }
    } catch (err) {
      console.error("PostHog tracking error:", err);
    }
  };

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
    // Log funnel start
    captureEvent("funnel_started", { path: "/blueprint" });
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Stage 1: Industry Selection
  const handleStage1Select = (selectedIndustry: string) => {
    setFormData((prev) => ({ ...prev, industry: selectedIndustry }));
    captureEvent("funnel_stage_1_completed", { industry: selectedIndustry });
    setCurrentStage(2);
  };

  // Stage 2: Domain Audit Simulation (2.5 seconds)
  const triggerDomainAudit = (enteredDomain: string) => {
    const finalDomain = enteredDomain.trim() || "None / Skipped";
    setFormData((prev) => ({ ...prev, domain: finalDomain }));

    captureEvent("funnel_stage_2_audit_run", { domain: finalDomain });

    setIsAuditing(true);
    setAuditProgress(15);
    setAuditText("Scanning SSL protocols...");

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

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
    captureEvent("funnel_stage_3_completed", { goal: selectedGoal });
    setCurrentStage(4);
  };

  // Stage 4: Terminal clicks
  const handleCheckoutClick = (planName: string) => {
    captureEvent("checkout_initiated", { plan_selected: planName });
  };

  const handleCalendarClick = () => {
    captureEvent("calendar_booked");
  };

  const recommendation = getRecommendation(formData.industry, formData.objective);

  return (
    <div className="min-h-screen bg-[var(--dark)] flex flex-col items-center py-12 px-6 sm:px-12 font-sans selection:bg-[var(--accent)] selection:text-white">
      {/* Back to Home / Logo */}
      <div className="w-full max-w-2xl mb-10 flex justify-between items-center">
        <Link href="/" className="text-[var(--dark-text)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Exit Blueprint
        </Link>
        <div className="flex items-center gap-2 text-[var(--dark-text)] font-['Big_Shoulders'] text-xl uppercase tracking-widest font-bold">
          <div className="w-6 h-6 bg-[var(--accent)] rounded-[var(--radius)] flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
          TekBridges
        </div>
      </div>

      {/* Funnel Container */}
      <div className="w-full max-w-2xl bg-[#171512] border-2 border-[#3A362D] p-8 sm:p-12 rounded-[var(--radius)] shadow-[12px_12px_0_#000] min-h-[500px] flex flex-col relative overflow-hidden">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#3A362D] font-mono text-xs text-[#8A8578]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">STAGE 0{currentStage}</span>
            <span>/ 04</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-8 rounded-sm transition-all duration-500 ${
                  s < currentStage
                    ? "bg-[#3ECF6E]"
                    : s === currentStage
                    ? "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                    : "bg-[#3A362D]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="flex-1 flex flex-col justify-center">
          
          {/* STAGE 1: Industry Selection */}
          {currentStage === 1 && (
            <div className="funnel-fade space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-['Big_Shoulders'] font-bold uppercase tracking-tight text-[var(--dark-text)] leading-none">
                  Let&apos;s architect your <br/><span className="text-[var(--accent)]">infrastructure.</span>
                </h1>
                <p className="text-base text-[#B9B5AA] mt-4 font-mono tracking-wide">
                  What is your firm&apos;s primary focus?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STAGE_1_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleStage1Select(opt)}
                    className="group p-5 bg-[#201E19] hover:bg-[#2A231D] border-2 border-[#3A362D] hover:border-[var(--accent)] text-left transition-all duration-200 rounded-[var(--radius)] flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-semibold text-base text-[var(--dark-text)] group-hover:text-white transition-colors">
                      {opt}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#8A8578] group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all flex-none" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2: Domain Audit */}
          {currentStage === 2 && (
            <div className="funnel-fade space-y-8">
              {isAuditing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                  <div className="relative">
                    <div className="w-20 h-20 border-2 border-[#3A362D] border-t-[var(--accent)] rounded-full animate-spin" />
                    <Activity className="w-8 h-8 text-[var(--accent)] absolute inset-0 m-auto animate-pulse" />
                  </div>

                  <div className="w-full max-w-md space-y-3">
                    <div className="flex justify-between font-mono text-sm text-[#8A8578]">
                      <span>SYSTEM AUDIT IN PROGRESS</span>
                      <span className="text-[var(--accent)]">{auditProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#201E19] border-2 border-[#3A362D] rounded-[var(--radius)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                        style={{ width: `${auditProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="font-mono text-sm text-[var(--dark-text)] bg-[#201E19] px-6 py-3 border-2 border-[#3A362D] rounded-[var(--radius)] flex items-center gap-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
                    <span>{auditText}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-['Big_Shoulders'] font-bold uppercase tracking-tight text-[var(--dark-text)] leading-none">
                      Current <span className="text-[var(--accent)]">Digital Footprint</span>
                    </h1>
                    <p className="text-base text-[#B9B5AA] mt-4 font-mono tracking-wide">
                      Enter your existing domain for a simulated edge and compliance audit.
                    </p>
                  </div>

                  <form onSubmit={handleDomainSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. yourfirm.com"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        className="w-full bg-[#201E19] border-2 border-[#3A362D] text-[var(--dark-text)] focus:border-[var(--accent)] p-5 pr-12 font-mono text-base rounded-[var(--radius)] outline-none transition-colors"
                      />
                      <Globe className="w-6 h-6 text-[#8A8578] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        className="flex-1 bg-[var(--accent)] hover:bg-[#C93A00] text-white border-2 border-[var(--accent)] hover:border-[#C93A00] font-bold py-4 px-6 rounded-[var(--radius)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#171512] cursor-pointer"
                      >
                        <Search className="w-5 h-5 flex-none" />
                        Run Domain Audit
                      </button>
                      <button
                        type="button"
                        onClick={handleDomainSkip}
                        className="bg-transparent hover:bg-[#171512] text-[var(--dark-text)] border-2 border-[#3A362D] hover:border-[var(--accent)] font-bold py-4 px-6 rounded-[var(--radius)] transition-all cursor-pointer"
                      >
                        Skip / I don&apos;t have one
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {/* STAGE 3: Infrastructure Objective */}
          {currentStage === 3 && (
            <div className="funnel-fade space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-['Big_Shoulders'] font-bold uppercase tracking-tight text-[var(--dark-text)] leading-none">
                  Primary <span className="text-[var(--accent)]">Infrastructure Goal</span>
                </h1>
                <p className="text-base text-[#B9B5AA] mt-4 font-mono tracking-wide">
                  Select the core objective for your managed deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {STAGE_3_OPTIONS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleStage3Select(item.title)}
                    className="group p-6 bg-[#201E19] hover:bg-[#2A231D] border-2 border-[#3A362D] hover:border-[var(--accent)] text-left transition-all duration-200 rounded-[var(--radius)] flex items-center justify-between cursor-pointer"
                  >
                    <div className="pr-4">
                      <div className="font-bold text-lg sm:text-xl text-[var(--dark-text)] group-hover:text-white transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-[#8A8578] mt-2 group-hover:text-[#B9B5AA] transition-colors leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-[#8A8578] group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all flex-none" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4: Checkout Fork */}
          {currentStage === 4 && (
            <div className="funnel-fade space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-['Big_Shoulders'] font-bold uppercase tracking-tight text-[var(--dark-text)] leading-none">
                  Your <span className="text-[#3ECF6E]">blueprint</span> is ready.
                </h1>
                <p className="text-base text-[#B9B5AA] mt-4 font-mono tracking-wide">
                  Based on your inputs, we&apos;ve configured the optimal architecture for your firm.
                </p>
              </div>

              {/* Dynamic Summary Card */}
              <div className="p-6 bg-[#201E19] border-2 border-[#3ECF6E]/40 rounded-[var(--radius)] font-mono text-sm shadow-[0_0_20px_rgba(62,207,110,0.05)]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3A362D]">
                  <span className="text-[#3ECF6E] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    RECOMMENDED DEPLOYMENT
                  </span>
                  <span className="text-white font-bold bg-[#171512] px-3 py-1 border border-[#3A362D] rounded-sm">
                    {recommendation.planName} PLAN
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-[#3A362D]/40 pb-2">
                    <span className="text-[#8A8578]">Profile Focus:</span>
                    <span className="text-[var(--accent)] font-bold text-base">{recommendation.focus}</span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-[#8A8578] block mb-3">Included Architecture:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recommendation.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--dark-text)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-none mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-2">
                <a
                  href={recommendation.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCheckoutClick(recommendation.planName)}
                  className="w-full bg-[var(--accent)] hover:bg-[#C93A00] text-white border-2 border-[var(--accent)] hover:border-[#C93A00] font-bold py-5 px-6 rounded-[var(--radius)] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_#171512] cursor-pointer text-lg tracking-wide"
                >
                  <ShieldCheck className="w-6 h-6 flex-none" />
                  Deploy {recommendation.planName} Engine - {recommendation.price} (Zero Setup)
                </a>

                <a
                  href="https://cal.com/tekbridges"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCalendarClick}
                  className="w-full bg-transparent hover:bg-[#171512] text-[var(--dark-text)] border-2 border-[#3A362D] hover:border-[#8A8578] font-bold py-4 px-6 rounded-[var(--radius)] flex items-center justify-center gap-3 transition-all cursor-pointer text-base"
                >
                  <Calendar className="w-5 h-5 flex-none text-[#8A8578]" />
                  I need a custom scope. Book a Strategy Call.
                </a>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setCurrentStage(1)}
                  className="inline-flex items-center gap-2 text-sm text-[#8A8578] hover:text-white font-mono transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
