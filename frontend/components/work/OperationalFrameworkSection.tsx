"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import OperationalFramework from "./OperationalFramework";

export default function OperationalFrameworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bits = section.querySelectorAll<HTMLElement>("[data-work-animate]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(bits, { opacity: 0, y: 16 });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const pick = (name: string) =>
          section.querySelectorAll<HTMLElement>(
            `[data-work-animate="${name}"]`,
          );

        tl.to(pick("fw-eyebrow"), { opacity: 1, y: 0, duration: 0.4 }, 0)
          .to(pick("fw-headline"), { opacity: 1, y: 0, duration: 0.5 }, 0.06)
          .to(pick("fw-support"), { opacity: 1, y: 0, duration: 0.45 }, 0.12)
          .to(
            pick("fw-card"),
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
            0.18,
          );

        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="framework-heading"
      className="framework-section relative overflow-x-hidden"
    >
      <div className="framework-section__atmosphere" aria-hidden="true" />

      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
        <OperationalFramework />
      </div>
    </section>
  );
}
