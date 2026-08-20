"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import AIServiceHeroContent from "./AIServiceHeroContent";
import AIWorkflowVisual, { type VisualDensity } from "./AIWorkflowVisual";

/**
 * Entrance choreography (ms from first intersect):
 * content cascade in AIServiceHeroContent
 * visual framework ~800ms
 * sequence start   ~1500ms
 */
const ASSEMBLE_MS = 700;
const SEQUENCE_START_MS = 1100;

function resolveDensity(width: number): VisualDensity {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1280) return "laptop";
  return "desktop";
}

export default function AIServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);
  const [assembled, setAssembled] = useState(reduceMotion);
  const [sequenceReady, setSequenceReady] = useState(reduceMotion);
  const [density, setDensity] = useState<VisualDensity>("desktop");
  const [finePointer, setFinePointer] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const visualFade = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? [1, 1] : [1, 0.88],
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
    if (reduceMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        timers.push(window.setTimeout(() => setAssembled(true), ASSEMBLE_MS));
        timers.push(
          window.setTimeout(() => setSequenceReady(true), SEQUENCE_START_MS),
        );
        observer.disconnect();
      },
      { threshold: 0.16 },
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
      id="ai-service-hero"
      aria-labelledby="ai-service-hero-heading"
      className={`ai-hero ai-hero--${density}`}
    >
      <div className="ai-hero__atmosphere" aria-hidden="true" />

      <div className="ai-hero__shell">
        <AIServiceHeroContent reduceMotion={reduceMotion} visible={visible} />

        <motion.div
          className="ai-hero__visual"
          style={{ opacity: visualFade }}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={
            visible || reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
          }
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: reduceMotion ? 0 : 0.55,
          }}
        >
          <AIWorkflowVisual
            reduceMotion={reduceMotion}
            assembled={assembled}
            entranceReady={sequenceReady}
            density={density}
            allowParallax={
              finePointer && (density === "desktop" || density === "laptop")
            }
          />
        </motion.div>

        <p className="ai-hero__meta ai-hero__meta--mobile" aria-hidden="true">
          <span className="ai-hero__meta-accent">AI</span>
          {" · "}AGENTS{" · "}AUTOMATION{" · "}INTEGRATION
        </p>
      </div>

      <div
        id="ai-capabilities"
        className="ai-hero__sentinel"
        aria-hidden="true"
      />
    </section>
  );
}
