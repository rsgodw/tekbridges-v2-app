"use client";

import { Wrench, PhoneCall } from "lucide-react";

export default function Navigation() {
  return (
    <nav id="nav">
      <div className="wrap">
        <a className="logo" href="#top">
          <span className="logo-mark">
            <Wrench className="w-5 h-5 text-[var(--accent)]" />
          </span>
          <span>
            Tek<i>Bridges</i>
          </span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#showcase">The Product</a>
          </li>
          <li>
            <a href="#ai">Smart Chat</a>
          </li>
          <li>
            <a href="#process">Process</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
        <a className="btn btn-solid btn-sm relative overflow-hidden group border-none bg-[var(--accent)] hover:bg-[#2563EB] text-white" href="/blueprint">
          <div className="absolute inset-0 w-full h-full border-[2px] border-white/40 rounded-md animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"></div>
          Deploy Platform
        </a>
      </div>
    </nav>
  );
}
