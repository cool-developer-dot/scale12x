"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 03 — Technology & Transformation
 * Layered system architecture: Experience → Platform → Data → Infrastructure
 * Visual grammar distinct from Growth map and AI orchestration.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.4;

type Module = {
  id: string;
  label: string;
  /** Rest offset — disconnected feel */
  restX: number;
  /** Aligned X when active */
  activeX: number;
  w: number;
  /** On the continuous system spine */
  spine?: boolean;
};

type Layer = {
  id: string;
  label: string;
  y: number;
  delay: number;
  modules: Module[];
};

const LAYERS: Layer[] = [
  {
    id: "experience",
    label: "Experience",
    y: 26,
    delay: 0.05,
    modules: [
      { id: "web", label: "Web", restX: 78, activeX: 86, w: 42, spine: true },
      { id: "app", label: "App", restX: 148, activeX: 140, w: 40 },
      { id: "portal", label: "Portal", restX: 218, activeX: 194, w: 48 },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    y: 66,
    delay: 0.28,
    modules: [
      { id: "api", label: "API", restX: 72, activeX: 86, w: 38, spine: true },
      { id: "auth", label: "Auth", restX: 132, activeX: 136, w: 42 },
      { id: "events", label: "Events", restX: 210, activeX: 190, w: 50 },
      { id: "jobs", label: "Jobs", restX: 278, activeX: 252, w: 40 },
    ],
  },
  {
    id: "data",
    label: "Data",
    y: 106,
    delay: 0.5,
    modules: [
      { id: "warehouse", label: "Warehouse", restX: 64, activeX: 78, w: 62 },
      { id: "stream", label: "Stream", restX: 150, activeX: 152, w: 48, spine: true },
      { id: "model", label: "Model", restX: 236, activeX: 214, w: 46 },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    y: 146,
    delay: 0.7,
    modules: [
      { id: "compute", label: "Compute", restX: 70, activeX: 86, w: 54 },
      { id: "network", label: "Network", restX: 148, activeX: 152, w: 56, spine: true },
      { id: "storage", label: "Storage", restX: 240, activeX: 222, w: 52 },
    ],
  },
];

/** Vertical spine through spine modules — centers approx x=107, 176, 176, 180 */
const SPINE = [
  { key: "sp1", d: "M107 48 V66", delay: 0.18 },
  { key: "sp2", d: "M107 88 C 120 96, 160 100, 176 106", delay: 0.38 },
  { key: "sp3", d: "M176 128 V146", delay: 0.58 },
  { key: "sp4", d: "M176 168 V178", delay: 0.78 },
];

export default function TechnologyVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`tech-arch${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="tech-arch__svg"
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
          className="tech-arch__field"
        />

        {/* Quiet horizontal layer guides */}
        {LAYERS.map((layer) => (
          <line
            key={`guide-${layer.id}`}
            x1="70"
            y1={layer.y + 11}
            x2="318"
            y2={layer.y + 11}
            className="tech-arch__guide"
          />
        ))}

        {/* Rest-state faint misaligned stubs (disconnected feel) */}
        <g className="tech-arch__stubs">
          <motion.path
            d="M107 48 V58"
            className="tech-arch__stub"
            initial={false}
            animate={{ opacity: active ? 0 : 0.35 }}
            transition={{ duration: instant ? 0 : EXIT, ease: EASE }}
          />
          <motion.path
            d="M155 88 V98"
            className="tech-arch__stub"
            initial={false}
            animate={{ opacity: active ? 0 : 0.28 }}
            transition={{ duration: instant ? 0 : EXIT, ease: EASE }}
          />
          <motion.path
            d="M200 128 V138"
            className="tech-arch__stub"
            initial={false}
            animate={{ opacity: active ? 0 : 0.25 }}
            transition={{ duration: instant ? 0 : EXIT, ease: EASE }}
          />
        </g>

        {/* Continuous system path — draws top → bottom */}
        <g className="tech-arch__spine">
          {SPINE.map((seg) => (
            <g key={seg.key}>
              <path d={seg.d} className="tech-arch__spine-track" />
              <motion.path
                d={seg.d}
                className="tech-arch__spine-live"
                initial={false}
                animate={{
                  pathLength: active ? 1 : 0,
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  pathLength: {
                    duration: instant ? 0 : active ? 0.32 : EXIT * 0.85,
                    ease: EASE,
                    delay: instant ? 0 : active ? seg.delay : 0,
                  },
                  opacity: {
                    duration: instant ? 0 : 0.2,
                    delay: instant ? 0 : active ? seg.delay : 0,
                  },
                }}
              />
            </g>
          ))}
        </g>

        {/* Traveling signal down the stack */}
        <motion.circle
          r="2.75"
          className="tech-arch__signal"
          initial={false}
          animate={
            active
              ? {
                  cx: [107, 107, 176, 176],
                  cy: [48, 88, 128, 178],
                  opacity: [0, 1, 1, 0],
                }
              : { cx: 107, cy: 48, opacity: 0 }
          }
          transition={
            instant
              ? { duration: 0 }
              : active
                ? {
                    duration: 0.85,
                    ease: EASE,
                    delay: 0.12,
                    times: [0, 0.28, 0.62, 1],
                  }
                : { duration: EXIT, ease: EASE }
          }
        />

        {/* Layers + modules */}
        {LAYERS.map((layer) => (
          <g key={layer.id}>
            <motion.text
              x="14"
              y={layer.y + 14}
              className="tech-arch__layer-label"
              initial={false}
              animate={{
                opacity: active ? 0.9 : 0.4,
                fill: active ? "var(--cap-label-active)" : "var(--cap-label-idle)",
              }}
              transition={{
                duration: instant ? 0 : active ? 0.3 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? layer.delay : 0,
              }}
            >
              {layer.label}
            </motion.text>

            {/* Layer rail activates with layer */}
            <motion.rect
              x="70"
              y={layer.y}
              width="248"
              height="22"
              rx="5"
              className="tech-arch__rail"
              initial={false}
              animate={{
                opacity: active ? 1 : 0.35,
                stroke: active
                  ? "var(--cap-stroke-active)"
                  : "var(--cap-stroke-idle)",
              }}
              transition={{
                duration: instant ? 0 : active ? 0.32 : EXIT,
                ease: EASE,
                delay: instant ? 0 : active ? layer.delay : 0,
              }}
            />

            {layer.modules.map((mod, mi) => (
              <motion.g
                key={mod.id}
                initial={false}
                animate={{
                  x: active ? mod.activeX : mod.restX,
                  y: layer.y + 3,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.42 : EXIT,
                  ease: EASE,
                  delay: instant
                    ? 0
                    : active
                      ? layer.delay + 0.06 + mi * 0.04
                      : 0,
                }}
              >
                <motion.rect
                  width={mod.w}
                  height="16"
                  rx="3.5"
                  className={
                    mod.spine
                      ? "tech-arch__mod tech-arch__mod--spine"
                      : "tech-arch__mod"
                  }
                  initial={false}
                  animate={{
                    opacity: active ? (mod.spine ? 1 : 0.72) : 0.45,
                    stroke:
                      active && mod.spine
                        ? "var(--cap-stroke-active)"
                        : "var(--cap-stroke-idle)",
                    fill:
                      active && mod.spine
                        ? "var(--cap-fill-active)"
                        : "var(--cap-fill-idle)",
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.32 : EXIT,
                    ease: EASE,
                    delay: instant
                      ? 0
                      : active
                        ? layer.delay + 0.08 + mi * 0.04
                        : 0,
                  }}
                />
                <motion.text
                  x={mod.w / 2}
                  y="11"
                  textAnchor="middle"
                  className="tech-arch__mod-label"
                  initial={false}
                  animate={{
                    opacity: active ? (mod.spine ? 0.95 : 0.55) : 0.4,
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.28 : EXIT,
                    delay: instant
                      ? 0
                      : active
                        ? layer.delay + 0.1 + mi * 0.04
                        : 0,
                    ease: EASE,
                  }}
                >
                  {mod.label}
                </motion.text>
              </motion.g>
            ))}
          </g>
        ))}

        {/* Compact system status */}
        <g transform="translate(246 176)">
          <rect
            width="100"
            height="18"
            rx="4"
            className="tech-arch__status"
          />
          <motion.circle
            cx="10"
            cy="9"
            r="2.4"
            initial={false}
            animate={{
              fill: active ? "var(--cap-status-done)" : "var(--cap-status-idle)",
              opacity: active ? 1 : 0.55,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 0.95 : 0,
              ease: EASE,
            }}
          />
          <motion.text
            x="18"
            y="12.5"
            className="tech-arch__status-text"
            initial={false}
            animate={{ opacity: active ? 0 : 0.5 }}
            transition={{
              duration: instant ? 0 : active ? 0.15 : EXIT,
              ease: EASE,
            }}
          >
            Fragmented
          </motion.text>
          <motion.text
            x="18"
            y="12.5"
            className="tech-arch__status-text tech-arch__status-text--ready"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.95 : 0,
              ease: EASE,
            }}
          >
            SYSTEM READY
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
