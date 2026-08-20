"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CAPABILITIES } from "./data";
import ServiceCapabilityCard from "./ServiceCapabilityCard";
import { CAPABILITY_VISUALS } from "./visuals";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);

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
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="services-gallery"
    >
      <div className="services-gallery__shell">
        <header className="services-gallery__header">
          <motion.p
            className="services-gallery__eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease }}
          >
            CAPABILITIES / 01–06
          </motion.p>

          <motion.h2
            id="capabilities-heading"
            className="services-gallery__headline"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
          >
            What actually moves growth forward.
          </motion.h2>

          <motion.p
            className="services-gallery__support"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            We sell sharp positioning. We deliver broad capability. One partner.
            Every channel.
          </motion.p>
        </header>

        <div className="services-gallery__grid">
          {CAPABILITIES.map((capability, i) => {
            const Visual = CAPABILITY_VISUALS[capability.visual];
            return (
              <motion.div
                key={capability.id}
                className="services-gallery__cell"
                initial={
                  reduceMotion ? false : { opacity: 0, y: 18 }
                }
                animate={
                  visible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{
                  duration: 0.48,
                  ease,
                  delay: reduceMotion ? 0 : 0.1 + i * 0.05,
                }}
              >
                <ServiceCapabilityCard
                  capability={capability}
                  Visual={Visual}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
