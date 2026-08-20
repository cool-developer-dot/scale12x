"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CursorFillCta from "@/components/hero/CursorFillCta";

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bits = section.querySelectorAll<HTMLElement>("[data-final-cta]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, x: 0, clearProps: "transform" });
      return;
    }

    gsap.set(bits, { opacity: 0 });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="panel"]'), {
      y: 12,
    });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="eyebrow"]'), {
      y: 8,
    });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="headline"]'), {
      y: 14,
    });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="support"]'), {
      y: 10,
    });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="secondary"]'), {
      y: 8,
    });
    gsap.set(section.querySelectorAll<HTMLElement>('[data-final-cta="primary"]'), {
      x: 18,
      y: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const pick = (name: string) =>
          section.querySelectorAll<HTMLElement>(`[data-final-cta="${name}"]`);

        tl.to(pick("panel"), { opacity: 1, y: 0, duration: 0.55 }, 0)
          .to(pick("eyebrow"), { opacity: 1, y: 0, duration: 0.4 }, 0.08)
          .to(pick("headline"), { opacity: 1, y: 0, duration: 0.5 }, 0.14)
          .to(pick("support"), { opacity: 1, y: 0, duration: 0.42 }, 0.22)
          .to(pick("primary"), { opacity: 1, x: 0, duration: 0.48 }, 0.2)
          .to(pick("secondary"), { opacity: 1, y: 0, duration: 0.4 }, 0.32);

        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="final-cta-heading"
      className="final-cta-section"
    >
      <div className="final-cta-section__shell">
        <div data-final-cta="panel" className="final-cta-panel opacity-0">
          <div className="final-cta-panel__copy">
            <p data-final-cta="eyebrow" className="final-cta-panel__eyebrow opacity-0">
              READY WHEN YOU ARE
            </p>

            <h2
              id="final-cta-heading"
              data-final-cta="headline"
              className="final-cta-panel__headline opacity-0"
            >
              Let’s grow.
            </h2>

            <p data-final-cta="support" className="final-cta-panel__support opacity-0">
              The next move is yours. Built for US B2B teams investing $5K–$25K
              a month in growth.
            </p>

            <a
              href="/book"
              data-final-cta="secondary"
              className="final-cta-panel__secondary opacity-0"
            >
              Book a discovery call
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div data-final-cta="primary" className="final-cta-panel__action opacity-0">
            <CursorFillCta
              href="/contact"
              className="final-cta-panel__primary h-14 min-w-[14.5rem] justify-center px-8 text-[0.95rem] sm:h-[3.75rem] sm:min-w-[15.5rem] sm:text-[1.02rem]"
            >
              Start Scaling <span aria-hidden="true">↗</span>
            </CursorFillCta>
          </div>
        </div>
      </div>
    </section>
  );
}
