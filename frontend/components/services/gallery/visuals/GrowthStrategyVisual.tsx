"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 01 — Growth Strategy
 * Bespoke decision / prioritization map (quality benchmark).
 */

type NodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
  role: "scatter" | "path" | "focus";
  /** Order along the resolved growth path (path/focus only) */
  pathIndex?: number;
};

const NODES: NodeDef[] = [
  { id: "market", label: "Market entry", x: 36, y: 36, role: "path", pathIndex: 0 },
  { id: "channel", label: "Channel expansion", x: 78, y: 118, role: "scatter" },
  { id: "pricing", label: "Pricing", x: 132, y: 52, role: "path", pathIndex: 1 },
  { id: "retention", label: "Retention", x: 214, y: 96, role: "focus", pathIndex: 2 },
  { id: "product", label: "Product-led", x: 292, y: 48, role: "scatter" },
  { id: "partner", label: "Partnerships", x: 168, y: 152, role: "scatter" },
  { id: "geo", label: "Geo expansion", x: 48, y: 168, role: "scatter" },
];

/** Low-priority connective tissue — muted at rest, dims further when active */
const SCATTER_PATHS: { d: string; key: string }[] = [
  { key: "s1", d: "M78 118 C 98 88, 118 70, 132 52" },
  { key: "s2", d: "M78 118 C 110 140, 150 150, 168 152" },
  { key: "s3", d: "M48 168 C 90 160, 130 140, 168 152" },
  { key: "s4", d: "M132 52 C 180 40, 240 36, 292 48" },
  { key: "s5", d: "M168 152 C 210 140, 250 110, 292 48" },
  { key: "s6", d: "M36 36 C 50 70, 62 100, 78 118" },
];

