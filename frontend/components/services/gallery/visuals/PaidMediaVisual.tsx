"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 05 — Paid Media
 * Creative testing + optimization system.
 * Visual grammar distinct from cards 01–04.
 * Metrics are illustrative UI only — not client claims.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.4;

type Creative = {
  id: string;
  label: string;
  y: number;
  /** Illustrative score at rest / active */
  restScore: number;
  activeScore: number;
  restAlloc: number;
  activeAlloc: number;
  winner?: boolean;
};

const CREATIVES: Creative[] = [
  {
    id: "a",
    label: "Creative A",
    y: 34,
    restScore: 42,
    activeScore: 48,
    restAlloc: 34,
    activeAlloc: 18,
  },
  {
    id: "b",
    label: "Creative B",
    y: 78,
    restScore: 51,
    activeScore: 86,
    restAlloc: 33,
    activeAlloc: 62,
    winner: true,
  },
  {
    id: "c",
    label: "Creative C",
    y: 122,
    restScore: 38,
    activeScore: 41,
    restAlloc: 33,
    activeAlloc: 20,
  },
];

/** Subtle performance path (panel-local coords) — illustrative only */
const PATH_REST = "M12 88 C 40 84, 70 90, 98 86 C 114 84, 122 80, 128 82";
const PATH_ACTIVE = "M12 88 C 40 74, 70 58, 98 48 C 114 42, 122 38, 128 36";

