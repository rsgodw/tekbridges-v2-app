"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { usePostHog } from "posthog-js/react";
import {
  ChevronRight,
  ShieldCheck,
  Calendar,
  Globe,
  CheckCircle2,
  ChevronLeft,
  Activity,
  Zap,
  MessageSquareQuote,
  Mic,
  Square,
  Building2,
  Mail,
  Phone,
  Clock
} from "lucide-react";
import Link from "next/link";

type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface FunnelData {
  industry: string;
  revenue: string;
  timeFocus: string;
  painPoint: string;
  aesthetic: string;
  domain: string;
  firmName: string;
  email: string;
  phone: string;
  hours: string;
  bio: string;
}

const STAGE_1_OPTIONS = [
  "Accounting & CPA",
  "Financial Consulting",
  "IT & Tech Consulting",
  "Legal Counsel",
  "Fractional CFO",
  "Enterprise B2B Services",
];

const STAGE_2_OPTIONS = [
  "Under $500k",
  "$500k - $2M",
  "$2M - $10M",
  "Over $10M",
];

const STAGE_3_OPTIONS = [
  { title: "Executing client work & generating revenue.", desc: "Focusing on what I do best.", recommended: true },
  { title: "Managing servers, plugins, and web developers.", desc: "Dealing with technical headaches.", recommended: false },
];

const STAGE_4_OPTIONS = [
  { title: "Low Conversion Rate", desc: "Traffic isn't turning into qualified leads." },
  { title: "Outdated Infrastructure", desc: "Current setup looks cheap and performs poorly." },
  { title: "Compliance & Security", desc: "Need secure client portals and data pipelines." },
];

const STAGE_5_OPTIONS = [
  { title: "Corporate & Trustworthy", desc: "Bank-grade aesthetics, highly professional." },
  { title: "Bold & Disruptive", desc: "Aggressive styling that stands out." },
  { title: "Sleek & Minimalist", desc: "Focus entirely on the content. High white-space." },
];

interface BlueprintRecommendation {
  planName: string;
  price: string;
  stripeLink: string;
  focus: string;
  features: string[];
}

function getRecommendation(data: FunnelData): BlueprintRecommendation {
  const isHighEnd = data.revenue === "$2M - $10M" || data.revenue === "Over $10M";
  
  if (data.painPoint === "Compliance & Security" || (isHighEnd && data.industry.includes("Legal"))) {
    return {
      planName: "Enterprise + AI",
      price: "$599/mo",
      stripeLink: "https://buy.stripe.com/test_599",
      focus: "Bank-Grade Compliance",
      features: [
        "Encrypted document pipelines",
        "AI client intake automation",
        "SOC2-ready architecture",
        `${data.aesthetic} UI Framework`
      ]
    };
  }

  if (data.painPoint === "Low Conversion Rate" || data.industry.includes("Tech") || isHighEnd) {
    return {
      planName: "Pro Growth",
      price: "$399/mo",
      stripeLink: "https://buy.stripe.com/test_399",
      focus: "Lead Acquisition System",
      features: [
        "Advanced Local SEO & Schema",
        "Conversion-optimized funnels",
        "Sub-1-second edge routing",
        `${data.aesthetic} Design System`
      ]
    };
  }

  return {
    planName: "Starter Core",
    price: "$199/mo",
    stripeLink: "https://buy.stripe.com/test_199",
    focus: "Modern Digital Footprint",
    features: [
      "Lightning-fast Edge hosting",
      "SSL & Privacy Protocols",
      "Managed monthly updates",
      `${data.aesthetic} Layout`
    ]
  };
}

