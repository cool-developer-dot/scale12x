"use client";

import { useEffect, useRef, useState } from "react";
import CursorFillCta from "./CursorFillCta";
import HeroSystemsDiagram from "./HeroSystemsDiagram";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-hero-theme="dark"
      className={`hero-section hero-section--dark${ready ? " is-ready" : ""}`}
    >
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy-col">
            <a href="#platforms" data-hero-animate className="hero-eyebrow">
              <span className="hero-eyebrow__mark" aria-hidden="true">
                ≫
              </span>
              AI native growth studio
            </a>

            <h1 data-hero-animate className="hero-headline">
              <span className="hero-headline__lead">Growth,</span>{" "}
              <span className="hero-headline__accent">engineered.</span>
            </h1>

            <p data-hero-animate className="hero-support">
              Scale 12x builds the AI systems and growth infrastructure that
              let businesses scale without scaling headcount.
            </p>

            <div data-hero-animate className="hero-actions">
              <CursorFillCta
                href="/contact"
                variant="secondary"
                className="hero-primary-cta"
              >
                Start scaling
                <span aria-hidden="true">→</span>
              </CursorFillCta>
              <CursorFillCta
                href="/book"
                variant="ghost"
                className="hero-secondary-cta"
              >
                Book a strategy call
                <span aria-hidden="true">→</span>
              </CursorFillCta>
            </div>
          </div>

          <div data-hero-animate className="hero-visual-col">
            <HeroSystemsDiagram />
          </div>
        </div>

        <p data-hero-animate className="hero-locales" aria-label="Operating across">
          London · New York · San Francisco · Dubai · Riyadh
        </p>
      </div>
    </section>
  );
}
