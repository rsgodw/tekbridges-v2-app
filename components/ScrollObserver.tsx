"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    // Scroll reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".rv");
    elements.forEach((el) => io.observe(el));

    // Nav scroll shadow
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      elements.forEach((el) => io.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
