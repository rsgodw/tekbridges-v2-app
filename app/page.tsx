import TopBar from "@/components/TopBar";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Features from "@/components/Features";
import SmartChat from "@/components/SmartChat";
import Process from "@/components/Process";
import Credibility from "@/components/Credibility";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navigation />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <SmartChat />
        <Process />
        <Credibility />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
