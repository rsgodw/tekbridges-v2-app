import { ShieldCheck } from "lucide-react";

export default function Credibility() {
  return (
    <section className="cred" id="cred">
      <div className="wrap">
        <div className="cred-card rv">
          <div className="cred-stamp">Compliance-Ready</div>
          <h3>
            <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
            <span>What your clients see</span>
          </h3>
          <div className="cred-line">
            <span>Business website</span>
            <b>NEXT.JS EDGE NETWORK</b>
          </div>
          <div className="cred-line">
            <span>Data protection</span>
            <b>DLP PROTOCOLS ACTIVE</b>
          </div>
          <div className="cred-line">
            <span>Search authority</span>
            <b>INDEXED &amp; RANKING</b>
          </div>
          <div className="cred-line">
            <span>Client intake</span>
            <b>ENCRYPTED PIPELINE</b>
          </div>
          <div className="cred-line">
            <span>Verified trust</span>
            <b>SSL &amp; PRIVACY POLICIES</b>
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
