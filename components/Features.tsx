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
            <h3>Hosting & Security</h3>
            <p>
              Bank-grade edge hosting and SSL. You never touch a server, a renewal, or a plugin. Fully managed.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;02</div>
            <h3>Managed Updates</h3>
            <p>
              Submit an update request at any time. We handle the code, ensuring zero breakage.
            </p>
          </div>
          <div className="spec-item">
            <Search className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Technical SEO</h3>
            <p>
              Schema markup, structured data, and sub-second load times to outrank competitors.
            </p>
          </div>
          <div className="spec-item">
            <Smartphone className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Mobile Optimization</h3>
            <p>
              Designed primarily for high-speed mobile decision-making.
            </p>
          </div>
          <div className="spec-item">
            <Mail className="w-6 h-6 stroke-[var(--ink)] mb-4" />
            <h3>Lead Routing</h3>
            <p>
              Secure forms pipe directly to your CRM or inbox instantly.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;06</div>
            <h3>Custom Domain</h3>
            <p>
              We handle all DNS routing, SSL provisioning, and global CDN delivery automatically.
            </p>
          </div>
          <div className="spec-item">
            <div className="spec-num">SPEC&mdash;07</div>
            <h3>Data Ownership</h3>
            <p>
              Your domain, leads, and content are 100% yours. We simply manage the underlying infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
