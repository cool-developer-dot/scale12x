"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 04 — Cloud Computing
 * Distributed infrastructure topology: cloud → APP / DB / STORAGE
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.38;

const NODES = [
  { id: "app", label: "APP", x: 78, y: 148 },
  { id: "db", label: "DB", x: 180, y: 158 },
  { id: "storage", label: "STORAGE", x: 282, y: 148 },
] as const;

export default function CloudComputingVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`cloud-infra${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="cloud-infra__svg"
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
          className="cloud-infra__field"
        />

        <text x="18" y="22" className="cloud-infra__label">
          Cloud Topology
        </text>
        <text x="342" y="22" textAnchor="end" className="cloud-infra__label">
          Distributed
        </text>

        {/* Connection paths cloud → nodes */}
        {NODES.map((node, i) => (
          <motion.path
            key={`path-${node.id}`}
            d={`M180 78 L${node.x} ${node.y - 22}`}
            className="cloud-infra__path"
            initial={false}
            animate={{
              opacity: active ? 0.85 : 0.22,
              pathLength: active ? 1 : 0.55,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.55 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.18 + i * 0.1 : 0,
            }}
          />
        ))}

        {/* Data pulses travel cloud → nodes */}
        {active &&
          !instant &&
          NODES.map((node, i) => (
            <motion.circle
              key={`pulse-${node.id}`}
              r="2.4"
              className="cloud-infra__pulse"
              initial={false}
              animate={{
                opacity: [0, 1, 0],
                cx: [180, node.x],
                cy: [78, node.y - 22],
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.4 + i * 0.35,
                repeatDelay: 0.8,
              }}
            />
          ))}

        {/* Central cloud node */}
        <motion.g
          initial={false}
          animate={{ opacity: active ? 1 : 0.7, y: active ? 0 : 2 }}
          transition={{ duration: instant ? 0 : 0.45, ease: EASE }}
        >
          <ellipse
            cx="180"
            cy="62"
            rx="54"
            ry="28"
            className="cloud-infra__cloud"
          />
          <ellipse
            cx="156"
            cy="68"
            rx="26"
            ry="18"
            className="cloud-infra__cloud-soft"
          />
          <ellipse
            cx="204"
            cy="66"
            rx="30"
            ry="20"
            className="cloud-infra__cloud-soft"
          />
          <text x="180" y="68" textAnchor="middle" className="cloud-infra__cloud-label">
            CLOUD
          </text>
        </motion.g>

        {/* Infrastructure nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={false}
            animate={{
              opacity: active ? 1 : 0.45,
              y: active ? 0 : 4,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.45 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.35 + i * 0.12 : 0,
            }}
          >
            <rect
              x={node.x - 34}
              y={node.y - 16}
              width="68"
              height="28"
              rx="7"
              className="cloud-infra__node"
            />
            <circle
              cx={node.x}
              cy={node.y - 22}
              r="3"
              className="cloud-infra__node-dot"
            />
            <text
              x={node.x}
              y={node.y + 2}
              textAnchor="middle"
              className="cloud-infra__node-label"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        <motion.text
          x="180"
          y="188"
          textAnchor="middle"
          className="cloud-infra__footer"
          initial={false}
          animate={{ opacity: active ? 0.9 : 0.35 }}
          transition={{ duration: instant ? 0 : 0.4, ease: EASE, delay: active ? 0.7 : 0 }}
        >
          DISTRIBUTED INFRASTRUCTURE
        </motion.text>
      </svg>
    </div>
  );
}
