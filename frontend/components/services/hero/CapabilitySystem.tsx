"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { CAPABILITIES, type Capability } from "./capabilities";
import {
  ANCHOR_NODES,
  CORE,
  SYSTEM_PATHS,
  VIEW,
} from "./topology";
import CoreNode from "./CoreNode";
import SystemPath from "./SystemPath";
import SignalParticle from "./SignalParticle";
import CapabilitySpine, { CapabilityLabels } from "./CapabilitySpine";
import { useCapabilitySequence } from "./useCapabilitySequence";
import { useSectionVisibility } from "./useSectionVisibility";

export type SystemDensity = "desktop" | "laptop" | "tablet" | "mobile";

type CapabilitySystemProps = {
  reduceMotion: boolean;
  phase: number;
  density?: SystemDensity;
  allowParallax?: boolean;
};

const MOBILE_PATH_IDS = new Set([
  "in-upper-white",
  "in-dotted-cobalt",
  "in-tech-elbow",
  "in-mid-secondary",
  "out-upper-cobalt",
  "out-mid-white",
  "out-lower-cobalt",
]);

const TABLET_PATH_IDS = new Set([
  "in-upper-white",
  "in-dotted-cobalt",
  "in-tech-elbow",
  "in-mid-secondary",
  "out-upper-cobalt",
  "out-mid-white",
  "out-lower-cobalt",
]);

function filterPaths(density: SystemDensity) {
  return SYSTEM_PATHS.filter((p) => {
    if (density === "desktop") return true;
    if (density === "laptop") {
      return p.phase !== "micro" && !p.desktopOnly;
    }
    if (density === "tablet") {
      return TABLET_PATH_IDS.has(p.id);
    }
    return MOBILE_PATH_IDS.has(p.id);
  });
}

function filterAnchors(density: SystemDensity) {
  return ANCHOR_NODES.filter((n) => {
    if (density === "desktop" || density === "laptop") return true;
    if (density === "tablet") return n.kind !== "micro";
    return n.kind === "primary" || n.kind === "secondary";
  });
}

function resolvePathId(
  preferred: string,
  available: Set<string>,
  fallbackIds: string[],
) {
  if (available.has(preferred)) return preferred;
  return fallbackIds.find((id) => available.has(id)) ?? preferred;
}

function AnchorDot({
  x,
  y,
  kind,
  fill,
  lit,
  reduceMotion,
  delay,
  breathClass,
}: {
  x: number;
  y: number;
  kind: "primary" | "secondary" | "micro";
  fill: "cobalt" | "white-ring" | "outline" | "muted";
  lit?: boolean;
  reduceMotion: boolean;
  delay: number;
  breathClass?: string;
}) {
  const r = kind === "primary" ? 4.8 : kind === "secondary" ? 3.4 : 2;
  let fillColor = "transparent";
  let stroke = "rgba(140,149,165,0.4)";
  if (fill === "cobalt") {
    fillColor = lit ? "#3B82F6" : "#2563EB";
    stroke = "#3B82F6";
  } else if (fill === "white-ring") {
    fillColor = "rgba(15,23,42,0.85)";
    stroke = lit ? "#F5F5F2" : "rgba(210,225,245,0.6)";
  } else if (fill === "outline") {
    stroke = lit ? "#2563EB" : "rgba(37,99,235,0.5)";
  } else {
    fillColor = "rgba(140,149,165,0.3)";
    stroke = "transparent";
  }

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={r}
      fill={fillColor}
      stroke={stroke}
      strokeWidth={0.95}
      className={breathClass}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: lit ? 1 : 0.8, scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: 0.4 }}
    />
  );
}

