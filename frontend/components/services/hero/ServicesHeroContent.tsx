"use client";

import { motion } from "framer-motion";

type ServicesHeroContentProps = {
  reduceMotion: boolean;
  visible: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesHeroContent({
  reduceMotion,
  visible,
}: ServicesHeroContentProps) {
  const show = visible || reduceMotion;

  return (
    <div className="services-hero__content">
      <motion.p
        className="services-hero__eyebrow"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease, delay: 0.02 }}
      >
        CAPABILITIES / 01–07
      </motion.p>

      <motion.h1
        id="services-hero-heading"
        className="services-hero__headline"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.65, ease, delay: 0.08 }}
      >
        <span className="services-hero__headline-line">One partner.</span>
        <span className="services-hero__headline-line">
          <span className="services-hero__headline-soft">Every </span>
          <span className="services-hero__headline-accent">channel.</span>
        </span>
      </motion.h1>

      <motion.p
        className="services-hero__support"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.55, ease, delay: 0.18 }}
      >
        AI-native execution across strategy, creative, technology and growth,
        one operating model, not five agencies.
      </motion.p>
    </div>
  );
}
