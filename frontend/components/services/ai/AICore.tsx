"use client";

import { motion } from "framer-motion";
import type { ProcessStage } from "./data";
import { PROCESS_STAGES } from "./data";

type AICoreProps = {
  cx: number;
  cy: number;
  pulse: boolean;
  activeStage: ProcessStage["id"] | null;
  assembled: boolean;
  reduceMotion: boolean;
  orbitsAlive: boolean;
  compact?: boolean;
};

/**
 * Architectural AI core — faceted polygon, thin rings, process stack.
 * Engineered, not a glowing orb.
 */
export default function AICore({
  cx,
  cy,
  pulse,
  activeStage,
  assembled,
  reduceMotion,
  orbitsAlive,
  compact = false,
}: AICoreProps) {
  const scale = compact ? 0.8 : 0.96;
  const rOuter = 74 * scale;
  const rMid = 54 * scale;
  const rInner = 34 * scale;

  // Faceted hexagon points
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(" ");

  const stages = compact
    ? PROCESS_STAGES.filter((s) => s.id !== "learn")
    : PROCESS_STAGES;

  const stackTop = cy + rInner + 30 * scale;
  const stackGap = compact ? 16 : 18;

  return (
    <g className="ai-hero__core-group">
      {/* Subtle local glow — restrained */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={rOuter + 28}
        ry={rOuter + 36}
        fill="url(#ai-core-glow)"
        animate={{ opacity: pulse ? 0.9 : 0.55 }}
        transition={{ duration: 0.35 }}
      />

      {/* Glass vessel outline */}
      <rect
        x={cx - 68 * scale}
        y={cy - 100 * scale}
        width={136 * scale}
        height={compact ? 248 * scale : 286 * scale}
        rx={26 * scale}
        fill="rgba(5,11,20,0.35)"
        stroke="rgba(148,163,184,0.14)"
        strokeWidth="1"
      />
      <rect
        x={cx - 60 * scale}
        y={cy - 92 * scale}
        width={120 * scale}
        height={compact ? 232 * scale : 270 * scale}
        rx={22 * scale}
        fill="none"
        stroke="rgba(59,130,246,0.08)"
        strokeWidth="0.75"
      />

      {/* Label */}
      <text
        x={cx}
        y={cy - 84 * scale}
        textAnchor="middle"
        className="ai-hero__core-label"
        fill="#3B82F6"
        fontSize={8.5}
        letterSpacing="0.2em"
      >
        AI ORCHESTRATION LAYER
      </text>

      {/* Slow orbital rings */}
      <g
        className={
          orbitsAlive && !reduceMotion
            ? "ai-hero__orbit ai-hero__orbit--a"
            : undefined
        }
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          fill="none"
          stroke="rgba(59,130,246,0.28)"
          strokeWidth="0.9"
          strokeDasharray="2 7"
        />
      </g>
      <g
        className={
          orbitsAlive && !reduceMotion
            ? "ai-hero__orbit ai-hero__orbit--b"
            : undefined
        }
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx={rMid + 4}
          ry={rMid - 6}
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeWidth="0.7"
          strokeDasharray="1.2 6"
        />
      </g>

      {/* Structural rings */}
      <circle
        cx={cx}
        cy={cy}
        r={rMid}
        fill="none"
        stroke="rgba(210,225,245,0.16)"
        strokeWidth="0.85"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={rInner + 6}
        fill="none"
        stroke="rgba(59,130,246,0.45)"
        strokeWidth="1"
        animate={{
          r: pulse ? (rInner + 6) * 1.03 : rInner + 6,
          rotate: pulse ? 4 : 0,
          stroke: pulse ? "rgba(96,165,250,0.75)" : "rgba(59,130,246,0.45)",
        }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Faceted core polygon */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{
          rotate: pulse ? 4 : 0,
          opacity: assembled ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <polygon
          points={hex(rInner)}
          fill="rgba(37,99,235,0.16)"
          stroke={pulse ? "rgba(147,197,253,0.85)" : "rgba(96,165,250,0.55)"}
          strokeWidth="1.15"
        />
        <polygon
          points={hex(rInner * 0.58)}
          fill="rgba(37,99,235,0.28)"
          stroke="rgba(226,232,240,0.45)"
          strokeWidth="0.9"
        />
        {/* Network spokes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (Math.PI / 180) * (60 * i - 90);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(a) * rInner * 0.92}
              y2={cy + Math.sin(a) * rInner * 0.92}
              stroke="rgba(96,165,250,0.35)"
              strokeWidth="0.65"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={3.2} fill="#2563EB" />
        <circle cx={cx} cy={cy} r={1.4} fill="#F8FAFC" />
      </motion.g>

      <text
        x={cx}
        y={cy + rInner * 0.72}
        textAnchor="middle"
        fill="rgba(248,250,252,0.92)"
        fontSize={compact ? 7.5 : 8.5}
        fontWeight={500}
        letterSpacing="0.16em"
      >
        AI CORE
      </text>

      {/* Process stack */}
      {!compact &&
        stages.map((stage, i) => {
          const lit = activeStage === stage.id;
          const passed =
            activeStage != null &&
            STAGE_INDEX[activeStage] >= STAGE_INDEX[stage.id];
          const y = stackTop + i * stackGap;
          return (
            <g key={stage.id} opacity={assembled ? 1 : 0}>
              <circle
                cx={cx - 42}
                cy={y}
                r={3}
                fill={lit ? "#3B82F6" : passed ? "rgba(59,130,246,0.45)" : "transparent"}
                stroke={
                  lit || passed
                    ? "rgba(96,165,250,0.8)"
                    : "rgba(148,163,184,0.35)"
                }
                strokeWidth="1"
              />
              {i < stages.length - 1 && (
                <line
                  x1={cx - 42}
                  y1={y + 4}
                  x2={cx - 42}
                  y2={y + stackGap - 4}
                  stroke="rgba(148,163,184,0.2)"
                  strokeWidth="0.75"
                />
              )}
              <text
                x={cx - 30}
                y={y + 3.5}
                fill={lit ? "#F8FAFC" : passed ? "#94A3B8" : "#64748B"}
                fontSize={9}
                letterSpacing="0.16em"
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                  textTransform: "uppercase",
                }}
              >
                {stage.label}
              </text>
            </g>
          );
        })}
    </g>
  );
}

const STAGE_INDEX: Record<ProcessStage["id"], number> = {
  understand: 0,
  reason: 1,
  decide: 2,
  act: 3,
  learn: 4,
};
