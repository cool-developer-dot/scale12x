"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import CursorFillCta from "./CursorFillCta";

const HeroSplineBackground = dynamic(() => import("./HeroSplineBackground"), {
  ssr: false,
  loading: () => <div className="hero-spline" aria-hidden="true" />,
});

const FEATURES = [
  {
    label: "Intelligent automation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1.5 9.6 5.4 13.8 6l-3 2.9.9 4.1L8 11.2l-3.7 1.8.9-4.1-3-2.9 4.2-.6L8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Enterprise-grade security",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

const CITIES_LINE_1 = ["London", "New York", "San Francisco"] as const;
const CITIES_LINE_2 = ["Dubai", "Riyadh"] as const;

type ContrastMode = "dark" | "mid" | "bright";

function modeFromLuma(luma: number): ContrastMode {
  if (luma >= 0.42) return "bright";
  if (luma >= 0.22) return "mid";
  return "dark";
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [contrast, setContrast] = useState<ContrastMode>("dark");

  const onLumaChange = useCallback((luma: number) => {
    setContrast(modeFromLuma(luma));
  }, []);

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
      data-hero-contrast={contrast}
      className={`hero-section relative isolate flex min-h-[100svh] min-h-[100dvh] w-full flex-col overflow-hidden bg-[var(--color-bg-deep)]${ready ? " is-ready" : ""}`}
    >
      {/* Full-bleed background layer — not constrained by content max-width */}
      <div className="hero-bg" aria-hidden="true">
        <HeroSplineBackground
          sampleTargetRef={stageRef}
          onLumaChange={onLumaChange}
        />
        <div className="hero-bg__veil" />
        <div className="hero-bg__vignette" />
        <div className="hero-bg__mobile-wash" />
      </div>

      <div className="hero-shell pointer-events-none relative z-[2] mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 pb-7 md:px-8 md:pb-9 lg:px-10 lg:pb-11">
        <div
          ref={stageRef}
          className="hero-stage flex min-h-0 flex-1 flex-col items-center justify-center py-8 text-center md:py-10 lg:py-6"
        >
          <a
            href="#platforms"
            data-hero-animate
            className="hero-badge pointer-events-auto group inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--hero-badge-border)] bg-[var(--hero-badge-bg)] px-2.5 py-1.5 text-left backdrop-blur-md transition-colors hover:border-[var(--scale-border)]"
          >
            <span className="hero-badge__new shrink-0 rounded-md bg-[var(--color-accent)] px-2 py-0.5 font-mono text-[0.62rem] font-medium tracking-[0.14em] text-white uppercase">
              New
            </span>
            <span className="hero-badge__copy hero-copy-muted min-w-0 pr-1 font-sans text-[0.78rem] md:text-[0.85rem]">
              AI, cloud and cybersecurity — engineered to scale
              <span className="hero-badge__arrow ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>

          <h1
            data-hero-animate
            className="hero-copy hero-headline mt-6 max-w-[18ch] px-1 font-sans text-[clamp(2.625rem,6.2vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.05em] md:mt-8"
          >
            <span className="hero-headline__lead">Growth,</span>
            <em className="hero-headline__accent hero-serif-italic">
              amplified.
            </em>
          </h1>

          <p
            data-hero-animate
            className="hero-copy-muted hero-support mt-4 max-w-[42rem] px-1 text-[clamp(0.95rem,1.6vw,1.12rem)] leading-[1.65] md:mt-6"
          >
            <span className="block">
              AI, cybersecurity, cloud and intelligent digital systems,
            </span>
            <span className="block">
              engineered to automate, secure and scale modern businesses.
            </span>
          </p>

          <div
            data-hero-animate
            className="hero-actions pointer-events-auto mt-7 flex w-full flex-col items-center justify-center gap-0 md:mt-9 md:flex-row md:gap-3"
          >
            <CursorFillCta
              href="/contact"
              className="hero-primary-cta h-12 w-full justify-center rounded-full px-8 text-[0.88rem] md:w-auto md:min-w-[11rem]"
            >
              Start Scaling
              <span className="hero-primary-cta__arrow" aria-hidden="true">
                ↗
              </span>
            </CursorFillCta>
            <CursorFillCta
              href="/book"
              variant="ghost"
              className="hero-secondary-cta-desktop hero-ghost-cta mt-0 hidden h-12 min-w-[11rem] justify-center rounded-full px-8 text-[0.88rem] md:inline-flex"
            >
              Book a strategy call
            </CursorFillCta>
          </div>

          <a
            href="/book"
            data-hero-animate
            className="hero-secondary-link pointer-events-auto"
          >
            Book a strategy call
            <span className="hero-secondary-link__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <ul
            data-hero-animate
            className="hero-feature-row pointer-events-auto mt-9 mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2.5 md:mt-12 md:gap-3.5"
          >
            {FEATURES.map((f) => (
              <li key={f.label}>
                <CursorFillCta
                  href="#services"
                  variant="pill"
                  className="hero-feature-cta text-[0.8rem] md:text-[0.88rem]"
                >
                  <span className="cta-fill__icon">{f.icon}</span>
                  {f.label}
                </CursorFillCta>
              </li>
            ))}
          </ul>

          <ul
            data-hero-animate
            className="hero-trust-chips pointer-events-auto"
            aria-label="Delivery principles"
          >
            {FEATURES.map((f) => (
              <li key={`chip-${f.label}`}>
                <a href="#services" className="hero-trust-chip">
                  <span className="hero-trust-chip__dot" aria-hidden="true" />
                  <span className="hero-trust-chip__label">{f.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-hero-animate
          className="hero-locales mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center gap-2.5 px-1 md:gap-3"
        >
          <p className="hero-locales__label hero-copy-muted font-mono text-[0.62rem] font-medium tracking-[0.18em] uppercase">
            Operating across
          </p>
          <p className="hero-locales__cities hero-locales__cities--desktop hero-copy text-center font-sans text-[0.72rem] leading-relaxed tracking-[0.12em] uppercase opacity-80 md:text-[0.82rem] md:tracking-[0.14em]">
            London · New York · San Francisco · Dubai · Riyadh
          </p>
          <p className="hero-locales__cities hero-locales__cities--mobile">
            <span className="hero-locales__line">
              {CITIES_LINE_1.map((city, i) => (
                <span key={city} className="hero-locales__city-wrap">
                  {i > 0 ? (
                    <span className="hero-locales__sep" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <span className="hero-locales__city">{city}</span>
                </span>
              ))}
            </span>
            <span className="hero-locales__line">
              {CITIES_LINE_2.map((city, i) => (
                <span key={city} className="hero-locales__city-wrap">
                  {i > 0 ? (
                    <span className="hero-locales__sep" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <span className="hero-locales__city">{city}</span>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
