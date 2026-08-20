"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceIconMark from "../ServiceIconMark";
import type { CoreCapabilitiesConfig } from "./types";

type Props = {
  config: CoreCapabilitiesConfig;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function CoreCapabilities({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;
  const [visible, setVisible] = useState(reduceMotion);
  const show = visible || reduceMotion;
  const headingId = `svc-caps-heading-${config.service}`;

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

  return (
    <section
      ref={sectionRef}
      id={`svc-core-capabilities-${config.service}`}
      aria-labelledby={headingId}
      className="svc-caps"
    >
      <div className="svc-caps__shell">
        <header className="svc-caps__header">
          <motion.p
            className="svc-caps__eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease, delay: 0 }}
          >
            {config.eyebrow}
          </motion.p>

          <motion.h2
            id={headingId}
            className="svc-caps__headline"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: 0.5,
              ease,
              delay: reduceMotion ? 0 : 0.06,
            }}
          >
            {config.headline}
          </motion.h2>

          <motion.p
            className="svc-caps__support"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: 0.45,
              ease,
              delay: reduceMotion ? 0 : 0.12,
            }}
          >
            {config.supportingCopy}
          </motion.p>
        </header>

        <ul className="svc-caps__grid">
          {config.capabilities.map((cap, i) => (
            <motion.li
              key={cap.id}
              className={`svc-caps__card${cap.primary ? " is-primary" : ""}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: 0.48,
                ease,
                delay: reduceMotion ? 0 : 0.18 + i * 0.065,
              }}
            >
              {cap.primary && (
                <span className="svc-caps__badge">
                  <span className="svc-caps__badge-dot" aria-hidden="true" />
                  PRIMARY
                </span>
              )}

              <div className="svc-caps__card-top">
                <div className="svc-caps__icon" aria-hidden="true">
                  <ServiceIconMark name={cap.icon} size={28} />
                </div>

                <div className="svc-caps__body">
                  <p className="svc-caps__index">{cap.index} /</p>
                  <h3 className="svc-caps__title">{cap.title}</h3>
                  <p className="svc-caps__desc">{cap.description}</p>
                  <p className="svc-caps__meta">
                    {cap.metadata.map((item, mi) => (
                      <span key={item}>
                        {mi > 0 && (
                          <span className="svc-caps__meta-sep" aria-hidden="true">
                            {" "}
                            ·{" "}
                          </span>
                        )}
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="svc-caps__divider" aria-hidden="true" />

              <div className="svc-caps__outcome">
                <span className="svc-caps__outcome-mark" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17 17 7M10 7h7v7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="svc-caps__outcome-text">{cap.outcome}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
