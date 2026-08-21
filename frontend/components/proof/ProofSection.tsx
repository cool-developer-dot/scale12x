"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ProofMetricCard, { type ProofMetricData } from "./ProofMetricCard";

const MODULES: ProofMetricData[] = [
  {
    index: "01",
    category: "DELIVERY",
    value: 1000,
    label: "DELIVERED",
    description: "Verifiable track record across growth engagements.",
  },
  {
    index: "02",
    category: "ENTERPRISE",
    value: 360,
    label: "US GOVERNMENT PROJECT ONGOING",
    description: "Enterprise delivery on an active federal engagement.",
  },
  {
    index: "03",
    category: "VERIFIED",
    value: 100,
    label: "VERIFIED UPWORK EARNINGS",
    description: "Proof we ship real work, not decks.",
  },
];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const [cardsActive, setCardsActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerBits = section.querySelectorAll<HTMLElement>("[data-proof-animate]");

    if (prefersReduced) {
      gsap.set(headerBits, { opacity: 1, y: 0, clearProps: "transform" });
      setCardsActive(true);
      return;
    }

    gsap.set(headerBits, { opacity: 0, y: 16 });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const pick = (name: string) =>
          section.querySelector<HTMLElement>(`[data-proof-animate="${name}"]`);

        tl.to(pick("eyebrow"), { opacity: 1, y: 0, duration: 0.42 }, 0)
          .to(pick("headline"), { opacity: 1, y: 0, duration: 0.48 }, 0.07)
          .to(pick("support"), { opacity: 1, y: 0, duration: 0.42 }, 0.14)
          .add(() => setCardsActive(true), 0.22);

        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="proof-heading"
      className="proof-section relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto flex min-h-[420px] w-full max-w-[1280px] flex-col justify-center px-5 py-14 sm:min-h-[480px] sm:px-8 sm:py-16 lg:min-h-[520px] lg:px-10 lg:py-[4.5rem]">
        <header className="max-w-2xl">
          <p
            data-proof-animate="eyebrow"
            className="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase opacity-0"
          >
            PROOF, NOT PROMISES
          </p>
          <h2
            id="proof-heading"
            data-proof-animate="headline"
            className="mt-3 font-sans text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.06] font-medium tracking-[-0.035em] text-[var(--color-text)] opacity-0"
          >
            The work speaks for itself.
          </h2>
          <p
            data-proof-animate="support"
            className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[var(--color-muted)] opacity-0 sm:text-[1.02rem]"
          >
            AI-native across every practice. Founder-led premium. A track record
            you can verify.
          </p>
        </header>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-3 lg:mt-11 lg:gap-7">
          {MODULES.map((mod, i) => (
            <ProofMetricCard
              key={mod.index}
              data={mod}
              animate={cardsActive}
              reduceMotion={reduceMotion}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
