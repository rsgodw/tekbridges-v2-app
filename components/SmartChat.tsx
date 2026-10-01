"use client";

import { Clock, Tag, Lock, Zap } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function SmartChat() {
  const { openChat } = useChat();

  const handleChipClick = (question: string) => {
    openChat(question);
  };

  return (
    <section className="ai" id="ai">
      <div className="wrap ai-grid">
        <div className="ai-copy rv">
          <div className="sec-tag">03 / The upgrade</div>
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <h2>A platform that qualifies leads while you&apos;re in a meeting.</h2>
          </div>
          <p>
            High-value clients research your firm outside of standard business
            hours. Our <strong>Smart Chat assistant</strong> answers complex FAQs
            instantly, qualifies the prospect&apos;s budget, and pushes them to
            book a consultation.
          </p>
          <p>
            It&apos;s trained on <strong>your</strong> services, your service
            area, your hours. It never sleeps, never misses a lead, and it&apos;s
            included in the Pro + AI plan.
          </p>

          <div className="demo-chips rv">
            <button
              className="chip"
              onClick={() => handleChipClick("What are your hours?")}
              type="button"
            >
              <Clock className="w-3.5 h-3.5" /> &ldquo;What are your hours?&rdquo;
            </button>
            <button
              className="chip"
              onClick={() => handleChipClick("How much does a website cost?")}
              type="button"
            >
              <Tag className="w-3.5 h-3.5" /> &ldquo;How much does it cost?&rdquo;
            </button>
            <button
              className="chip"
              onClick={() => handleChipClick("Do I own my website?")}
              type="button"
            >
              <Lock className="w-3.5 h-3.5" /> &ldquo;Do I own my site?&rdquo;
            </button>
            <button
              className="chip"
              onClick={() => handleChipClick("How fast can I launch?")}
              type="button"
            >
              <Zap className="w-3.5 h-3.5" /> &ldquo;How fast can I launch?&rdquo;
            </button>
          </div>

          <p
            className="rv"
            style={{
              marginTop: "28px",
              fontSize: "13.5px",
              color: "#8A8578",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            &crarr; Try it live &mdash; tap the orange chat button, bottom right.
          </p>
        </div>

        <div className="rv">
          <div className="chat-preview">
            <div className="chat-preview-head">
              <span className="dot-online" />
              <div>
                <b>TekBridges Assistant</b>
                <small>Online &middot; replies instantly</small>
              </div>
            </div>
            <div className="chat-preview-body">
              <div className="bubble user">Are you available for consultations this week?</div>
              <div className="bubble bot">
                Our team is available for initial strategy consultations Monday
                through Friday. Would you like me to share a link to our secure
                booking calendar so we can evaluate your firm&apos;s needs?
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
