"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { TESTIMONIALS } from "./data";
import TestimonialCarousel from "./TestimonialCarousel";

const TRUST_META = [
  "Founder-led premium",
  "Senior specialists",
  "Transparent pricing",
  "Outcomes we stand behind",
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const [inView, setInView] = useState(false);
  const items = useMemo(() => TESTIMONIALS, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bits = section.querySelectorAll<HTMLElement>("[data-voice-animate]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
    } else {
      gsap.set(bits, { opacity: 0, y: 16 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        setInView(entry.isIntersecting);

        if (!entry.isIntersecting || playedRef.current || prefersReduced) return;
        playedRef.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const pick = (name: string) =>
          section.querySelectorAll<HTMLElement>(
            `[data-voice-animate="${name}"]`,
          );

        tl.to(pick("eyebrow"), { opacity: 1, y: 0, duration: 0.4 }, 0)
          .to(pick("headline"), { opacity: 1, y: 0, duration: 0.52 }, 0.05)
          .to(pick("support"), { opacity: 1, y: 0, duration: 0.45 }, 0.1)
          .to(pick("row"), { opacity: 1, y: 0, duration: 0.55 }, 0.16)
          .to(pick("trust"), { opacity: 1, y: 0, duration: 0.45 }, 0.28);
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="voices"
      aria-labelledby="voices-heading"
      className="voices-section relative overflow-x-hidden"
    >
      <div className="voices-section__atmosphere" aria-hidden="true" />

      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <header className="voices-header">
          <p
            data-voice-animate="eyebrow"
            className="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-[#3B82F6] uppercase opacity-0"
          >
            CLIENT VOICES / VERIFIED EXPERIENCE
          </p>
          <h2
            id="voices-heading"
            data-voice-animate="headline"
            className="voices-header__headline mt-3 opacity-0"
          >
            Results are better when{" "}
            <span className="text-[#2563EB]">partnership works.</span>
          </h2>
          <p
            data-voice-animate="support"
            className="voices-header__support mt-4 opacity-0"
          >
            Feedback from US B2B teams who replaced agency sprawl with one
            partner, and kept the outcomes.
          </p>
        </header>
      </div>

      <div
        data-voice-animate="row"
        className="voices-row-bleed mt-10 opacity-0 sm:mt-12 lg:mt-14"
      >
        <TestimonialCarousel items={items} inView={inView} />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div
          data-voice-animate="trust"
          className="voices-trust mt-10 opacity-0 sm:mt-12"
        >
          <p className="voices-trust__line">
            AI-native. One partner. Every channel. Founder-led premium.
          </p>
          <ul className="voices-trust__meta">
            {TRUST_META.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
