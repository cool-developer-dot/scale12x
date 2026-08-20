"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 04 — Brand & Creative
 * Live editorial artboard — deliberately non-dashboard.
 * Visual grammar distinct from cards 01–03.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.38;

const SWATCHES = [
  { id: "ink", hex: "#0F172A", restX: 248, restY: 36, activeX: 252, activeY: 28 },
  { id: "ivory", hex: "#F4F1EA", restX: 278, restY: 48, activeX: 276, activeY: 28 },
  { id: "cobalt", hex: "#2563EB", restX: 302, restY: 34, activeX: 300, activeY: 28 },
  { id: "slate", hex: "#64748B", restX: 262, restY: 68, activeX: 324, activeY: 28 },
  { id: "mist", hex: "#94A3B8", restX: 292, restY: 72, activeX: 348, activeY: 28 },
] as const;

export default function BrandCreativeVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`brand-board${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="brand-board__svg"
        viewBox="0 0 360 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Artboard field — warmer than technical cards */}
        <rect
          x="0.5"
          y="0.5"
          width="359"
          height="199"
          rx="12"
          className="brand-board__field"
        />

        {/* Soft paper plane */}
        <rect
          x="16"
          y="16"
          width="220"
          height="152"
          rx="4"
          className="brand-board__paper"
        />

        {/* Baseline / grid guides — resolve on activate */}
        <g className="brand-board__guides">
          {[44, 68, 92, 116, 140].map((y, i) => (
            <motion.line
              key={`bl-${y}`}
              x1="28"
              x2="220"
              y1={y}
              y2={y}
              className="brand-board__baseline"
              initial={false}
              animate={{
                opacity: active ? (i === 2 || i === 3 ? 0.55 : 0.22) : 0.08,
                x2: active ? 220 : 180 + i * 6,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.45 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? 0.12 + i * 0.04 : 0,
              }}
            />
          ))}
          {[48, 88, 128, 168].map((x, i) => (
            <motion.line
              key={`col-${x}`}
              x1={x}
              x2={x}
              y1="24"
              y2="156"
              className="brand-board__column"
              initial={false}
              animate={{
                opacity: active ? 0.18 : 0.05,
                y2: active ? 156 : 120 + i * 8,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.4 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? 0.16 + i * 0.03 : 0,
              }}
            />
          ))}
        </g>

        {/* Composition frame + layout handles */}
        <motion.g
          initial={false}
          animate={{
            x: active ? 0 : -3,
            y: active ? 0 : 2,
            rotate: active ? 0 : -1.2,
          }}
          style={{ transformOrigin: "120px 90px" }}
          transition={{
            duration: instant ? 0 : active ? 0.5 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.28 : 0,
          }}
        >
          <motion.rect
            x="40"
            y="36"
            width="160"
            height="108"
            rx="2"
            className="brand-board__frame"
            initial={false}
            animate={{
              opacity: active ? 1 : 0.35,
              stroke: active
                ? "var(--cap-stroke-active)"
                : "var(--cap-stroke-idle)",
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.3 : 0,
            }}
          />

          {/* Corner handles */}
          {(
            [
              [40, 36],
              [200, 36],
              [40, 144],
              [200, 144],
            ] as const
          ).map(([hx, hy], i) => (
            <motion.rect
              key={`h-${i}`}
              x={hx - 3}
              y={hy - 3}
              width="6"
              height="6"
              className="brand-board__handle"
              initial={false}
              animate={{
                opacity: active ? 0.9 : 0.2,
                scale: active ? 1 : 0.7,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.35 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? 0.36 + i * 0.04 : 0,
              }}
            />
          ))}
        </motion.g>

        {/* Typography specimen — settles onto baseline */}
        <motion.g
          initial={false}
          animate={{
            y: active ? 0 : -6,
            x: active ? 0 : 4,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.48 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.05 : 0,
          }}
        >
          <motion.text
            x="52"
            y="86"
            className="brand-board__specimen"
            initial={false}
            animate={{ opacity: active ? 1 : 0.55 }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
            }}
          >
            Aa
          </motion.text>
          <motion.text
            x="118"
            y="82"
            className="brand-board__specimen-meta"
            initial={false}
            animate={{ opacity: active ? 0.7 : 0.25 }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              delay: instant ? 0 : active ? 0.2 : 0,
              ease: EASE,
            }}
          >
            Geist / 64
          </motion.text>
        </motion.g>

        {/* Editorial phrase — becomes composed */}
        <motion.g
          initial={false}
          animate={{
            opacity: active ? 1 : 0.3,
            y: active ? 0 : 5,
            letterSpacing: active ? 0 : 1.5,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.45 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.42 : 0,
          }}
        >
          <text x="52" y="118" className="brand-board__phrase">
            Built to be remembered.
          </text>
          {/* Tracking indicator */}
          <motion.line
            x1="52"
            y1="124"
            x2="188"
            y2="124"
            className="brand-board__phrase-rule"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0.35,
              opacity: active ? 0.55 : 0.15,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.48 : 0,
            }}
          />
        </motion.g>

        {/* Small identity / asset tile */}
        <motion.g
          initial={false}
          animate={{
            x: active ? 0 : 6,
            y: active ? 0 : -3,
            rotate: active ? 0 : 2.5,
          }}
          style={{ transformOrigin: "188px 52px" }}
          transition={{
            duration: instant ? 0 : active ? 0.48 : EXIT,
            ease: EASE,
            delay: instant ? 0 : active ? 0.34 : 0,
          }}
        >
          <rect
            x="168"
            y="44"
            width="28"
            height="28"
            rx="3"
            className="brand-board__asset"
          />
          <text
            x="182"
            y="62"
            textAnchor="middle"
            className="brand-board__asset-mark"
          >
            S
          </text>
        </motion.g>

        {/* Color swatches — lock into final order */}
        <text x="252" y="18" className="brand-board__rail-label">
          Palette
        </text>
        {SWATCHES.map((sw, i) => (
          <motion.g
            key={sw.id}
            initial={false}
            animate={{
              x: active ? sw.activeX : sw.restX,
              y: active ? sw.activeY : sw.restY,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.5 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.22 + i * 0.05 : 0,
            }}
          >
            <motion.rect
              width="20"
              height="20"
              rx="3"
              fill={sw.hex}
              className="brand-board__swatch"
              initial={false}
              animate={{
                opacity: active ? 1 : 0.55,
                stroke:
                  active && sw.id === "cobalt"
                    ? "var(--cap-stroke-active)"
                    : "var(--cap-stroke-idle)",
              }}
              transition={{
                duration: instant ? 0 : active ? 0.35 : EXIT,
                delay: instant ? 0 : active ? 0.24 + i * 0.05 : 0,
                ease: EASE,
              }}
            />
          </motion.g>
        ))}

        {/* Spec notes — quiet */}
        <motion.g
          initial={false}
          animate={{ opacity: active ? 0.7 : 0.25 }}
          transition={{
            duration: instant ? 0 : active ? 0.35 : EXIT,
            delay: instant ? 0 : active ? 0.5 : 0,
            ease: EASE,
          }}
        >
          <text x="252" y="68" className="brand-board__note">
            Ratio 1.618
          </text>
          <text x="252" y="82" className="brand-board__note">
            Tracking −2%
          </text>
          <text x="252" y="96" className="brand-board__note">
            Contrast AA
          </text>
        </motion.g>

        {/* Final lock state */}
        <g transform="translate(248 152)">
          <rect
            width="98"
            height="28"
            rx="5"
            className="brand-board__lock"
          />
          <motion.rect
            x="8"
            y="8"
            width="12"
            height="12"
            rx="2"
            className="brand-board__lock-mark"
            initial={false}
            animate={{
              opacity: active ? 1 : 0.35,
              stroke: active
                ? "var(--cap-stroke-active)"
                : "var(--cap-stroke-idle)",
            }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.62 : 0,
              ease: EASE,
            }}
          />
          <motion.path
            d="M11.5 14.2 L13.2 16 L17 11.5"
            className="brand-board__lock-check"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 1 : 0,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 0.68 : 0,
              ease: EASE,
            }}
          />
          <motion.text
            x="28"
            y="13"
            className="brand-board__lock-label"
            initial={false}
            animate={{ opacity: active ? 0 : 0.45 }}
            transition={{
              duration: instant ? 0 : active ? 0.15 : EXIT,
              ease: EASE,
            }}
          >
            Drafting…
          </motion.text>
          <motion.text
            x="28"
            y="13"
            className="brand-board__lock-label brand-board__lock-label--done"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.64 : 0,
              ease: EASE,
            }}
          >
            SYSTEM LOCKED
          </motion.text>
          <motion.text
            x="28"
            y="22"
            className="brand-board__lock-sub"
            initial={false}
            animate={{ opacity: active ? 0.65 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 0.7 : 0,
              ease: EASE,
            }}
          >
            Identity set
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
