"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 06 — Web & Digital
 * Mini responsive product studio.
 * Visual grammar distinct from cards 01–05.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.4;

const BREAKPOINTS = [
  { id: "sm", label: "sm", x: 48 },
  { id: "md", label: "md", x: 108 },
  { id: "lg", label: "lg", x: 168 },
  { id: "xl", label: "xl", x: 228 },
] as const;

const COMPONENTS = [
  { id: "nav", label: "Nav", delay: 0.22 },
  { id: "hero", label: "Hero", delay: 0.3 },
  { id: "cta", label: "CTA", delay: 0.38 },
  { id: "grid", label: "Grid", delay: 0.46 },
] as const;

export default function WebDigitalVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`web-studio${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="web-studio__svg"
        viewBox="0 0 360 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="0.5"
          y="0.5"
          width="359"
          height="199"
          rx="12"
          className="web-studio__field"
        />

        {/* Breakpoint rail */}
        <g transform="translate(14 14)">
          <text x="0" y="0" className="web-studio__rail-label">
            Breakpoints
          </text>
          <line
            x1="0"
            y1="10"
            x2="250"
            y2="10"
            className="web-studio__rail"
          />
          {BREAKPOINTS.map((bp, i) => (
            <g key={bp.id} transform={`translate(${bp.x} 10)`}>
              <motion.circle
                r="3"
                className="web-studio__bp-dot"
                initial={false}
                animate={{
                  fill:
                    active && (bp.id === "lg" || bp.id === "sm")
                      ? "var(--cap-node-active)"
                      : "var(--cap-node-idle)",
                  opacity: active ? 1 : 0.45,
                  scale: active && bp.id === "lg" ? 1.15 : 1,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active ? 0.08 + i * 0.06 : 0,
                }}
              />
              <motion.text
                y="14"
                textAnchor="middle"
                className="web-studio__bp-label"
                initial={false}
                animate={{
                  opacity: active
                    ? bp.id === "lg" || bp.id === "sm"
                      ? 0.9
                      : 0.4
                    : 0.35,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  delay: instant ? 0 : active ? 0.1 + i * 0.06 : 0,
                }}
              >
                {bp.label}
              </motion.text>
            </g>
          ))}
          {/* Active range indicator lg */}
          <motion.line
            x1="168"
            y1="10"
            x2="228"
            y2="10"
            className="web-studio__bp-range"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 0.7 : 0,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.12 : 0,
            }}
          />
        </g>

        {/* —— Desktop browser frame —— */}
        <motion.g
          transform="translate(14 42)"
          initial={false}
          animate={{
            opacity: active ? 1 : 0.55,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.35 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.05 : 0,
          }}
        >
          <motion.rect
            width="198"
            height="118"
            rx="8"
            className="web-studio__desktop"
            initial={false}
            animate={{
              stroke: active
                ? "var(--cap-stroke-active)"
                : "var(--cap-stroke-idle)",
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              delay: instant ? 0 : active ? 0.06 : 0,
              ease: EASE,
            }}
          />

          {/* Chrome bar */}
          <rect
            x="0"
            y="0"
            width="198"
            height="16"
            rx="8"
            className="web-studio__chrome"
          />
          <rect
            x="0"
            y="8"
            width="198"
            height="8"
            className="web-studio__chrome"
          />
          <circle cx="12" cy="8" r="2" className="web-studio__traffic" />
          <circle cx="20" cy="8" r="2" className="web-studio__traffic" />
          <circle cx="28" cy="8" r="2" className="web-studio__traffic" />
          <rect
            x="48"
            y="4"
            width="110"
            height="8"
            rx="3"
            className="web-studio__url"
          />

          {/* Interface blocks — reflow on activate */}
          {/* Nav */}
          <motion.rect
            height="8"
            rx="2"
            className="web-studio__block web-studio__block--nav"
            initial={false}
            animate={{
              x: 10,
              y: 24,
              width: active ? 178 : 120,
              opacity: active ? 0.9 : 0.4,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.28 : 0,
            }}
          />

          {/* Hero */}
          <motion.rect
            rx="3"
            className="web-studio__block web-studio__block--hero"
            initial={false}
            animate={{
              x: 10,
              y: active ? 38 : 42,
              width: active ? 108 : 90,
              height: active ? 42 : 36,
              opacity: active ? 0.85 : 0.35,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.42 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.34 : 0,
            }}
          />

          {/* Side stack */}
          <motion.rect
            rx="2"
            className="web-studio__block"
            initial={false}
            animate={{
              x: active ? 126 : 118,
              y: active ? 38 : 42,
              width: active ? 62 : 50,
              height: 12,
              opacity: active ? 0.7 : 0.3,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.36 : 0,
            }}
          />
          <motion.rect
            rx="2"
            className="web-studio__block"
            initial={false}
            animate={{
              x: active ? 126 : 118,
              y: active ? 54 : 60,
              width: active ? 62 : 44,
              height: 12,
              opacity: active ? 0.55 : 0.25,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.4 : 0,
            }}
          />
          <motion.rect
            rx="2"
            className="web-studio__block web-studio__block--cta"
            initial={false}
            animate={{
              x: active ? 126 : 118,
              y: active ? 70 : 78,
              width: active ? 48 : 36,
              height: 10,
              opacity: active ? 0.95 : 0.3,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.44 : 0,
            }}
          />

          {/* Content grid — 3 → reflowed columns */}
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={`g-${i}`}
              rx="2"
              className="web-studio__block"
              initial={false}
              animate={{
                x: active ? 10 + i * 60 : 14 + i * 52,
                y: active ? 88 : 96,
                width: active ? 54 : 40,
                height: active ? 20 : 14,
                opacity: active ? 0.65 : 0.28,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.42 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? 0.4 + i * 0.05 : 0,
              }}
            />
          ))}
        </motion.g>

        {/* —— Mobile frame —— */}
        <motion.g
          transform="translate(226 42)"
          initial={false}
          animate={{
            opacity: active ? 1 : 0.4,
            y: active ? 0 : 4,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.4 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.55 : 0,
          }}
        >
          <motion.rect
            width="56"
            height="100"
            rx="8"
            className="web-studio__mobile"
            initial={false}
            animate={{
              stroke: active
                ? "var(--cap-stroke-active)"
                : "var(--cap-stroke-idle)",
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              delay: instant ? 0 : active ? 0.58 : 0,
              ease: EASE,
            }}
          />
          {/* Notch */}
          <rect
            x="18"
            y="4"
            width="20"
            height="4"
            rx="2"
            className="web-studio__notch"
          />

          {/* Mobile stacked layout */}
          <motion.rect
            x="6"
            width="44"
            height="6"
            rx="1.5"
            className="web-studio__block web-studio__block--nav"
            initial={false}
            animate={{
              y: active ? 14 : 18,
              opacity: active ? 0.9 : 0.3,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              delay: instant ? 0 : active ? 0.62 : 0,
              ease: EASE,
            }}
          />
          <motion.rect
            x="6"
            width="44"
            rx="2"
            className="web-studio__block web-studio__block--hero"
            initial={false}
            animate={{
              y: active ? 24 : 30,
              height: active ? 28 : 18,
              opacity: active ? 0.85 : 0.25,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.38 : EXIT,
              delay: instant ? 0 : active ? 0.66 : 0,
              ease: EASE,
            }}
          />
          <motion.rect
            x="6"
            width="28"
            height="8"
            rx="2"
            className="web-studio__block web-studio__block--cta"
            initial={false}
            animate={{
              y: active ? 56 : 54,
              opacity: active ? 0.95 : 0.25,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              delay: instant ? 0 : active ? 0.7 : 0,
              ease: EASE,
            }}
          />
          {[0, 1].map((i) => (
            <motion.rect
              key={`m-${i}`}
              x="6"
              width="44"
              height="10"
              rx="2"
              className="web-studio__block"
              initial={false}
              animate={{
                y: active ? 68 + i * 14 : 72 + i * 12,
                opacity: active ? 0.55 : 0.2,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.35 : EXIT,
                delay: instant ? 0 : active ? 0.72 + i * 0.05 : 0,
                ease: EASE,
              }}
            />
          ))}
        </motion.g>

        {/* Component system panel */}
        <g transform="translate(292 42)">
          <text x="0" y="8" className="web-studio__rail-label">
            System
          </text>
          {COMPONENTS.map((c, i) => (
            <motion.g
              key={c.id}
              transform={`translate(0 ${18 + i * 22})`}
              initial={false}
              animate={{
                opacity: active ? 1 : 0.35,
                x: active ? 0 : 4,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.32 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? c.delay : 0,
              }}
            >
              <motion.rect
                width="54"
                height="16"
                rx="4"
                className="web-studio__comp"
                initial={false}
                animate={{
                  stroke: active
                    ? "var(--cap-stroke-active)"
                    : "var(--cap-stroke-idle)",
                  fill: active
                    ? "var(--cap-fill-active)"
                    : "var(--cap-fill-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  delay: instant ? 0 : active ? c.delay : 0,
                  ease: EASE,
                }}
              />
              <text x="8" y="11" className="web-studio__comp-label">
                {c.label}
              </text>
            </motion.g>
          ))}
        </g>

        {/* Completion / lock state */}
        <g transform="translate(14 170)">
          <rect
            width="198"
            height="22"
            rx="5"
            className="web-studio__status"
          />
          <motion.circle
            cx="12"
            cy="11"
            r="2.5"
            initial={false}
            animate={{
              fill: active ? "var(--cap-status-done)" : "var(--cap-status-idle)",
              opacity: active ? 1 : 0.5,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 0.82 : 0,
              ease: EASE,
            }}
          />
          <motion.text
            x="22"
            y="14.5"
            className="web-studio__status-text"
            initial={false}
            animate={{ opacity: active ? 0 : 0.5 }}
            transition={{
              duration: instant ? 0 : active ? 0.15 : EXIT,
              ease: EASE,
            }}
          >
            Structure…
          </motion.text>
          <motion.text
            x="22"
            y="14.5"
            className="web-studio__status-text web-studio__status-text--done"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.8 : 0,
              ease: EASE,
            }}
          >
            RESPONSIVE LOCKED
          </motion.text>
        </g>

        {/* Tiny desktop↔mobile link */}
        <motion.path
          d="M212 95 H226"
          className="web-studio__link"
          initial={false}
          animate={{
            pathLength: active ? 1 : 0,
            opacity: active ? 0.7 : 0,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.3 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.52 : 0,
          }}
        />
      </svg>
    </div>
  );
}
