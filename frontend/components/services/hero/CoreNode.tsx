"use client";

import { motion } from "framer-motion";
import { CORE } from "./topology";

type CoreNodeProps = {
  reduceMotion: boolean;
  visible: boolean;
  pulse: boolean;
  /** Keep ambient orbit alive (CSS). */
  orbitsAlive?: boolean;
  /** Single slow orbit on tablet; dual on desktop/laptop. */
  orbitMode?: "off" | "single" | "dual";
};

/**
 * Precision optics core — small, sharp, processor-like.
 * Pulse: brightness + ring 1→1.04 + 3–6° rotation. No flash, no giant glow.
 */
export default function CoreNode({
  reduceMotion,
  visible,
  pulse,
  orbitsAlive = false,
  orbitMode = "dual",
}: CoreNodeProps) {
  const showOrbits = orbitsAlive && !reduceMotion && orbitMode !== "off";

  return (
    <motion.g
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={
        visible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.97 }
      }
      transition={{
        opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, ease: "easeOut" },
      }}
      style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
    >
      {/* Tight localized glow — only slightly beyond orbits */}
      <motion.circle
        cx={CORE.x}
        cy={CORE.y}
        r={48}
        fill="url(#services-core-glow)"
        animate={{ opacity: pulse ? 0.95 : 0.7 }}
        transition={{ duration: 0.28 }}
      />

      {/* Construction orbit — sparse */}
      <circle
        cx={CORE.x}
        cy={CORE.y}
        r={72}
        fill="none"
        stroke="rgba(var(--muted-rgb), 0.1)"
        strokeWidth="0.65"
      />

      {/* Slow CSS dotted orbit */}
      {orbitMode !== "off" && (
        <g
          className={
            showOrbits
              ? "services-hero__orbit-spin services-hero__orbit-spin--a"
              : undefined
          }
        >
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={56}
            fill="none"
            stroke="rgba(var(--accent-rgb), 0.28)"
            strokeWidth="0.85"
            strokeDasharray="1.4 5.5"
            opacity={0.9}
          />
        </g>
      )}
      {orbitMode === "dual" && (
        <g
          className={
            showOrbits
              ? "services-hero__orbit-spin services-hero__orbit-spin--b"
              : undefined
          }
        >
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={46}
            fill="none"
            stroke="rgba(var(--accent-rgb), 0.14)"
            strokeWidth="0.65"
            strokeDasharray="1 7"
            opacity={0.75}
          />
        </g>
      )}

      {/* Thin structural ring */}
      <circle
        cx={CORE.x}
        cy={CORE.y}
        r={38}
        fill="none"
        stroke="rgba(var(--fg-rgb), 0.22)"
        strokeWidth="0.9"
      />

      {/* Sparse ticks — 8 only */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r1 = 32;
        const r2 = i % 2 === 0 ? 36 : 34;
        return (
          <line
            key={i}
            x1={CORE.x + Math.cos(a) * r1}
            y1={CORE.y + Math.sin(a) * r1}
            x2={CORE.x + Math.cos(a) * r2}
            y2={CORE.y + Math.sin(a) * r2}
            stroke="rgba(var(--muted-rgb), 0.32)"
            strokeWidth="0.65"
          />
        );
      })}

      {/* Response ring — scale ~1.04 on pulse */}
      <motion.circle
        cx={CORE.x}
        cy={CORE.y}
        r={24}
        fill="rgba(var(--accent-rgb), 0.12)"
        stroke="rgba(var(--accent-rgb), 0.55)"
        strokeWidth="1.05"
        animate={{
          r: pulse ? 25 : 24,
          stroke: pulse ? "rgba(var(--accent-rgb), 0.8)" : "rgba(var(--accent-rgb), 0.55)",
          fill: pulse ? "rgba(var(--accent-rgb), 0.2)" : "rgba(var(--accent-rgb), 0.12)",
        }}
        transition={{ duration: pulse ? 0.42 : 0.35, ease: "easeOut" }}
      />

      {/* Inner disk — slight rotation on pulse */}
      <motion.g
        style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
        animate={{ rotate: pulse ? 4.5 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={16}
          fill="rgb(var(--accent-rgb))"
          stroke={pulse ? "rgba(var(--fg-rgb), 0.7)" : "rgba(var(--fg-rgb), 0.5)"}
          strokeWidth="1.05"
        />
      </motion.g>

      {/* Cobalt inner */}
      <motion.circle
        cx={CORE.x}
        cy={CORE.y}
        r={8}
        fill="rgb(var(--accent-rgb))"
        animate={{ opacity: pulse ? 1 : 0.94 }}
        transition={{ duration: 0.28 }}
      />
      {/* Tiny white center point */}
      <motion.circle
        cx={CORE.x}
        cy={CORE.y}
        r={2.4}
        fill="rgb(var(--fg-rgb))"
        animate={{ opacity: pulse ? 1 : 0.9 }}
        transition={{ duration: 0.28 }}
      />
    </motion.g>
  );
}
