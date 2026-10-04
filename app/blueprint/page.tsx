"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { usePostHog } from "posthog-js/react";
import {
  ChevronRight,
  ShieldCheck,
  Calendar,
  Globe,
  Loader2,
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
  "Accounting & CPA",
  "Financial Consulting",
  "IT & Tech Consulting",
  "Legal Counsel",
  "Fractional CFO",
  "Other",
];

const STAGE_3_OPTIONS = [
  {
    title: "Basic Web Presence",
    desc: "A fast, secure footprint.",
  },
  {
    title: "Lead Generation",
    desc: "Optimized pipelines to capture leads.",
  },
  {
    title: "Secure Client Portal",
    desc: "Encrypted intake & portals.",
  },
];

interface BlueprintRecommendation {
  planName: string;
  price: string;
  stripeLink: string;
  focus: string;
  features: string[];
}

function getRecommendation(objective: string): BlueprintRecommendation {
  if (objective === "Secure Client Portal") {
    return {
      planName: "Pro + AI",
      price: "$599/mo",
      stripeLink: "https://buy.stripe.com/test_599",
      focus: "Bank-Grade Compliance",
      features: [
        "Encrypted document pipelines",
        "AI client intake automation",
        "SOC2-ready architecture"
      ]
    };
  }

  if (objective === "Lead Generation") {
    return {
      planName: "Pro",
      price: "$399/mo",
      stripeLink: "https://buy.stripe.com/test_399",
      focus: "Performance & SEO",
      features: [
        "Advanced Local SEO",
        "Conversion-optimized funnels",
        "Sub-1-second load times"
      ]
    };
  }

  return {
    planName: "Starter",
    price: "$199/mo",
    stripeLink: "https://buy.stripe.com/test_199",
    focus: "Digital Footprint",
    features: [
      "Edge-hosted speed",
      "SSL & Privacy Protocols",
      "Managed monthly updates"
    ]
  };
}

