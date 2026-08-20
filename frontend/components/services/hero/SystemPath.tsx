"use client";

import { motion } from "framer-motion";
import { PATH_DEPTH, STROKE, type PathStyle } from "./topology";

type SystemPathProps = {
  id: string;
  d: string;
  style: PathStyle;
  dashed?: boolean;
  width?: number;
  delay?: number;
  drawn: boolean;
  /** Soft route wake (base stays visible; not a full recolor). */
  illuminated?: boolean;
  /** Traveling energy highlight synchronized with the signal. */
  traveling?: boolean;
  travelDuration?: number;
  travelKey?: number;
  reduceMotion: boolean;
};

/**
 * Ambient opacity baked into stroke hierarchy.
 * Primary ~55–65%, secondary ~22–30%, construction ~8–12%.
 */
const DEPTH_OPACITY = {
  foreground: 1,
  mid: 1,
  rear: 1,
} as const;

export default function SystemPath({
  id,
  d,
  style,
  dashed,
  width = 1,
  delay = 0,
  drawn,
  illuminated = false,
  traveling = false,
  travelDuration = 1.1,
  travelKey = 0,
  reduceMotion,
}: SystemPathProps) {
  const depth = PATH_DEPTH[style];
  const base = STROKE[style];
  // Soft wake: slightly brighter, never a full neon swap
  const stroke = illuminated
    ? depth === "foreground"
      ? style === "cobalt" || style === "active"
        ? "#3B82F6"
        : "rgba(210, 225, 245, 0.78)"
      : "rgba(120, 150, 200, 0.42)"
    : base;
  const sw = illuminated ? Math.min(width + 0.25, 1.7) : width;
  const opacity = DEPTH_OPACITY[depth];

  return (
    <g data-path={id}>
      {/* Ambient base route — always the infrastructure */}
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "3.5 5.5" : undefined}
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={
          drawn
            ? { pathLength: 1, opacity }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: {
            duration: reduceMotion ? 0 : 0.85,
            delay: reduceMotion ? 0 : delay,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 0.4,
            delay: reduceMotion ? 0 : drawn ? 0 : delay,
          },
        }}
        style={{
          transition: "stroke 0.5s ease, stroke-width 0.5s ease",
        }}
      />

      {/*
        Traveling energy — short cobalt segment that draws along the path
        with the signal. Base route stays visible underneath.
      */}
      {traveling && !reduceMotion && (
        <motion.path
          key={`travel-${id}-${travelKey}`}
          d={d}
          fill="none"
          stroke="#60A5FA"
          strokeWidth={Math.min(width + 0.55, 1.95)}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.95, 0.75, 0.15],
          }}
          transition={{
            pathLength: {
              duration: travelDuration,
              ease: [0.25, 0.1, 0.25, 1],
            },
            opacity: {
              duration: travelDuration,
              times: [0, 0.08, 0.72, 1],
            },
          }}
        />
      )}
    </g>
  );
}
