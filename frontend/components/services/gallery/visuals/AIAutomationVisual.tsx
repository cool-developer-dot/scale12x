"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualProps } from "./types";

/**
 * Card 02 — AI & Automation
 * Orchestration workflow: Inputs → AI Core → Outputs
 * Visual grammar is intentionally distinct from Growth Strategy.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = 0.4;

const INPUTS = [
  { id: "crm", label: "CRM", y: 28 },
  { id: "email", label: "Email", y: 58, active: true },
  { id: "support", label: "Support", y: 88 },
  { id: "docs", label: "Documents", y: 118 },
] as const;

const OUTPUTS = [
  { id: "actions", label: "Actions", y: 28, active: true },
  { id: "insights", label: "Insights", y: 58 },
  { id: "responses", label: "Responses", y: 88 },
  { id: "workflows", label: "Workflows", y: 118 },
] as const;

/** Internal reasoning states inside the AI core */
const REASONING = [
  { id: "classify", label: "Classify", delay: 0.32 },
  { id: "enrich", label: "Enrich", delay: 0.46 },
  { id: "decide", label: "Decide", delay: 0.6 },
  { id: "route", label: "Route", delay: 0.74 },
] as const;

/** Inbound conduit: Email port → AI core */
const IN_PATH = "M78 66 H118";
/** Outbound conduit: AI core → Actions */
const OUT_PATH = "M242 66 H282";

