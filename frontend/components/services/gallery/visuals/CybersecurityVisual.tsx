"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 05 — Cybersecurity
 * Traffic → security perimeter → verify / scan / protect
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.4;

const GATES = [
  { id: "verify", label: "VERIFY", x: 78 },
  { id: "scan", label: "SCAN", x: 180 },
  { id: "protect", label: "PROTECT", x: 282 },
] as const;

export default function CybersecurityVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`cyber-shield${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="cyber-shield__svg"
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
          className="cyber-shield__field"
        />

        <text x="18" y="22" className="cyber-shield__label">
          Traffic
        </text>
        <text x="342" y="22" textAnchor="end" className="cyber-shield__label">
          Protected
        </text>

        {/* Incoming request dots */}
        {[72, 120, 168, 216, 264].map((x, i) => (
          <motion.circle
            key={`in-${x}`}
            cx={x}
            cy="36"
            r="2.6"
            className="cyber-shield__inbound"
            initial={false}
            animate={{
              opacity: active ? [0.25, 0.95, 0.25] : 0.2,
              cy: active && !instant ? [36, 58, 36] : 36,
            }}
            transition={{
              duration: instant ? 0 : 2.8,
              ease: "easeInOut",
              delay: instant ? 0 : i * 0.18,
              repeat: active && !instant ? Infinity : 0,
            }}
          />
        ))}

        {/* Blocked threat signal */}
        <motion.circle
          cx="300"
          r="2.8"
          className="cyber-shield__threat"
          initial={false}
          animate={{
            opacity: active ? [0, 0.9, 0] : 0,
            cy: active && !instant ? [36, 70, 70] : 36,
          }}
          transition={{
            duration: instant ? 0 : 3.2,
            ease: EASE,
            delay: instant ? 0 : 1.1,
            repeat: active && !instant ? Infinity : 0,
            repeatDelay: 1.2,
          }}
        />
        <motion.line
          x1="292"
          x2="308"
          y1="70"
          y2="70"
          className="cyber-shield__block"
          initial={false}
          animate={{ opacity: active ? [0, 0.85, 0] : 0 }}
          transition={{
            duration: instant ? 0 : 3.2,
            delay: instant ? 0 : 1.1,
            repeat: active && !instant ? Infinity : 0,
            repeatDelay: 1.2,
          }}
        />

        {/* Security shield */}
        <motion.g
          initial={false}
          animate={{ opacity: active ? 1 : 0.65, y: active ? 0 : 2 }}
          transition={{ duration: instant ? 0 : 0.45, ease: EASE }}
        >
          <path
            d="M180 52 L220 68 L220 104 C220 128 180 146 180 146 C180 146 140 128 140 104 L140 68 Z"
            className="cyber-shield__shell"
          />
          <path
            d="M180 66 L206 78 L206 102 C206 118 180 132 180 132 C180 132 154 118 154 102 L154 78 Z"
            className="cyber-shield__inner"
          />
          <motion.path
            d="M168 98 L176 106 L194 86"
            className="cyber-shield__check"
            initial={false}
            animate={{ pathLength: active ? 1 : 0.35, opacity: active ? 1 : 0.4 }}
            transition={{
              duration: instant ? 0 : active ? 0.55 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.35 : 0,
            }}
          />
          <text x="180" y="160" textAnchor="middle" className="cyber-shield__core-label">
            SECURITY
          </text>
        </motion.g>

        {/* Downstream gates */}
        {GATES.map((gate, i) => (
          <motion.g
            key={gate.id}
            initial={false}
            animate={{
              opacity: active ? 1 : 0.4,
              y: active ? 0 : 3,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.4 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.45 + i * 0.1 : 0,
            }}
          >
            <line
              x1="180"
              y1="146"
              x2={gate.x}
              y2="168"
              className="cyber-shield__branch"
            />
            <rect
              x={gate.x - 32}
              y="168"
              width="64"
              height="20"
              rx="6"
              className="cyber-shield__gate"
            />
            <text
              x={gate.x}
              y="181"
              textAnchor="middle"
              className="cyber-shield__gate-label"
            >
              {gate.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