export default function BlueprintEngine() {
  const posthog = usePostHog();

  const captureEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
      console.log(`[PostHog Debug] Event Captured: '${eventName}'`, properties || {});
      if (posthog) {
        posthog.capture(eventName, properties);
      }
    } catch (err) {}
  };

  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [formData, setFormData] = useState<FunnelData>({
    industry: "",
    domain: "",
    objective: "",
  });

  const [domainInput, setDomainInput] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditText, setAuditText] = useState("Checking SSL...");
  const [auditProgress, setAuditProgress] = useState(0);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    captureEvent("funnel_started", { path: "/blueprint" });
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Stage 1
  const handleStage1Select = (selectedIndustry: string) => {
    setFormData((prev) => ({ ...prev, industry: selectedIndustry }));
    captureEvent("funnel_stage_1_completed", { industry: selectedIndustry });
    setCurrentStage(2);
  };

  // Stage 2
  const runAuditAnimation = (domain: string) => {
    setFormData((prev) => ({ ...prev, domain }));
    captureEvent("funnel_stage_2_audit_run", { domain });

    setIsAuditing(true);
    setAuditProgress(15);
    setAuditText("Checking SSL...");

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const t1 = setTimeout(() => {
      setAuditText("Evaluating speed...");
      setAuditProgress(55);
    }, 700);

    const t2 = setTimeout(() => {
      setAuditText("Audit complete.");
      setAuditProgress(100);
    }, 1400);

    const t3 = setTimeout(() => {
      setIsAuditing(false);
      setCurrentStage(3);
    }, 2000);

    timersRef.current.push(t1, t2, t3);
  };

  const handleDomainSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    runAuditAnimation(domainInput.trim());
  };

  const handleDomainSkip = () => {
    // Instantly skip without animation
    setFormData((prev) => ({ ...prev, domain: "Skipped" }));
    captureEvent("funnel_stage_2_skipped");
    setCurrentStage(3);
  };

  // Stage 3
  const handleStage3Select = (selectedGoal: string) => {
    setFormData((prev) => ({ ...prev, objective: selectedGoal }));
    captureEvent("funnel_stage_3_completed", { goal: selectedGoal });
    setCurrentStage(4);
  };

  const recommendation = getRecommendation(formData.objective);

  return (
    <div className="min-h-screen bg-[var(--paper-2)] flex flex-col items-center py-8 px-6 sm:px-12 font-sans selection:bg-[var(--accent)] selection:text-white">
      
      {/* Top Nav */}
      <div className="w-full max-w-2xl mb-8 flex justify-between items-center">
        <Link href="/" className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors flex items-center gap-1.5 font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-center gap-2 text-[var(--ink)] font-bold text-lg tracking-tight">
          <div className="w-6 h-6 bg-[var(--accent)] rounded-[8px] flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
          TekBridges
        </div>
      </div>

      {/* Main Card (iOS Style) */}
      <div className="w-full max-w-2xl bg-white border border-[var(--line)] p-8 sm:p-12 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[480px] flex flex-col relative overflow-hidden transition-all">
        
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === currentStage ? "w-8 bg-[var(--accent)]" : "w-1.5 bg-[#E5E5EA]"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          
          {/* STAGE 1 */}
          {currentStage === 1 && (
            <div className="funnel-fade space-y-8">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                  What is your firm's focus?
                </h1>
                <p className="text-[15px] text-[var(--ink-soft)] mt-3 font-medium">
                  Select your primary industry to customize the build.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STAGE_1_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleStage1Select(opt)}
                    className="p-4 bg-white hover:bg-[var(--paper-2)] border border-[var(--line)] text-left transition-all duration-200 rounded-[14px] flex items-center justify-between group shadow-sm active:scale-[0.98]"
                  >
                    <span className="font-semibold text-[15px] text-[var(--ink)]">
                      {opt}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[var(--line)] group-hover:text-[var(--accent)] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2 */}
          {currentStage === 2 && (
            <div className="funnel-fade space-y-8">
              {isAuditing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <Loader2 className="w-10 h-10 text-[var(--accent)] animate-spin" />
                  <div className="w-full max-w-[240px] space-y-3">
                    <div className="flex justify-between text-sm font-semibold text-[var(--ink-soft)]">
                      <span>{auditText}</span>
                      <span className="text-[var(--ink)]">{auditProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--paper-2)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${auditProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                      Existing Domain
                    </h1>
                    <p className="text-[15px] text-[var(--ink-soft)] mt-3 font-medium">
                      Enter your current URL for a quick performance check.
                    </p>
                  </div>

                  <form onSubmit={handleDomainSubmit} className="space-y-4 max-w-sm mx-auto w-full">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. yourfirm.com"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        className="w-full bg-[var(--paper-2)] border border-transparent text-[var(--ink)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[var(--accent)]/10 p-4 pl-12 text-[15px] rounded-[14px] outline-none transition-all font-medium"
                      />
                      <Globe className="w-5 h-5 text-[var(--ink-soft)] absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[var(--ink)] hover:bg-black text-white font-semibold py-4 px-6 rounded-[14px] transition-all active:scale-[0.98]"
                    >
                      Run Domain Audit
                    </button>
                    <button
                      type="button"
                      onClick={handleDomainSkip}
                      className="w-full text-[var(--ink-soft)] hover:text-[var(--ink)] font-medium py-3 px-6 text-[14px] transition-colors"
                    >
                      Skip / I don't have one
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* STAGE 3 */}
          {currentStage === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                  Primary Objective
                </h1>
                <p className="text-[15px] text-[var(--ink-soft)] mt-3 font-medium">
                  What is the main goal for your new deployment?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
                {STAGE_3_OPTIONS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleStage3Select(item.title)}
                    className="p-5 bg-white hover:bg-[var(--paper-2)] border border-[var(--line)] text-left transition-all duration-200 rounded-[14px] flex items-center justify-between group shadow-sm active:scale-[0.98]"
                  >
                    <div>
                      <div className="font-bold text-[16px] text-[var(--ink)]">
                        {item.title}
                      </div>
                      <div className="text-[14px] text-[var(--ink-soft)] mt-1 font-medium">
                        {item.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--line)] group-hover:text-[var(--accent)] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4 */}
          {currentStage === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                  Your build is ready.
                </h1>
              </div>

              <div className="p-6 bg-[var(--paper-2)] rounded-[16px] max-w-sm mx-auto w-full text-center">
                <div className="text-[13px] font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-2">
                  Recommended Tier
                </div>
                <div className="text-2xl font-bold text-[var(--ink)] mb-4">
                  {recommendation.planName}
                </div>
                
                <ul className="space-y-3 text-left">
                  {recommendation.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] font-medium text-[var(--ink)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] flex-none mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 max-w-sm mx-auto w-full">
                <a
                  href={recommendation.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[var(--accent)] hover:bg-[#005bb5] text-white font-semibold py-4 px-6 rounded-[14px] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  Deploy {recommendation.planName} — {recommendation.price}
                </a>

                <a
                  href="https://cal.com/tekbridges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] font-semibold py-4 px-6 rounded-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[var(--ink-soft)]" />
                  Book a Strategy Call
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