const SOCIAL_PROOF: Record<number, { quote: string; author: string; firm: string }> = {
  1: { quote: "TekBridges understood our exact industry compliance needs.", author: "Michael Vance", firm: "Vance Advisory Group" },
  2: { quote: "They scaled our infrastructure perfectly as we crossed $5M ARR.", author: "Sarah Jenkins", firm: "Apex Cloud Consulting" },
  3: { quote: "I finally stopped playing web designer and got back to billing hours.", author: "David Chen", firm: "Nexus Corporate Law" },
  4: { quote: "Our conversion rate doubled within 30 days of deployment.", author: "Amanda Roth", firm: "Ledger & Co. Tax" },
  5: { quote: "The most premium digital footprint we've ever had.", author: "James Sterling", firm: "Horizon Capital Partners" },
  6: { quote: "The technical audit exposed exactly why we were losing leads.", author: "Elena Rostova", firm: "B2B Growth Dynamics" },
  7: { quote: "Deploying this platform was the highest ROI decision we made this year.", author: "Marcus Thorne", firm: "Thorne Capital Partners" },
  8: { quote: "The onboarding was entirely frictionless. We were live 48 hours later.", author: "Jessica Lin", firm: "Lin Financial Advisory" },
  9: { quote: "The AI took my rambling voice memo and turned it into the most professional bio I've ever read.", author: "Greg Hughes", firm: "Hughes & Partners CFO" },
  10: { quote: "Uncompromising quality from the first click to the final deployment.", author: "Simon Alcott", firm: "Alcott Tech Consulting" },
};

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
    revenue: "",
    timeFocus: "",
    painPoint: "",
    aesthetic: "",
    domain: "",
    firmName: "",
    email: "",
    phone: "",
    hours: "",
    bio: "",
  });

  const [domainInput, setDomainInput] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditText, setAuditText] = useState("Establishing secure connection...");
  const [auditProgress, setAuditProgress] = useState(0);

  // Voice recognition state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    captureEvent("funnel_started", { path: "/blueprint" });

    // Initialize Web Speech API if supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false; // keep it simple, only final results

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript) {
            setFormData((prev) => ({ ...prev, bio: prev.bio + finalTranscript }));
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const handleSelect = (field: keyof FunnelData, value: string, nextStage: Stage) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    captureEvent(`funnel_${field}_selected`, { value });
    setCurrentStage(nextStage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const runAuditAnimation = (domain: string) => {
    setFormData((prev) => ({ ...prev, domain }));
    captureEvent("funnel_audit_run", { domain });

    setIsAuditing(true);
    setAuditProgress(10);
    setAuditText("Evaluating TTFB (Time to First Byte)...");

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const t1 = setTimeout(() => {
      setAuditText("Scanning SSL & cipher suites...");
      setAuditProgress(45);
    }, 900);

    const t2 = setTimeout(() => {
      setAuditText("Analyzing conversion bottlenecks...");
      setAuditProgress(80);
    }, 1800);
    
    const t3 = setTimeout(() => {
      setAuditText("Audit complete. Generating blueprint.");
      setAuditProgress(100);
    }, 2600);

    const t4 = setTimeout(() => {
      setIsAuditing(false);
      setCurrentStage(7);
    }, 3200);

    timersRef.current.push(t1, t2, t3, t4);
  };

  const handleDomainSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    runAuditAnimation(domainInput.trim());
  };

  const handleDomainSkip = () => {
    setFormData((prev) => ({ ...prev, domain: "None" }));
    captureEvent("funnel_audit_skipped");
    setCurrentStage(7);
  };

  const handleStage8Submit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.firmName || !formData.email || !formData.phone) return;
    captureEvent("funnel_intake_basic_completed");
    setCurrentStage(9);
  };

  const handleStage9Submit = (e: FormEvent) => {
    e.preventDefault();
    captureEvent("funnel_intake_bio_completed", { bioLength: formData.bio.length });
    setCurrentStage(10);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support voice typing. Please type your bio manually.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const recommendation = getRecommendation(formData);
  const currentProof = SOCIAL_PROOF[currentStage];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-6 sm:px-12 font-sans relative overflow-hidden">
      
      {/* Liquid Glass Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Nav */}
      <div className="w-full max-w-3xl mb-8 flex justify-between items-center relative z-10">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium text-sm">
          <ChevronLeft className="w-4 h-4" /> Exit
        </Link>
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-6 h-6 bg-[var(--accent)] rounded-[6px] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          TekBridges
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.4)] min-h-[540px] flex flex-col relative z-10 transition-all">
        
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                s === currentStage ? "w-10 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          
          {/* STAGE 1 */}
          {currentStage === 1 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  What is your firm's focus?
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  Select your primary industry to customize the infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STAGE_1_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect("industry", opt, 2)}
                    className="p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-left transition-all duration-200 rounded-[16px] flex items-center justify-between group active:scale-[0.98]"
                  >
                    <span className="font-semibold text-[17px] text-white">
                      {opt}
                    </span>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[var(--accent)] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2 */}
          {currentStage === 2 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Current firm size
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  We scale architecture based on bandwidth and compliance needs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto w-full">
                {STAGE_2_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect("revenue", opt, 3)}
                    className="p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-center transition-all duration-200 rounded-[16px] active:scale-[0.98]"
                  >
                    <span className="font-semibold text-lg text-white">
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 3 (Soft Yes) */}
          {currentStage === 3 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                  As a firm leader, where is your time best spent?
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  We partner with firms who value their time.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
                {STAGE_3_OPTIONS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelect("timeFocus", item.title, 4)}
                    className={`p-6 bg-white/5 hover:bg-white/10 border ${item.recommended ? 'border-[var(--accent)]/40 hover:border-[var(--accent)] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-white/5 hover:border-white/20'} text-left transition-all duration-200 rounded-[16px] flex items-center justify-between group active:scale-[0.98]`}
                  >
                    <div>
                      <div className="font-bold text-[17px] text-white">
                        {item.title}
                      </div>
                      <div className="text-[15px] text-zinc-400 mt-1.5 font-medium">
                        {item.desc}
                      </div>
                    </div>
                    {item.recommended && (
                      <CheckCircle2 className="w-6 h-6 text-[var(--accent)] transition-colors ml-4 flex-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4 */}
          {currentStage === 4 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Primary Bottleneck
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  What is currently holding your digital presence back?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
                {STAGE_4_OPTIONS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelect("painPoint", item.title, 5)}
                    className="p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-left transition-all duration-200 rounded-[16px] flex items-center justify-between group active:scale-[0.98]"
                  >
                    <div>
                      <div className="font-bold text-[17px] text-white">
                        {item.title}
                      </div>
                      <div className="text-[15px] text-zinc-400 mt-1.5 font-medium">
                        {item.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[var(--accent)] transition-colors ml-4 flex-none" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 5 */}
          {currentStage === 5 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Design Aesthetic
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  How should your brand feel to a prospective client?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
                {STAGE_5_OPTIONS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelect("aesthetic", item.title, 6)}
                    className="p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-left transition-all duration-200 rounded-[16px] flex items-center justify-between group active:scale-[0.98]"
                  >
                    <div>
                      <div className="font-bold text-[17px] text-white">
                        {item.title}
                      </div>
                      <div className="text-[15px] text-zinc-400 mt-1.5 font-medium">
                        {item.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[var(--accent)] transition-colors ml-4 flex-none" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 6 */}
          {currentStage === 6 && (
            <div className="funnel-fade space-y-10">
              {isAuditing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                  <div className="relative">
                    <div className="w-20 h-20 border-[3px] border-white/10 border-t-[var(--accent)] rounded-full animate-spin" />
                    <Activity className="w-8 h-8 text-[var(--accent)] absolute inset-0 m-auto animate-pulse" />
                  </div>

                  <div className="w-full max-w-[280px] space-y-4">
                    <div className="flex justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      <span>{auditText}</span>
                      <span className="text-white">{auditProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${auditProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                      Current Footprint
                    </h1>
                    <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                      Enter your existing domain to run an edge-performance audit.
                    </p>
                  </div>

                  <form onSubmit={handleDomainSubmit} className="space-y-4 max-w-sm mx-auto w-full">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. yourfirm.com"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white focus:border-[var(--accent)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--accent)] p-6 text-lg text-center rounded-[16px] outline-none transition-all placeholder-zinc-600 font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[var(--accent)] hover:bg-[#2563EB] text-white font-semibold py-5 px-6 text-lg rounded-[16px] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                      Run Technical Audit
                    </button>
                    <button
                      type="button"
                      onClick={handleDomainSkip}
                      className="w-full text-zinc-500 hover:text-white font-medium py-4 px-6 text-[15px] transition-colors"
                    >
                      Skip / I don't have one
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* STAGE 7: Output & Bridge to Intake */}
          {currentStage === 7 && (
            <div className="funnel-fade space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <ShieldCheck className="w-8 h-8 text-[var(--accent)]" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Your architecture is mapped.
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  Based on your inputs ({formData.industry}, {formData.painPoint}), here is your blueprint.
                </p>
              </div>

              <div className="p-8 bg-black/40 border border-white/10 rounded-[20px] max-w-sm mx-auto w-full text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-[var(--accent)]/30 blur-[30px]" />
                
                <div className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  Recommended Deployment
                </div>
                <div className="text-3xl font-bold text-white mb-6">
                  {recommendation.planName}
                </div>
                
                <ul className="space-y-4 text-left">
                  {recommendation.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-zinc-300">
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent)] flex-none mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 max-w-sm mx-auto w-full pt-2">
                <button
                  onClick={() => {
                    captureEvent("funnel_architecture_accepted");
                    setCurrentStage(8);
                  }}
                  className="w-full bg-[var(--accent)] hover:bg-[#2563EB] text-white font-semibold py-5 px-6 text-lg rounded-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full border-[2px] border-white/40 rounded-[16px] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"></div>
                  Initialize Setup &mdash; {recommendation.price}
                </button>
              </div>
            </div>
          )}

          {/* STAGE 8: Intake - Basic Info */}
          {currentStage === 8 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Let's begin the build.
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium">
                  We need a few administrative details to provision your secure environment.
                </p>
              </div>

              <form onSubmit={handleStage8Submit} className="space-y-4 max-w-sm mx-auto w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="firmName"
                    required
                    placeholder="Legal Firm / Company Name"
                    value={formData.firmName}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 text-white focus:border-[var(--accent)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--accent)] p-5 pl-14 text-lg rounded-[16px] outline-none transition-all placeholder-zinc-600 font-medium"
                  />
                  <Building2 className="w-5 h-5 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Primary Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 text-white focus:border-[var(--accent)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--accent)] p-5 pl-14 text-lg rounded-[16px] outline-none transition-all placeholder-zinc-600 font-medium"
                  />
                  <Mail className="w-5 h-5 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Business Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 text-white focus:border-[var(--accent)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--accent)] p-5 pl-14 text-lg rounded-[16px] outline-none transition-all placeholder-zinc-600 font-medium"
                  />
                  <Phone className="w-5 h-5 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  type="submit"
                  disabled={!formData.firmName || !formData.email || !formData.phone}
                  className="w-full bg-[var(--accent)] hover:bg-[#2563EB] disabled:opacity-50 disabled:hover:bg-[var(--accent)] text-white font-semibold py-5 px-6 text-lg rounded-[16px] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2"
                >
                  Save & Continue
                </button>
              </form>
            </div>
          )}

          {/* STAGE 9: Firm Hours & AI Bio */}
          {currentStage === 9 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center max-w-xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Firm Bio & Identity
                </h1>
                <p className="text-[17px] text-zinc-400 mt-4 font-medium leading-relaxed">
                  Click the microphone and tell us the story of your firm, your ideal clients, and your mission. Our AI will automatically optimize this raw audio into a highly-converting, professional bio.
                </p>
              </div>

              <form onSubmit={handleStage9Submit} className="space-y-6 max-w-lg mx-auto w-full">
                
                {/* Voice Input Section */}
                <div className={`p-1 rounded-[20px] transition-all duration-300 ${isRecording ? 'bg-gradient-to-r from-red-500 to-rose-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]' : 'bg-transparent'}`}>
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-[18px] relative">
                    
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
                          : 'bg-white/10 text-white hover:bg-[var(--accent)]'
                      }`}
                    >
                      {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <div className="pr-16">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
                        {isRecording ? "Listening..." : "Your Firm's Story"}
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Click the microphone to speak, or type your bio here..."
                        className="w-full bg-transparent border-none text-white focus:ring-0 p-0 text-lg resize-none outline-none placeholder-zinc-600 font-medium min-h-[140px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="hours"
                    required
                    placeholder="Standard Operating Hours (e.g., Mon-Fri 9am-5pm)"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 text-white focus:border-[var(--accent)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--accent)] p-5 pl-14 text-lg rounded-[16px] outline-none transition-all placeholder-zinc-600 font-medium"
                  />
                  <Clock className="w-5 h-5 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] hover:bg-[#2563EB] text-white font-semibold py-5 px-6 text-lg rounded-[16px] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] mt-4"
                >
                  Finalize Blueprint
                </button>
              </form>
            </div>
          )}

          {/* STAGE 10: Final Checkout Redirect */}
          {currentStage === 10 && (
            <div className="funnel-fade space-y-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-[var(--accent)]" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                  Ready for Provisioning.
                </h1>
                <p className="text-[17px] text-zinc-400 font-medium max-w-md mx-auto leading-relaxed">
                  Your intake data has been securely saved. Complete your checkout to spin up the <b>{recommendation.planName}</b> environment for {formData.firmName || "your firm"}.
                </p>
              </div>

              <div className="space-y-4 max-w-sm mx-auto w-full pt-6">
                <a
                  href={recommendation.stripeLink}
                  className="w-full bg-[var(--accent)] hover:bg-[#2563EB] text-white font-semibold py-5 px-6 text-lg rounded-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full border-[2px] border-white/40 rounded-[16px] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"></div>
                  Deploy Platform — {recommendation.price}
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Dynamic Social Proof Banner */}
      {currentProof && (
        <div className="w-full max-w-2xl mt-8 animate-in fade-in duration-700 relative z-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-[20px] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-none mt-1">
              <MessageSquareQuote className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-[17px] md:text-[18px] font-medium text-zinc-300 italic leading-relaxed">"{currentProof.quote}"</p>
              <div className="mt-3 text-[14px] md:text-[15px]">
                <span className="font-bold text-white tracking-wide">{currentProof.author}</span>
                <span className="text-zinc-600 mx-3">|</span>
                <span className="text-zinc-400 font-medium">{currentProof.firm}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
