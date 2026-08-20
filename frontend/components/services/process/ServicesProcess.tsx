"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSectionVisibility } from "../hero/useSectionVisibility";
import ProcessSystem, {
  ProcessHeader,
  useProcessEntrance,
} from "./ProcessSystem";
import { useProcessSequence } from "./useProcessSequence";

function useIsVertical() {
  const [vertical, setVertical] = useState(false);
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVertical(window.innerWidth < 768);
      setAllowHover(
        window.innerWidth >= 768 &&
          window.matchMedia("(pointer: fine)").matches,
      );
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
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { vertical, allowHover };
}

export default function ServicesProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);
  const { vertical, allowHover } = useIsVertical();

  const { active: sectionActive } = useSectionVisibility(sectionRef, {
    threshold: 0.15,
    rootMargin: "60px 0px",
  });

  const phase = useProcessEntrance(visible, reduceMotion);
  const spineDrawn = phase >= 3 || reduceMotion;
  const sequenceEnabled = phase >= 4 && visible;

  const {
    activeIndex,
    signal,
    illuminateTo,
    overrideStep,
    releaseOverride,
  } = useProcessSequence({
    enabled: sequenceEnabled && !reduceMotion,
    sectionActive,
    reduceMotion,
  });

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const onEnter = useCallback(
    (index: number) => {
      overrideStep(index);
    },
    [overrideStep],
  );

  const onLeave = useCallback(() => {
    releaseOverride();
  }, [releaseOverride]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className={`services-process${sectionActive ? "" : " is-paused"}${vertical ? " is-vertical" : ""}`}
    >
      <div className="services-process__atmosphere" aria-hidden="true" />

      <div className="services-process__shell">
        <ProcessHeader reduceMotion={reduceMotion} phase={phase} />

        <ProcessSystem
          activeIndex={activeIndex}
          illuminateTo={illuminateTo}
          signal={signal}
          reduceMotion={reduceMotion}
          vertical={vertical}
          drawn={spineDrawn}
          allowHover={allowHover && !reduceMotion}
          onEnter={onEnter}
          onLeave={onLeave}
        />

        <motion.p
          className="services-process__statement"
          initial={false}
          animate={{
            opacity: phase >= 4 || reduceMotion ? 1 : 0,
            y: phase >= 4 || reduceMotion ? 0 : 8,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span className="services-process__statement-rule" aria-hidden="true" />
          Measure. Refine. Compound.
          <span className="services-process__statement-rule" aria-hidden="true" />
        </motion.p>
      </div>
    </section>
  );
}
