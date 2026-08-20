"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ServiceCard from "./ServiceCard";
import { SERVICES_BOTTOM, SERVICES_TOP } from "./data";

export default function ServicesSection() {
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
    const bits = section.querySelectorAll<HTMLElement>("[data-services-animate]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
      setCardsActive(true);
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
          section.querySelector<HTMLElement>(`[data-services-animate="${name}"]`);

        tl.to(pick("eyebrow"), { opacity: 1, y: 0, duration: 0.42 }, 0)
          .to(pick("headline"), { opacity: 1, y: 0, duration: 0.55 }, 0.06)
          .to(pick("support"), { opacity: 1, y: 0, duration: 0.48 }, 0.12)
          .add(() => setCardsActive(true), 0.18);

        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="services-section relative overflow-hidden"
    >
      <div className="services-section__deco" aria-hidden="true" />

      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <header className="services-header">
          <div className="services-header__main">
            <p
              data-services-animate="eyebrow"
              className="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-[#2563EB] uppercase opacity-0"
            >
              WHAT WE DO / 01–07
            </p>
            <h2
              id="services-heading"
              data-services-animate="headline"
              className="services-header__headline mt-3 opacity-0"
            >
              <span className="block text-[#0F172A]">One partner.</span>
              <span className="block text-[#2563EB]">Every channel.</span>
            </h2>
          </div>

          <p
            data-services-animate="support"
            className="services-header__support opacity-0"
          >
            We sell sharp positioning. We deliver broad capability.
            <br className="hidden sm:block" />
            Strategy, creative, technology and AI, built as one system.
          </p>
        </header>

        <div className="services-board mt-12 sm:mt-14 lg:mt-16">
          <div className="services-row services-row--top">
            {SERVICES_TOP.map((service, i) => (
              <ServiceCard
                key={service.index}
                service={service}
                animate={cardsActive}
                reduceMotion={reduceMotion}
                delay={i * 0.08}
              />
            ))}
          </div>

          <div className="services-row services-row--bottom">
            {SERVICES_BOTTOM.map((service, i) => (
              <ServiceCard
                key={service.index}
                service={service}
                animate={cardsActive}
                reduceMotion={reduceMotion}
                delay={0.22 + i * 0.07}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