export default function CapabilitySystem({
  reduceMotion,
  phase,
  density = "desktop",
  allowParallax = false,
}: CapabilitySystemProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [wokenIds, setWokenIds] = useState<Set<string>>(
    () => new Set(reduceMotion ? CAPABILITIES.map((c) => c.id) : []),
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [assembled, setAssembled] = useState(reduceMotion);

  const isCompact = density === "tablet" || density === "mobile";
  const showConstruction = density === "desktop" || density === "laptop";
  const allowHover = density !== "mobile";
  const allowBreath = density === "desktop";

  const { active: sectionActive } = useSectionVisibility(rootRef, {
    threshold: 0.14,
    rootMargin: "40px 0px",
  });

  const sequenceEnabled = (phase >= 8 || reduceMotion) && assembled;

  const {
    activeId,
    corePulse,
    primarySignal,
    illuminateInbound,
    illuminateOutbound,
    overrideCapability,
    releaseOverride,
  } = useCapabilitySequence({
    enabled: sequenceEnabled && !reduceMotion,
    sectionActive,
    reduceMotion,
    compact: isCompact,
    // Spec: one primary signal only — no competing micro-signals
    allowSecondary: false,
  });

  const paths = useMemo(() => filterPaths(density), [density]);
  const anchors = useMemo(() => filterAnchors(density), [density]);
  const availableIds = useMemo(
    () => new Set(paths.map((p) => p.id)),
    [paths],
  );

  const pathById = useMemo(() => {
    const map = new Map(SYSTEM_PATHS.map((p) => [p.id, p]));
    return map;
  }, []);

  const drawnIncoming = phase >= 5 || reduceMotion;
  const drawnOutgoing = phase >= 7 || reduceMotion;
  const drawnMicro = (phase >= 7 || reduceMotion) && density === "desktop";
  const drawnSpine = phase >= 3 || reduceMotion;
  const coreVisible = phase >= 2 || reduceMotion;

  const routeFallback = useMemo(
    () => paths.filter((p) => p.signal).map((p) => p.id),
    [paths],
  );

  const resolvedInbound = illuminateInbound
    ? resolvePathId(illuminateInbound, availableIds, routeFallback)
    : null;
  const resolvedOutbound = illuminateOutbound
    ? resolvePathId(illuminateOutbound, availableIds, routeFallback)
    : null;

  const travelingPathId = primarySignal
    ? resolvePathId(primarySignal.pathId, availableIds, routeFallback)
    : null;

  // Restrained parallax — rear 2–3px, construction 1–2px, core ~stationary
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const parallaxOff = !allowParallax || reduceMotion || !sectionActive;
  const bgX = useTransform(px, [-1, 1], parallaxOff ? [0, 0] : [-2.5, 2.5]);
  const bgY = useTransform(py, [-1, 1], parallaxOff ? [0, 0] : [-2, 2]);
  const coreX = useTransform(px, [-1, 1], parallaxOff ? [0, 0] : [0.4, -0.4]);
  const coreY = useTransform(py, [-1, 1], parallaxOff ? [0, 0] : [0.3, -0.3]);
  const midX = useTransform(px, [-1, 1], parallaxOff ? [0, 0] : [1.2, -1.2]);
  const midY = useTransform(py, [-1, 1], parallaxOff ? [0, 0] : [1, -1]);

  const rafMove = useRef(0);
  const pendingPtr = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) {
      setWokenIds(new Set(CAPABILITIES.map((c) => c.id)));
      setAssembled(true);
      return;
    }
    if (phase < 4) return;
    const timers: number[] = [];
    CAPABILITIES.forEach((cap, i) => {
      timers.push(
        window.setTimeout(() => {
          setWokenIds((prev) => new Set(prev).add(cap.id));
        }, i * 110),
      );
    });
    timers.push(
      window.setTimeout(
        () => setAssembled(true),
        CAPABILITIES.length * 110 + 80,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, reduceMotion]);

  const [entrancePulse, setEntrancePulse] = useState(false);
  useEffect(() => {
    if (reduceMotion || phase !== 6) return;
    setEntrancePulse(true);
    const t = window.setTimeout(() => setEntrancePulse(false), 520);
    return () => clearTimeout(t);
  }, [phase, reduceMotion]);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!allowParallax || reduceMotion || !sectionActive) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pendingPtr.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
    if (rafMove.current) return;
    rafMove.current = requestAnimationFrame(() => {
      rafMove.current = 0;
      void animate(px, pendingPtr.current.x, {
        type: "spring",
        stiffness: 55,
        damping: 24,
      });
      void animate(py, pendingPtr.current.y, {
        type: "spring",
        stiffness: 55,
        damping: 24,
      });
    });
  };

  const onPointerLeave = () => {
    if (allowParallax) {
      void animate(px, 0, { type: "spring", stiffness: 50, damping: 20 });
      void animate(py, 0, { type: "spring", stiffness: 50, damping: 20 });
    }
    if (hoveredId) {
      setHoveredId(null);
      releaseOverride();
    }
  };

  const onEnter = useCallback(
    (id: Capability["id"]) => {
      if (!allowHover) return;
      setHoveredId(id);
      overrideCapability(id);
    },
    [allowHover, overrideCapability],
  );

  const onLeaveCap = useCallback(() => {
    setHoveredId(null);
    releaseOverride();
  }, [releaseOverride]);

  const primaryPathD = travelingPathId
    ? pathById.get(travelingPathId)?.d
    : null;

  const orbitMode =
    density === "mobile" || reduceMotion
      ? "off"
      : density === "tablet"
        ? "single"
        : "dual";

  const displayActiveId = hoveredId ?? activeId;
  const pausedClass =
    !sectionActive || reduceMotion ? " is-paused" : "";

  return (
    <div
      ref={rootRef}
      className={`services-hero__system services-hero__system--${density}${isCompact ? " is-compact" : ""}${pausedClass}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="services-hero__system-glow" aria-hidden="true" />

      <svg
        className="services-hero__svg"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="services-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.22)" />
            <stop offset="55%" stopColor="rgba(37,99,235,0.06)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
        </defs>

        {/* Sparse construction — core-adjacent only */}
        <motion.g
          style={{ x: bgX, y: bgY }}
          opacity={isCompact ? 0.35 : 1}
        >
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={density === "mobile" ? 100 : 130}
            stroke="rgba(90,115,150,0.09)"
            strokeWidth="0.6"
            fill="none"
          />
          {showConstruction && (
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r={168}
              stroke="rgba(90,115,150,0.07)"
              strokeWidth="0.55"
              fill="none"
              strokeDasharray="2 11"
            />
          )}
          {/* Alignment ticks near core only — not full-span crosshairs */}
          <path
            d={`M ${CORE.x - 18} ${CORE.y} h 8 M ${CORE.x + 10} ${CORE.y} h 8 M ${CORE.x} ${CORE.y - 18} v 8 M ${CORE.x} ${CORE.y + 10} v 8`}
            stroke="rgba(90,115,150,0.12)"
            strokeWidth="0.65"
          />
        </motion.g>

        {/* Construction micro paths */}
        {density === "desktop" && (
          <motion.g style={{ x: midX, y: midY }}>
            {paths
              .filter((p) => p.phase === "micro")
              .map((p) => (
                <SystemPath
                  key={p.id}
                  id={p.id}
                  d={p.d}
                  style={p.style}
                  dashed={p.dashed}
                  width={p.width}
                  delay={p.delay}
                  drawn={drawnMicro}
                  illuminated={false}
                  reduceMotion={reduceMotion}
                />
              ))}
          </motion.g>
        )}

        {/* Main routes */}
        <g>
          {paths
            .filter((p) => p.phase === "incoming" || p.phase === "outgoing")
            .map((p) => {
              const illuminated =
                p.id === resolvedInbound || p.id === resolvedOutbound;
              const traveling =
                p.id === travelingPathId && !!primarySignal;
              return (
                <SystemPath
                  key={p.id}
                  id={p.id}
                  d={p.d}
                  style={p.style}
                  dashed={p.dashed}
                  width={p.width}
                  delay={
                    p.phase === "outgoing"
                      ? Math.max(0, p.delay - 0.9)
                      : p.delay
                  }
                  drawn={
                    p.phase === "incoming" ? drawnIncoming : drawnOutgoing
                  }
                  illuminated={illuminated}
                  traveling={traveling}
                  travelDuration={primarySignal?.duration}
                  travelKey={primarySignal?.key}
                  reduceMotion={reduceMotion}
                />
              );
            })}
        </g>

        {/* Junction anchors */}
        <g>
          {anchors.map((n, i) => {
            const breathIdx = n.id === "n2" || n.id === "n7";
            return (
              <AnchorDot
                key={n.id}
                x={n.x}
                y={n.y}
                kind={n.kind}
                fill={n.fill}
                lit={
                  n.id === "n2" || n.id === "n7" || n.id === "n9"
                    ? !!(resolvedInbound || resolvedOutbound)
                    : false
                }
                reduceMotion={reduceMotion}
                delay={0.7 + i * 0.03}
                breathClass={
                  allowBreath && breathIdx && !reduceMotion && sectionActive
                    ? `services-hero__node-breath services-hero__node-breath--${n.id}`
                    : undefined
                }
              />
            );
          })}
        </g>

        {/* Core */}
        <motion.g style={{ x: coreX, y: coreY }}>
          <CoreNode
            reduceMotion={reduceMotion}
            visible={coreVisible}
            pulse={corePulse || entrancePulse}
            orbitsAlive={sectionActive && phase >= 2}
            orbitMode={orbitMode}
          />
        </motion.g>

        <CapabilitySpine
          reduceMotion={reduceMotion}
          drawn={drawnSpine}
          wokenIds={wokenIds}
          activeId={displayActiveId}
          hoveredId={hoveredId}
        />

        {primarySignal && primaryPathD && !reduceMotion && (
          <SignalParticle
            key={`p-${primarySignal.key}`}
            pathD={primaryPathD}
            duration={primarySignal.duration}
            reversed={primarySignal.reversed}
            kind="primary"
          />
        )}
      </svg>

      <CapabilityLabels
        assembled={assembled || reduceMotion}
        activeId={displayActiveId}
        hoveredId={hoveredId}
        onEnter={onEnter}
        onLeave={onLeaveCap}
      />
    </div>
  );
}