export default function AIAutomationVisual({
  isActive = false,
  reduceMotion = false,
}: CapabilityVisualProps) {
  const active = reduceMotion ? true : isActive;
  const instant = reduceMotion;

  return (
    <div
      className={`ai-orch${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="ai-orch__svg"
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
          className="ai-orch__field"
        />

        {/* Column labels */}
        <text x="18" y="18" className="ai-orch__col-label">
          Inputs
        </text>
        <text x="180" y="18" textAnchor="middle" className="ai-orch__col-label">
          AI Core
        </text>
        <text x="342" y="18" textAnchor="end" className="ai-orch__col-label">
          Outputs
        </text>

        {/* —— INPUT RAIL —— */}
        {INPUTS.map((item) => {
          const isTx = "active" in item && item.active;
          return (
            <g key={item.id} transform={`translate(14 ${item.y})`}>
              <motion.rect
                width="64"
                height="22"
                rx="5"
                className="ai-orch__port"
                initial={false}
                animate={{
                  opacity: active ? (isTx ? 1 : 0.28) : 0.55,
                  stroke:
                    active && isTx
                      ? "var(--cap-stroke-active)"
                      : "var(--cap-stroke-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active && isTx ? 0.02 : 0,
                }}
              />
              <motion.circle
                cx="10"
                cy="11"
                r="2.2"
                initial={false}
                animate={{
                  fill:
                    active && isTx
                      ? "var(--cap-node-active)"
                      : "var(--cap-node-idle)",
                  opacity: active ? (isTx ? 1 : 0.3) : 0.55,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active && isTx ? 0.04 : 0,
                }}
              />
              <motion.text
                x="18"
                y="14.5"
                className="ai-orch__port-label"
                initial={false}
                animate={{
                  opacity: active ? (isTx ? 0.95 : 0.3) : 0.62,
                  fill:
                    active && isTx
                      ? "var(--cap-label-active)"
                      : "var(--cap-label-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  ease: EASE,
                }}
              >
                {item.label}
              </motion.text>
            </g>
          );
        })}

        {/* Inbound track */}
        <path d={IN_PATH} className="ai-orch__conduit ai-orch__conduit--track" />
        <motion.path
          d={IN_PATH}
          className="ai-orch__conduit ai-orch__conduit--live"
          initial={false}
          animate={{
            pathLength: active ? 1 : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{
            pathLength: {
              duration: instant ? 0 : active ? 0.28 : EXIT * 0.8,
              ease: EASE,
              delay: instant ? 0 : active ? 0.1 : 0,
            },
            opacity: {
              duration: instant ? 0 : 0.2,
              delay: instant ? 0 : active ? 0.1 : 0,
            },
          }}
        />

        {/* Traveling signal inbound */}
        <motion.circle
          r="3"
          className="ai-orch__signal"
          initial={false}
          animate={
            active
              ? { cx: [78, 118], cy: [66, 66], opacity: [0, 1, 1, 0] }
              : { cx: 78, cy: 66, opacity: 0 }
          }
          transition={
            instant
              ? { duration: 0 }
              : active
                ? { duration: 0.32, ease: EASE, delay: 0.12, times: [0, 0.15, 0.85, 1] }
                : { duration: EXIT, ease: EASE }
          }
        />

        {/* —— AI CORE MODULE —— */}
        <g transform="translate(118 34)">
          <motion.rect
            width="124"
            height="112"
            rx="10"
            className="ai-orch__core"
            initial={false}
            animate={{
              stroke: active
                ? "var(--cap-stroke-active)"
                : "var(--cap-stroke-idle)",
              opacity: 1,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.35 : EXIT,
              ease: EASE,
              delay: instant ? 0 : active ? 0.26 : 0,
            }}
          />

          <motion.text
            x="62"
            y="16"
            textAnchor="middle"
            className="ai-orch__core-title"
            initial={false}
            animate={{
              opacity: active ? 0.9 : 0.45,
              fill: active ? "var(--cap-label-active)" : "var(--cap-label-idle)",
            }}
            transition={{
              duration: instant ? 0 : active ? 0.3 : EXIT,
              delay: instant ? 0 : active ? 0.28 : 0,
              ease: EASE,
            }}
          >
            Orchestration
          </motion.text>

          {/* Transaction chip */}
          <motion.g
            initial={false}
            animate={{ opacity: active ? 1 : 0.35 }}
            transition={{
              duration: instant ? 0 : active ? 0.25 : EXIT,
              delay: instant ? 0 : active ? 0.08 : 0,
            }}
          >
            <rect
              x="14"
              y="24"
              width="96"
              height="16"
              rx="4"
              className="ai-orch__tx"
            />
            <text x="62" y="35" textAnchor="middle" className="ai-orch__tx-label">
              Lead received
            </text>
          </motion.g>

          {/* Reasoning states — sequential */}
          {REASONING.map((step, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const x = 14 + col * 50;
            const y = 50 + row * 28;
            return (
              <g key={step.id} transform={`translate(${x} ${y})`}>
                <motion.rect
                  width="46"
                  height="22"
                  rx="5"
                  className="ai-orch__step"
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0.4,
                    stroke: active
                      ? "var(--cap-stroke-active)"
                      : "var(--cap-stroke-idle)",
                    fill: active
                      ? "var(--cap-fill-active)"
                      : "var(--cap-fill-idle)",
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.28 : EXIT,
                    ease: EASE,
                    delay: instant ? 0 : active ? step.delay : 0,
                  }}
                />
                <motion.circle
                  cx="9"
                  cy="11"
                  r="2"
                  initial={false}
                  animate={{
                    fill: active ? "var(--cap-node-active)" : "var(--cap-node-idle)",
                    opacity: active ? 1 : 0.45,
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.25 : EXIT,
                    ease: EASE,
                    delay: instant ? 0 : active ? step.delay + 0.04 : 0,
                  }}
                />
                <motion.text
                  x="16"
                  y="14.5"
                  className="ai-orch__step-label"
                  initial={false}
                  animate={{
                    opacity: active ? 0.95 : 0.4,
                  }}
                  transition={{
                    duration: instant ? 0 : active ? 0.25 : EXIT,
                    delay: instant ? 0 : active ? step.delay + 0.04 : 0,
                    ease: EASE,
                  }}
                >
                  {step.label}
                </motion.text>
              </g>
            );
          })}
        </g>

        {/* Outbound track */}
        <path d={OUT_PATH} className="ai-orch__conduit ai-orch__conduit--track" />
        <motion.path
          d={OUT_PATH}
          className="ai-orch__conduit ai-orch__conduit--live"
          initial={false}
          animate={{
            pathLength: active ? 1 : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{
            pathLength: {
              duration: instant ? 0 : active ? 0.3 : EXIT * 0.8,
              ease: EASE,
              delay: instant ? 0 : active ? 0.86 : 0,
            },
            opacity: {
              duration: instant ? 0 : 0.2,
              delay: instant ? 0 : active ? 0.86 : 0,
            },
          }}
        />

        {/* Traveling signal outbound */}
        <motion.circle
          r="3"
          className="ai-orch__signal"
          initial={false}
          animate={
            active
              ? { cx: [242, 282], cy: [66, 66], opacity: [0, 1, 1, 0] }
              : { cx: 242, cy: 66, opacity: 0 }
          }
          transition={
            instant
              ? { duration: 0 }
              : active
                ? {
                    duration: 0.28,
                    ease: EASE,
                    delay: 0.88,
                    times: [0, 0.15, 0.85, 1],
                  }
                : { duration: EXIT, ease: EASE }
          }
        />

        {/* —— OUTPUT RAIL —— */}
        {OUTPUTS.map((item) => {
          const isTx = "active" in item && item.active;
          return (
            <g key={item.id} transform={`translate(282 ${item.y})`}>
              <motion.rect
                width="64"
                height="22"
                rx="5"
                className="ai-orch__port"
                initial={false}
                animate={{
                  opacity: active ? (isTx ? 1 : 0.28) : 0.55,
                  stroke:
                    active && isTx
                      ? "var(--cap-stroke-active)"
                      : "var(--cap-stroke-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.3 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active && isTx ? 0.98 : 0,
                }}
              />
              <motion.circle
                cx="10"
                cy="11"
                r="2.2"
                initial={false}
                animate={{
                  fill:
                    active && isTx
                      ? "var(--cap-node-active)"
                      : "var(--cap-node-idle)",
                  opacity: active ? (isTx ? 1 : 0.3) : 0.55,
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active && isTx ? 1.0 : 0,
                }}
              />
              <motion.text
                x="18"
                y="14.5"
                className="ai-orch__port-label"
                initial={false}
                animate={{
                  opacity: active ? (isTx ? 0.95 : 0.3) : 0.62,
                  fill:
                    active && isTx
                      ? "var(--cap-label-active)"
                      : "var(--cap-label-idle)",
                }}
                transition={{
                  duration: instant ? 0 : active ? 0.28 : EXIT,
                  ease: EASE,
                  delay: instant ? 0 : active && isTx ? 1.0 : 0,
                }}
              >
                {item.label}
              </motion.text>
            </g>
          );
        })}

        {/* Status bar */}
        <g transform="translate(118 158)">
          <rect
            width="124"
            height="28"
            rx="6"
            className="ai-orch__status"
          />
          <motion.circle
            cx="14"
            cy="14"
            r="3"
            initial={false}
            animate={{
              fill: active ? "var(--cap-status-done)" : "var(--cap-status-idle)",
              opacity: active ? 1 : 0.5,
            }}
            transition={{
              duration: instant ? 0 : active ? 0.25 : EXIT,
              delay: instant ? 0 : active ? 1.05 : 0,
              ease: EASE,
            }}
          />
          <motion.text
            x="24"
            y="17.5"
            className="ai-orch__status-text"
            initial={false}
            animate={{ opacity: active ? 0 : 0.55 }}
            transition={{
              duration: instant ? 0 : active ? 0.15 : EXIT,
              ease: EASE,
            }}
          >
            Idle
          </motion.text>
          {!instant && (
            <motion.text
              x="24"
              y="17.5"
              className="ai-orch__status-text ai-orch__status-text--process"
              initial={false}
              animate={{
                opacity: active ? [0, 1, 1, 0] : 0,
              }}
              transition={
                active
                  ? {
                      duration: 0.9,
                      ease: EASE,
                      delay: 0.12,
                      times: [0, 0.08, 0.72, 1],
                    }
                  : { duration: EXIT }
              }
            >
              Processing…
            </motion.text>
          )}
          <motion.text
            x="24"
            y="17.5"
            className="ai-orch__status-text ai-orch__status-text--done"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: instant ? 0 : active ? 0.28 : EXIT,
              delay: instant ? 0 : active ? 1.02 : 0,
              ease: EASE,
            }}
          >
            Completed · CRM updated
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
