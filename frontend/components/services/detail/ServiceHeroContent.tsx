"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceConfig } from "./types";

type Props = {
  config: ServiceConfig;
  reduceMotion: boolean;
  visible: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceHeroContent({
  config,
  reduceMotion,
  visible,
}: Props) {
  const show = visible || reduceMotion;
  const headingId = `svc-hero-heading-${config.slug}`;

  // Interleave soft + accent for AI-style "into intelligent" line splits
  const lines: { soft?: string; accent?: string }[] = [];
  const soft = [...config.headline.soft];
  const accent = [...config.headline.accent];

  // Preferred: each soft line as its own row; accents as their own rows.
  // Special case: if last soft ends with space (e.g. "into "), merge with first accent.
  while (soft.length || accent.length) {
    const s = soft.shift();
    if (s != null && s.endsWith(" ") && accent.length) {
      lines.push({ soft: s, accent: accent.shift() });
      continue;
    }
    if (s != null && s.length > 0) {
      lines.push({ soft: s });
      continue;
    }
    if (accent.length) {
      lines.push({ accent: accent.shift() });
    }
  }

  return (
    <div className="ai-hero__content">
      <motion.p
        className="ai-hero__eyebrow"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease, delay: 0.1 }}
      >
        {config.eyebrow}
      </motion.p>

      <motion.p
        className="ai-hero__service"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease, delay: 0.2 }}
      >
        {config.serviceName}
      </motion.p>

      <motion.h1
        id={headingId}
        className="ai-hero__headline"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.65, ease, delay: 0.32 }}
      >
        {lines.map((line, i) => (
          <span key={i} className="ai-hero__headline-line">
            {line.soft != null && (
              <span className="ai-hero__headline-soft">{line.soft}</span>
            )}
            {line.accent != null && (
              <span className="ai-hero__headline-accent">{line.accent}</span>
            )}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="ai-hero__support"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.55, ease, delay: 0.48 }}
      >
        {config.description}
      </motion.p>

      <motion.div
        className="ai-hero__cta-row"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease, delay: 0.62 }}
      >
        <Link href={config.primaryCta.href} className="ai-hero__cta-primary">
          {config.primaryCta.label}
          <span aria-hidden="true"> ↗</span>
        </Link>
        <a href="#svc-capabilities" className="ai-hero__cta-secondary">
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
        <span className="ai-hero__meta-accent">{config.metadata[0]}</span>
        {config.metadata.slice(1).map((item) => (
          <span key={item}>
            <span aria-hidden="true"> · </span>
            {item}
          </span>
        ))}
      </motion.p>
    </div>
  );
}
