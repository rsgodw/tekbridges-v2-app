import { MessageSquareQuote } from "lucide-react";

const PROOF = [
  {
    quote: "TekBridges understood our exact industry compliance needs. We scaled our infrastructure perfectly as we crossed $5M ARR.",
    author: "Michael Vance",
    firm: "Vance Advisory Group"
  },
  {
    quote: "Our conversion rate doubled within 30 days of deployment. I finally stopped playing web designer and got back to billing hours.",
    author: "Amanda Roth",
    firm: "Ledger & Co. Tax"
  },
  {
    quote: "The most premium digital footprint we've ever had. Deploying this platform was the highest ROI decision we made this year.",
    author: "James Sterling",
    firm: "Horizon Capital Partners"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="wrap relative z-10">
        <div className="sec-head rv text-center mb-16">
          <div className="sec-tag mx-auto">Proven Results</div>
          <h2>Trusted by elite firms.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rv">
          {PROOF.map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[24px] hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <MessageSquareQuote className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <p className="text-[17px] text-zinc-300 italic leading-relaxed mb-6">
                "{item.quote}"
              </p>
              <div>
                <div className="font-bold text-white tracking-wide">{item.author}</div>
                <div className="text-[14px] text-zinc-500 font-medium mt-1">{item.firm}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
