"use client";

import { motion } from "framer-motion";
import { CAPABILITIES, type Capability } from "./capabilities";
import {
  SPINE_X,
  SPINE_Y,
  SPINE_RISERS,
  SPINE_CONNECTORS,
  STROKE,
} from "./topology";

type CapabilitySpineProps = {
  reduceMotion: boolean;
  drawn: boolean;
  /** Nodes that have completed entrance wake. */
  wokenIds: Set<string>;
  /** Single active capability in the routing sequence. */
  activeId: string | null;
  hoveredId: string | null;
};

export default function CapabilitySpine({
  reduceMotion,
  drawn,
  wokenIds,
  activeId,
  hoveredId,
}: CapabilitySpineProps) {
  return (
    <g className="services-hero__spine">
      {/* Spine baseline */}
      <motion.line
        x1={SPINE_X[0]}
        y1={SPINE_Y}
        x2={SPINE_X[6]}
        y2={SPINE_Y}
        stroke="rgba(120,140,170,0.35)"
        strokeWidth="1"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={drawn ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.35 }}
      />
      <motion.path
        d={`M ${SPINE_X[0]} ${SPINE_Y} H ${SPINE_X[6]}`}
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.15"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={
          drawn ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: {
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.32,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: { duration: 0.4, delay: 0.32 },
        }}
      />

      {/* Short vertical connectors — one wakes with active capability */}
      {SPINE_CONNECTORS.map((conn) => {
        const lit = activeId === conn.capability || hoveredId === conn.capability;
        return (
          <path
            key={`conn-${conn.capability}`}
            d={conn.d}
            fill="none"
            stroke={lit ? "#2563EB" : "rgba(100,120,150,0.2)"}
            strokeWidth={lit ? 1.05 : 0.7}
            opacity={drawn ? (lit ? 0.48 : 0.12) : 0}
            style={{
              transition:
                "opacity 0.45s ease, stroke 0.45s ease, stroke-width 0.45s ease",
            }}
          />
        );
      })}

      {/* Longer risers into architecture */}
      {SPINE_RISERS.map((riser) => {
        const lit =
          hoveredId === riser.capability || activeId === riser.capability;
        return (
          <motion.path
            key={riser.capability}
            d={riser.d}
            fill="none"
            stroke={lit ? STROKE.active : "rgba(100,120,150,0.2)"}
            strokeWidth={lit ? 1.05 : 0.7}
            strokeDasharray="2 4"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={
              drawn
                ? { pathLength: 1, opacity: lit ? 0.85 : 0.28 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.7, delay: 0.85 },
              opacity: { duration: 0.4 },
            }}
            style={{ transition: "stroke 0.4s ease" }}
          />
        );
      })}

      {/* Nodes — assembled after entrance; only one brightly active */}
      {CAPABILITIES.map((cap, i) => {
        const primary =
          activeId === cap.id || hoveredId === cap.id;
        const present = reduceMotion || wokenIds?.has(cap.id);
        const x = SPINE_X[i];
        return (
          <g
            key={cap.id}
            transform={`translate(${x} ${SPINE_Y})`}
            className={
              primary
                ? "services-hero__spine-node is-active"
                : "services-hero__spine-node"
            }
            style={{
              opacity: present ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          >
            {primary && (
              <circle r={11} fill="rgba(37,99,235,0.16)" />
            )}
            <circle
              r={primary ? 5.2 : 4.2}
              fill={primary ? "#2563EB" : present ? "rgba(15,23,42,0.5)" : "transparent"}
              stroke={
                primary
                  ? "#3B82F6"
                  : present
                    ? "rgba(140,149,165,0.4)"
                    : "rgba(140,149,165,0.2)"
              }
              strokeWidth={1.1}
              style={{
                transition:
                  "r 0.35s ease, fill 0.35s ease, stroke 0.35s ease",
              }}
            />
            {primary && <circle r={1.7} fill="#F5F5F2" />}
          </g>
        );
      })}
    </g>
  );
}

type CapabilityLabelsProps = {
  assembled: boolean;
  activeId: string | null;
  hoveredId: string | null;
  onEnter: (id: Capability["id"]) => void;
  onLeave: () => void;
};

export function CapabilityLabels({
  assembled,
  activeId,
  hoveredId,
  onEnter,
  onLeave,
}: CapabilityLabelsProps) {
  return (
    <nav className="services-hero__cap-nav" aria-label="Capabilities">
      {CAPABILITIES.map((cap) => {
        const primary = activeId === cap.id || hoveredId === cap.id;
        return (
          <a
            key={cap.id}
            href={cap.href}
            className={`services-hero__cap-link${assembled ? " is-assembled" : ""}${primary ? " is-active" : ""}${hoveredId === cap.id ? " is-hover" : ""}`}
            onMouseEnter={() => onEnter(cap.id)}
            onFocus={() => onEnter(cap.id)}
            onMouseLeave={onLeave}
            onBlur={onLeave}
          >
            <span className="services-hero__cap-id">{cap.id}</span>
            <span className="services-hero__cap-label">{cap.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