/** Resolved growth route: Market entry → Pricing → Retention */
const FOCUS_SEGMENTS: { d: string; key: string; delay: number }[] = [
  {
    key: "f1",
    d: "M36 36 C 70 28, 105 34, 132 52",
    delay: 0.28,
  },
  {
    key: "f2",
    d: "M132 52 C 168 72, 192 86, 214 96",
    delay: 0.42,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_MS = 0.42;

export default function GrowthStrategyVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`growth-map${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="growth-map__svg"
        viewBox="0 0 360 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Soft planning field */}
        <rect
          x="0.5"
          y="0.5"
          width="359"
          height="199"
          rx="12"
          className="growth-map__field"
        />

        {/* Quiet coordinate ticks — instrument, not chart */}
        <g className="growth-map__ticks">
          {[40, 100, 160, 220, 280, 340].map((x) => (
            <line key={`vx-${x}`} x1={x} y1="12" x2={x} y2="188" />
          ))}
          {[40, 80, 120, 160].map((y) => (
            <line key={`hy-${y}`} x1="16" y1={y} x2="344" y2={y} />
          ))}
        </g>

        {/* Scatter routes */}
        <g className="growth-map__scatter-routes">
          {SCATTER_PATHS.map((path) => (
            <motion.path
              key={path.key}
              d={path.d}
              className="growth-map__route growth-map__route--scatter"
              initial={false}
              animate={{
                opacity: active ? 0.12 : 0.28,
                pathLength: 1,
              }}
              transition={{
                duration: instant ? 0 : active ? 0.35 : EXIT_MS,
                ease: EASE,
                delay: instant ? 0 : active ? 0.14 : 0,
              }}
            />
          ))}
        </g>

        {/* Focus route underlay (dim track) */}
        <g className="growth-map__focus-track">
          {FOCUS_SEGMENTS.map((seg) => (
            <path
              key={`track-${seg.key}`}
              d={seg.d}
              className="growth-map__route growth-map__route--track"
            />
          ))}
        </g>

        {/* Focus route resolve — draws then settles cobalt */}
        <g className="growth-map__focus-routes">
          {FOCUS_SEGMENTS.map((seg) => (
            <motion.path
              key={seg.key}
              d={seg.d}
              className="growth-map__route growth-map__route--focus"
              initial={false}
              animate={{
                pathLength: active ? 1 : 0,
                opacity: active ? 1 : 0,
              }}
              transition={{
                pathLength: {
                  duration: instant ? 0 : active ? 0.42 : EXIT_MS * 0.85,
                  ease: EASE,
                  delay: instant ? 0 : active ? seg.delay : 0,
                },
                opacity: {
                  duration: instant ? 0 : active ? 0.25 : EXIT_MS,
                  delay: instant ? 0 : active ? seg.delay : 0,
                  ease: EASE,
                },
              }}
            />
          ))}
        </g>

        {/* Opportunity nodes */}
        {NODES.map((node) => {
          const isPath = node.role === "path" || node.role === "focus";
          const isFocus = node.role === "focus";
          const pathDelay =
            node.pathIndex !== undefined ? 0.38 + node.pathIndex * 0.14 : 0;

          return (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              {/* Soft wake halo */}
              <motion.circle
                r={isFocus ? 14 : 11}
                className="growth-map__halo"
                initial={false}
                animate={{
                  opacity: active ? (isPath ? 0.55 : 0.18) : 0,
                  scale: active ? 1 : 0.85,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.45 : EXIT_MS,
                  ease: EASE,
                  delay: instant ? 0 : active ? (isPath ? pathDelay : 0.06) : 0,
                }}
              />

              <motion.circle
                r={isFocus ? 4.5 : 3.25}
                className={
                  isFocus
                    ? "growth-map__node growth-map__node--focus"
                    : isPath
                      ? "growth-map__node growth-map__node--path"
                      : "growth-map__node growth-map__node--scatter"
                }
                initial={false}
                animate={{
                  opacity: active
                    ? isPath
                      ? 1
                      : 0.35
                    : isPath
                      ? 0.55
                      : 0.42,
                  scale: active && isPath ? 1.08 : 1,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.4 : EXIT_MS,
                  ease: EASE,
                  delay: instant
                    ? 0
                    : active
                      ? isPath
                        ? pathDelay
                        : 0.08
                      : 0,
                }}
              />

              <motion.text
                className={
                  isFocus
                    ? "growth-map__label growth-map__label--focus"
                    : "growth-map__label"
                }
                x={0}
                y={isFocus ? -14 : -11}
                textAnchor="middle"
                initial={false}
                animate={{
                  opacity: active
                    ? isPath
                      ? 0.95
                      : 0.28
                    : 0.48,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.35 : EXIT_MS,
                  ease: EASE,
                  delay: instant ? 0 : active ? (isPath ? pathDelay + 0.05 : 0.1) : 0,
                }}
              >
                {node.label}
              </motion.text>

              {isFocus && (
                <motion.g
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    y: active ? 0 : 4,
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.35 : EXIT_MS,
                    ease: EASE,
                    delay: instant ? 0 : active ? 0.68 : 0,
                  }}
                >
                  <rect
                    x={-34}
                    y={10}
                    width={68}
                    height={14}
                    rx={3}
                    className="growth-map__badge"
                  />
                  <text
                    x={0}
                    y={20}
                    textAnchor="middle"
                    className="growth-map__badge-text"
                  >
                    HIGH LEVERAGE
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}

        {/* “Focus here” callout near the resolved node */}
        <motion.g
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            x: active ? 0 : -6,
          }}
          transition={{
            duration: instant ? 0 : active ? 0.38 : EXIT_MS,
            ease: EASE,
            delay: instant ? 0 : active ? 0.62 : 0,
          }}
        >
          <line
            x1="230"
            y1="118"
            x2="248"
            y2="138"
            className="growth-map__callout-line"
          />
          <text x="252" y="148" className="growth-map__callout">
            Focus here
          </text>
        </motion.g>

        {/* Compact decision path panel */}
        <g className="growth-map__panel" transform="translate(12 154)">
          <rect
            x="0"
            y="0"
            width="118"
            height="36"
            rx="6"
            className="growth-map__panel-bg"
          />
          <text x="10" y="12" className="growth-map__panel-title">
            Decision path
          </text>
          {(
            [
              { label: "Scan", delay: 0.2 },
              { label: "Prioritize", delay: 0.4 },
              { label: "Focus", delay: 0.62 },
            ] as const
          ).map((step, i) => (
            <g key={step.label} transform={`translate(${14 + i * 36} 22)`}>
              <motion.circle
                r="2.35"
                initial={false}
                animate={{
                  opacity: active ? 1 : 0.35,
                  fill: active && i === 2 ? "var(--cap-node-active)" : "var(--cap-node-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT_MS,
                  delay: instant ? 0 : active ? step.delay : 0,
                  ease: EASE,
                }}
              />
              <motion.text
                x="0"
                y="11"
                textAnchor="middle"
                className="growth-map__panel-step"
                initial={false}
                animate={{
                  opacity: active ? (i === 2 ? 0.95 : 0.55) : 0.4,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT_MS,
                  delay: instant ? 0 : active ? step.delay : 0,
                  ease: EASE,
                }}
              >
                {step.label}
              </motion.text>
              {i < 2 && (
                <motion.line
                  x1="7"
                  y1="0"
                  x2="27"
                  y2="0"
                  className="growth-map__panel-link"
                  initial={false}
                  animate={{ opacity: active ? 0.55 : 0.22 }}
                  transition={{
                    duration: instant ? 0 : active ? 0.3 : EXIT_MS,
                    delay: instant ? 0 : active ? step.delay + 0.08 : 0,
                  }}
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
