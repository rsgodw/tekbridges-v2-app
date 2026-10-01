"use client";

import { useState, useRef, FormEvent } from "react";
import { Phone, Mail, MapPin, Rocket, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [trade, setTrade] = useState("Accounting / CPA");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("Not sure — help me choose");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    if (!phone.trim()) {
      phoneInputRef.current?.focus();
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
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

        <form id="leadForm" className="rv" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="f-name">Your name</label>
            <input
              id="f-name"
              ref={nameInputRef}
              type="text"
              placeholder="Michael Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="f-biz">Business name</label>
            <input
              id="f-biz"
              type="text"
              placeholder="Vance Advisory Group"
              value={biz}
              onChange={(e) => setBiz(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="f-trade">Your industry</label>
            <select
              id="f-trade"
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
            >
              <option>Accounting / CPA</option>
              <option>Financial Consulting</option>
              <option>IT &amp; Tech Consulting</option>
              <option>Independent Legal Counsel</option>
              <option>Fractional Exec / CFO</option>
              <option>B2B Services</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-phone">Phone</label>
            <input
              id="f-phone"
              ref={phoneInputRef}
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="f-plan">Plan you&apos;re eyeing</label>
            <select
              id="f-plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option>Not sure &mdash; help me choose</option>
              <option>Starter &mdash; $199/mo</option>
              <option>Pro &mdash; $399/mo</option>
              <option>Pro + AI &mdash; $599/mo</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-solid btn-accent"
            disabled={isSubmitted}
          >
            <Rocket className="w-4 h-4" /> Claim My $0-Down Launch
          </button>
          <div
            className={`form-msg ${isSubmitted ? "show" : ""}`}
            id="formMsg"
            style={{ display: isSubmitted ? "flex" : "none" }}
          >
            <CheckCircle2 className="w-4 h-4 text-[#3ECF6E] flex-none" />
            <span>
              Got it &mdash; we&apos;ll call you within one business day. Watch
              your phone.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
