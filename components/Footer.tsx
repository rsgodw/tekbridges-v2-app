import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <a className="logo" href="#top">
          <span className="logo-mark">
            <Wrench className="w-5 h-5 text-[#fff]" />
          </span>
          <span>
            Tek<i>Bridges</i>
          </span>
        </a>
        <div className="f-links">
          <a href="#showcase">Product</a>
          <a href="#pricing">Pricing</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="mono">
          &copy; {new Date().getFullYear()} TEKBRIDGES.COM &middot; BUILT FOR THE TRADES
        </span>
      </div>
    </footer>
  );
}
