import { Search, Smartphone, Mail } from "lucide-react";

export default function Features() {
  return (
    <section className="included">
      <div className="wrap">
        <div className="sec-head rv">
          <div className="sec-tag">02 / What&apos;s in the box</div>
          <h2>
            Everything included.
            <br />
            Nothing extra.
          </h2>
        </div>
        <div className="spec-grid rv">
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;01</div>
            <h3>Hosting, done</h3>
            <p>
              Fast, secure hosting with SSL included. You never touch a server,
              a renewal, or a plugin update. It just works.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;02</div>
            <h3>Monthly maintenance</h3>
            <p>
              One update request per month: change your hours, prices, photos,
              service list, address &mdash; anything copy-level.
            </p>
          </div>
          <div className="spec-item">
            <Search className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Local SEO</h3>
            <p>
              Page titles, descriptions, schema markup and Google-friendly
              structure so nearby customers actually find you.
            </p>
          </div>
          <div className="spec-item">
            <Smartphone className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Mobile-first</h3>
            <p>
              Designed for the phone in a customer&apos;s hand, not the desktop
              in your office.
            </p>
          </div>
          <div className="spec-item">
            <Mail className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Lead form</h3>
            <p>
              Every inquiry lands in your inbox the moment it&apos;s sent. No
              dashboard to check.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;06</div>
            <h3>Domain &amp; email</h3>
            <p>
              Your own .com and a professional email address &mdash; invoices from{" "}
              <em>you@yourbusiness.com</em> close more deals.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;07</div>
            <h3>You own your data</h3>
            <p>
              Your domain, your client lists, and your raw content are 100%
              yours. The underlying secure infrastructure and codebase is
              licensed and maintained by TekBridges as a managed service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
