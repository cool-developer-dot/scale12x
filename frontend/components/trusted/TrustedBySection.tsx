"use client";

import { useEffect, useRef, useState } from "react";
import PlatformMarquee from "./PlatformMarquee";
import { PLATFORM_LOGOS } from "./data";

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platforms"
      aria-labelledby="platforms-heading"
      className={`platform-band${visible ? " is-visible" : ""}`}
    >
      <div className="platform-band__inner">
        <h2 id="platforms-heading" className="platform-band__label">
          Built across
          <span className="platform-band__label-line">leading platforms</span>
        </h2>

        <div className="platform-band__divider" aria-hidden="true" />

        <div className="platform-band__track-wrap">
          <PlatformMarquee platforms={PLATFORM_LOGOS} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
