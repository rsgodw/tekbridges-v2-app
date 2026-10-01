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
            <h2>A website that answers while you&apos;re on a job.</h2>
          </div>
          <p>
            Most customer questions come in at <strong>8&ndash;10pm</strong>{" "}
            &mdash; exactly when you&apos;re elbows-deep in a repair. Our{" "}
            <strong>Smart Chat assistant</strong> answers your common questions
            instantly, qualifies the lead, and pushes them to call or fill your
            form.
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
              <div className="bubble user">Are you open Saturdays?</div>
              <div className="bubble bot">
                Yes! We&apos;re open Saturdays 8am&ndash;2pm for quotes and
                bookings. Want me to have the team reach out to you today? You
                can also call us directly &mdash; the number&apos;s right at the
                top of the page. &#128222;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
