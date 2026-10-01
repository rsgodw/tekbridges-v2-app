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
            <h2>Look established before you feel it.</h2>
          </div>
          <p>
            When you apply for a business loan, equipment financing, or even a big
            commercial contract, the first thing they do is <b>Google you</b>.
          </p>
          <p>
            A real website with your name on the domain, your address, your
            license number and real customer contact info does one thing
            instantly: <b>it signals you&apos;re legitimate.</b> Our clients hand
            over the link at the bank and watch the tone of the meeting change.
          </p>
        </div>
      </div>
    </section>
  );
}
