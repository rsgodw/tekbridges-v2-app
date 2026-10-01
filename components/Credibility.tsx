import { Landmark } from "lucide-react";

export default function Credibility() {
  return (
    <section className="cred" id="cred">
      <div className="wrap">
        <div className="cred-card rv">
          <div className="cred-stamp">Loan-ready</div>
          <h3>
            <Landmark className="w-5 h-5 text-[var(--accent)]" />
            <span>What your banker sees</span>
          </h3>
          <div className="cred-line">
            <span>Business website</span>
            <b>yourbusiness.com &mdash; LIVE</b>
          </div>
          <div className="cred-line">
            <span>Professional email</span>
            <b>you@yourbusiness.com</b>
          </div>
          <div className="cred-line">
            <span>Local search presence</span>
            <b>INDEXED &amp; RANKING</b>
          </div>
          <div className="cred-line">
            <span>Customer contact channel</span>
            <b>FORM + PHONE + CHAT</b>
          </div>
          <div className="cred-line">
            <span>Verified info</span>
            <b>LICENSE, ADDRESS, HOURS</b>
          </div>
        </div>
        <div className="cred-copy rv">
          <div className="sec-tag">05 / Credibility</div>
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <h2>Bank-grade security. Instant credibility.</h2>
          </div>
          <p>
            When you handle sensitive client data, your digital footprint must signal
            absolute security and compliance. We build enterprise-grade
            infrastructure that passes the test.
          </p>
        </div>
      </div>
    </section>
  );
}
