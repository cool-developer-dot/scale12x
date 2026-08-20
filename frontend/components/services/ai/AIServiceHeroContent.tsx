"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type AIServiceHeroContentProps = {
  reduceMotion: boolean;
  visible: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function AIServiceHeroContent({
  reduceMotion,
  visible,
}: AIServiceHeroContentProps) {
  const show = visible || reduceMotion;

  return (
    <div className="ai-hero__content">
      <motion.p
        className="ai-hero__eyebrow"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease, delay: 0.1 }}
      >
        02 / AI &amp; AUTOMATION
      </motion.p>

      <motion.p
        className="ai-hero__service"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
      >
        AI &amp; Automation
      </motion.p>

      <motion.h1
        id="ai-service-hero-heading"
        className="ai-hero__headline"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.65, ease, delay: 0.32 }}
      >
        <span className="ai-hero__headline-line">
          <span className="ai-hero__headline-soft">Turn repetitive work</span>
        </span>
        <span className="ai-hero__headline-line">
          <span className="ai-hero__headline-soft">into </span>
          <span className="ai-hero__headline-accent">intelligent</span>
        </span>
        <span className="ai-hero__headline-line">
          <span className="ai-hero__headline-accent">systems.</span>
        </span>
      </motion.h1>

      <motion.p
        className="ai-hero__support"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.55, ease, delay: 0.48 }}
      >
        Custom AI apps, chatbots, and production workflows, AI-native, not
        bolted on. Ships in weeks.
      </motion.p>

      <motion.div
        className="ai-hero__cta-row"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease, delay: 0.62 }}
      >
        <Link href="/contact" className="ai-hero__cta-primary">
          Discuss Your AI System
          <span aria-hidden="true"> ↗</span>
        </Link>
        <a href="#ai-capabilities" className="ai-hero__cta-secondary">
          Explore capabilities
          <span aria-hidden="true"> ↓</span>
        </a>
      </motion.div>

      <motion.p
        className="ai-hero__meta"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.78 }}
      >
        <span className="ai-hero__meta-accent">AI</span>
        <span aria-hidden="true"> · </span>
        AGENTS
        <span aria-hidden="true"> · </span>
        AUTOMATION
        <span aria-hidden="true"> · </span>
        INTEGRATION
      </motion.p>
    </div>
  );
}
