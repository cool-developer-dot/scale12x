"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ServicesHeroContent from "./ServicesHeroContent";
import CapabilitySystem, {
  type SystemDensity,
} from "./CapabilitySystem";

/**
 * Master entrance phases (ms offsets from reveal):
 * 1 headline  0
 * 2 core      180
 * 3 spine     380
 * 4 nodes     520
 * 5 incoming  720
 * 6 pulse     1100
 * 7 outgoing  1200
 * 8 signal    1550
 */
const PHASE_AT = [0, 180, 380, 520, 720, 1100, 1200, 1550] as const;

function resolveDensity(width: number): SystemDensity {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1280) return "laptop";
  return "desktop";
}

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);
  const [phase, setPhase] = useState(reduceMotion ? 8 : 0);
  const [density, setDensity] = useState<SystemDensity>("desktop");
  const [finePointer, setFinePointer] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const systemY = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceMotion ? [0, 0] : [0, -15],
  );
  const systemOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    reduceMotion ? [1, 1] : [1, 0.92],
  );

  useEffect(() => {
    const sync = () => {
      setDensity(resolveDensity(window.innerWidth));
      setFinePointer(window.matchMedia("(pointer: fine)").matches);
    };
    sync();

    let raf = 0;
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    const pointerMq = window.matchMedia("(pointer: fine)");
    pointerMq.addEventListener("change", sync);
    return () => {
      window.removeEventListener("resize", onResize);
      pointerMq.removeEventListener("change", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      setPhase(8);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        PHASE_AT.forEach((ms, i) => {
          timers.push(window.setTimeout(() => setPhase(i + 1), ms));
        });
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className={`services-hero services-hero--${density}`}
    >
      <div className="services-hero__atmosphere" aria-hidden="true" />

      <div className="services-hero__shell">
        <ServicesHeroContent reduceMotion={reduceMotion} visible={visible} />

        <motion.div
          className="services-hero__visual"
          style={{ y: systemY, opacity: systemOpacity }}
        >
          <CapabilitySystem
            reduceMotion={reduceMotion}
            phase={phase}
            density={density}
            allowParallax={finePointer && density === "desktop"}
          />
        </motion.div>
      </div>
    </section>
  );
}
