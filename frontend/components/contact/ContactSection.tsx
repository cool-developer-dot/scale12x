"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ContactCards from "./ContactCards";
import ContactInquiryForm from "./ContactInquiryForm";
import ContactBookStrip from "./ContactBookStrip";
import { ClockIcon } from "./icons";

export default function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || playedRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const bits = root.querySelectorAll<HTMLElement>("[data-contact-animate]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
      playedRef.current = true;
      return;
    }

    gsap.set(bits, { opacity: 0 });
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="eyebrow"]'),
      { y: 0 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="headline"]'),
      { y: 12 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="support"]'),
      { y: 8 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="meta"]'),
      { y: 6 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="card"]'),
      { y: 10 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="form"]'),
      { y: 16 },
    );
    gsap.set(
      root.querySelectorAll<HTMLElement>('[data-contact-animate="book-strip"]'),
      { y: 10 },
    );

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        playedRef.current = true;
      },
    });

    const pick = (name: string) =>
      root.querySelectorAll<HTMLElement>(`[data-contact-animate="${name}"]`);

    tl.to(pick("eyebrow"), { opacity: 1, duration: 0.35 }, 0.05)
      .to(pick("headline"), { opacity: 1, y: 0, duration: 0.55 }, 0.12)
      .to(pick("support"), { opacity: 1, y: 0, duration: 0.45 }, 0.28)
      .to(pick("meta"), { opacity: 1, y: 0, duration: 0.4 }, 0.38)
      .to(pick("card"), { opacity: 1, y: 0, duration: 0.42, stagger: 0.06 }, 0.48)
      .to(pick("form"), { opacity: 1, y: 0, duration: 0.55 }, 0.22)
      .to(pick("book-strip"), { opacity: 1, y: 0, duration: 0.42 }, 0.58);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="contact-page"
      aria-labelledby="contact-headline"
    >
      <div className="contact-page__shell">
        <div className="contact-page__grid">
          <div className="contact-editorial">
            <p
              data-contact-animate="eyebrow"
              className="contact-editorial__eyebrow opacity-0"
            >
              CONTACT / READY WHEN YOU ARE
            </p>

            <h1
              id="contact-headline"
              data-contact-animate="headline"
              className="contact-editorial__headline opacity-0"
            >
              <span className="contact-editorial__headline-lead">
                Let’s grow.
              </span>
              <span className="contact-editorial__headline-accent">
                The next move is yours.
              </span>
            </h1>

            <p
              data-contact-animate="support"
              className="contact-editorial__support opacity-0"
            >
              Book a 30-minute discovery call. Custom proposal in 48 hours.
              Built for US B2B teams investing $5K–$25K a month in growth.
            </p>

            <p
              data-contact-animate="meta"
              className="contact-editorial__response opacity-0"
            >
              <ClockIcon className="contact-editorial__response-icon" />
              <span>Typical response: within 1 business day.</span>
            </p>

            <div
              data-contact-animate="meta"
              className="contact-editorial__fit opacity-0"
            >
              <p>
                <strong>Best fit:</strong> US B2B businesses ($2M–$50M), SaaS,
                professional services, and home services, one partner across
                every channel.
              </p>
            </div>

            <ContactCards />
          </div>

          <div data-contact-animate="form" className="contact-page__form opacity-0">
            <ContactInquiryForm />
          </div>
        </div>
      </div>

      <ContactBookStrip />
    </section>
  );
}
