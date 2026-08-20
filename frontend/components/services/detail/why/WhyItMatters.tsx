"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { WhyItMattersConfig } from "./types";

type Props = {
  config: WhyItMattersConfig;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyItMatters({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);
  const show = visible || reduceMotion;
  const headingId = `svc-why-heading-${config.service}`;

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
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id={`svc-why-${config.service}`}
      aria-labelledby={headingId}
      className="svc-why"
    >
      <div className="svc-why__shell">
        <div className="svc-why__grid">
          <div className="svc-why__left">
            <motion.p
              className="svc-why__eyebrow"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={show ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, ease, delay: 0 }}
            >
              {config.eyebrow}
            </motion.p>

            <motion.h2
              id={headingId}
              className="svc-why__headline"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : 0.12 }}
            >
              {config.headline.map((line, i) => {
                const isBlank =
                  line.segments.length === 1 && line.segments[0]?.text === "";
                if (isBlank) {
                  return (
                    <span
                      key={`blank-${i}`}
                      className="svc-why__headline-gap"
                      aria-hidden="true"
                    />
                  );
                }
                return (
                  <span key={i} className="svc-why__headline-line">
                    {line.segments.map((seg, j) => (
                      <span
                        key={j}
                        className={
                          seg.accent
                            ? "svc-why__headline-accent"
                            : "svc-why__headline-soft"
                        }
                      >
                        {seg.text}
                      </span>
                    ))}
                  </span>
                );
              })}
            </motion.h2>

            <motion.p
              className="svc-why__support"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease, delay: reduceMotion ? 0 : 0.28 }}
            >
              {config.supportingCopy}
            </motion.p>
          </div>

          <ol className="svc-why__tensions" aria-label="Business tensions">
            {config.tensions.map((tension, i) => {
              const itemDelay = reduceMotion ? 0 : 0.42 + i * 0.28;
              const dividerDelay = reduceMotion ? 0 : itemDelay + 0.14;
              const isLast = i === config.tensions.length - 1;

              return (
                <li key={tension.index} className="svc-why__tension">
                  <motion.div
                    className="svc-why__tension-body"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={
                      show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                    }
                    transition={{ duration: 0.42, ease, delay: itemDelay }}
                  >
                    <span className="svc-why__tension-index">
                      {tension.index}
                    </span>
                    <h3 className="svc-why__tension-title">{tension.title}</h3>
                    <p className="svc-why__tension-desc">
                      {tension.description}
                    </p>
                  </motion.div>

                  {!isLast && (
                    <motion.div
                      className="svc-why__divider"
                      aria-hidden="true"
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={show ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.38,
                        ease,
                        delay: dividerDelay,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          <motion.div
            className="svc-why__opportunity"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 1.35 }}
          >
            <p className="svc-why__opportunity-label">
              {config.opportunityLabel}
            </p>
            <p className="svc-why__opportunity-statement">
              {config.opportunityStatement.map((seg, i) => (
                <span
                  key={i}
                  className={
                    seg.accent
                      ? "svc-why__opportunity-accent"
                      : undefined
                  }
                >
                  {seg.text}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