export default function PaidMediaVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`paid-lab${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="paid-lab__svg"
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
          className="paid-lab__field"
        />

        {/* Column headers */}
        <text x="18" y="20" className="paid-lab__col-label">
          Variants
        </text>
        <text x="214" y="20" className="paid-lab__col-label">
          Signal
        </text>
        <text x="342" y="20" textAnchor="end" className="paid-lab__col-label">
          Sample UI
        </text>

        {/* Creative variants */}
        {CREATIVES.map((c, i) => {
          const score = active ? c.activeScore : c.restScore;
          const alloc = active ? c.activeAlloc : c.restAlloc;
          const isWinner = !!c.winner && active;

          return (
            <g key={c.id} transform={`translate(14 ${c.y})`}>
              <motion.rect
                width="176"
                height="36"
                rx="7"
                className="paid-lab__card"
                initial={false}
                animate={{
                  opacity: active ? (c.winner ? 1 : 0.55) : 0.7,
                  stroke: isWinner
                    ? "var(--cap-stroke-active)"
                    : "var(--cap-stroke-idle)",
                  fill: isWinner
                    ? "var(--cap-fill-active)"
                    : "var(--cap-fill-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.35 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active ? 0.06 + i * 0.08 : 0,
                }}
              />

              <motion.rect
                x="8"
                y="7"
                width="22"
                height="22"
                rx="4"
                className="paid-lab__thumb"
                initial={false}
                animate={{
                  opacity: active ? (c.winner ? 1 : 0.45) : 0.55,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  delay: instant ? 0 : active ? 0.08 + i * 0.08 : 0,
                  ease: EASE,
                }}
              />
              <motion.text
                x="19"
                y="21"
                textAnchor="middle"
                className="paid-lab__thumb-letter"
                initial={false}
                animate={{ opacity: active ? (c.winner ? 1 : 0.4) : 0.5 }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  delay: instant ? 0 : active ? 0.08 + i * 0.08 : 0,
                }}
              >
                {c.label.slice(-1)}
              </motion.text>

              <motion.text
                x="38"
                y="16"
                className="paid-lab__name"
                initial={false}
                animate={{
                  opacity: active ? (c.winner ? 1 : 0.5) : 0.7,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  delay: instant ? 0 : active ? 0.1 + i * 0.08 : 0,
                }}
              >
                {c.label}
              </motion.text>

              <motion.g
                initial={false}
                animate={{
                  opacity: isWinner ? 1 : 0,
                  x: isWinner ? 0 : -4,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.32 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active ? 0.48 : 0,
                }}
              >
                <rect
                  x="108"
                  y="6"
                  width="42"
                  height="12"
                  rx="3"
                  className="paid-lab__winner"
                />
                <text
                  x="129"
                  y="14.5"
                  textAnchor="middle"
                  className="paid-lab__winner-text"
                >
                  WINNER
                </text>
              </motion.g>

              <motion.text
                x="38"
                y="28"
                className="paid-lab__meta"
                initial={false}
                animate={{ opacity: active ? 0.75 : 0.4 }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  delay: instant ? 0 : active ? 0.22 + i * 0.06 : 0,
                }}
              >
                Score {score}
              </motion.text>

              <rect
                x="98"
                y="22"
                width="66"
                height="5"
                rx="2.5"
                className="paid-lab__alloc-track"
              />
              <motion.rect
                x="98"
                y="22"
                height="5"
                rx="2.5"
                className={
                  c.winner
                    ? "paid-lab__alloc-fill paid-lab__alloc-fill--win"
                    : "paid-lab__alloc-fill"
                }
                initial={false}
                animate={{
                  width: (alloc / 100) * 66,
                  opacity: active ? 1 : 0.45,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.45 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active ? 0.52 + i * 0.04 : 0,
                }}
              />
            </g>
          );
        })}

        {/* Right panel — performance signal + allocation readout */}
        <g transform="translate(206 28)">
          <rect
            width="140"
            height="108"
            rx="8"
            className="paid-lab__panel"
          />
          <text x="12" y="16" className="paid-lab__panel-title">
            Performance signal
          </text>
          <text x="12" y="28" className="paid-lab__panel-note">
            Illustrative values
          </text>

          <g className="paid-lab__grid">
            <line x1="12" y1="44" x2="128" y2="44" />
            <line x1="12" y1="64" x2="128" y2="64" />
            <line x1="12" y1="84" x2="128" y2="84" />
          </g>

          <motion.path
            d={PATH_REST}
            className="paid-lab__path paid-lab__path--rest"
            initial={false}
            animate={{ opacity: active ? 0.12 : 0.4 }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              ease: EASE,
            }}
          />

          <motion.path
            d={PATH_ACTIVE}
            className="paid-lab__path paid-lab__path--live"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 1 : 0,
            }}
            transition={{
              pathLength: {
                duration: instant ? 0 : active ? 0.5 : EXIT * 0.85,
                ease: EASE,
                delay: instant ? 0 : active ? 0.58 : 0,
              },
              opacity: {
                duration: instant ? 0 : 0.25,
                delay: instant ? 0 : active ? 0.58 : 0,
              },
            }}
          />

          <motion.g
            initial={false}
            animate={{ opacity: active ? 1 : 0.45 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.4 : 0,
            }}
          >
            <text x="12" y="100" className="paid-lab__field-label">
              Allocation
            </text>
            <text
              x="128"
              y="100"
              textAnchor="end"
              className="paid-lab__field-value"
            >
              {active ? "B 62%" : "Even"}
            </text>
          </motion.g>
        </g>

        {/* Status bar */}
        <g transform="translate(206 148)">
          <rect
            width="140"
            height="36"
            rx="7"
            className="paid-lab__status"
          />
          <motion.circle
            cx="14"
            cy="18"
            r="3"
            initial={false}
            animate={{
              fill: active ? "var(--cap-node-active)" : "var(--cap-node-idle)",
              opacity: active ? 1 : 0.55,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 0.72 : 0,
              ease: EASE,
            }}
          />
          <motion.text
            x="24"
            y="15"
            className="paid-lab__status-text"
            initial={false}
            animate={{ opacity: active ? 0 : 0.55 }}
            transition={{
              duration: instant ? 0 : active ? 0.15 : EXIT,
              ease: EASE,
            }}
          >
            Testing…
          </motion.text>
          <motion.text
            x="24"
            y="15"
            className="paid-lab__status-text paid-lab__status-text--live"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.7 : 0,
              ease: EASE,
            }}
          >
            OPTIMIZING
          </motion.text>
          <motion.text
            x="24"
            y="27"
            className="paid-lab__status-sub"
            initial={false}
            animate={{ opacity: active ? 0.75 : 0.35 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.78 : 0,
              ease: EASE,
            }}
          >
            {active ? "REALLOCATED" : "Equal split"}
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
