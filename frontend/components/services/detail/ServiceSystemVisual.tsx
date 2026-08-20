"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { ServiceConfig } from "./types";
import {
  CORE,
  CORE_MOBILE,
  VIEW,
  VIEW_MOBILE,
  getInputRect,
  getOutputRect,
  inputStagger,
} from "./topology";
import ServiceCore from "./ServiceCore";
import ServiceSignal from "./ServiceSignal";
import ServiceNode from "./ServiceNode";
import { useServiceSequence } from "./useServiceSequence";
import { useSectionVisibility } from "@/components/services/hero/useSectionVisibility";

export type VisualDensity = "desktop" | "laptop" | "tablet" | "mobile";

type Props = {
  config: ServiceConfig;
  reduceMotion: boolean;
  assembled: boolean;
  entranceReady: boolean;
  density: VisualDensity;
  allowParallax: boolean;
};

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

export default function ServiceSystemVisual({
  config,
  reduceMotion,
  assembled,
  entranceReady,
  density,
  allowParallax,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { active: sectionActive } = useSectionVisibility(rootRef, {
    threshold: 0.15,
  });

  const mobile = density === "mobile";
  const tablet = density === "tablet";
  const compact = tablet;
  const stacked = mobile;
  const neutral = config.visual.accentMode === "neutral";

  const view = mobile ? VIEW_MOBILE : VIEW;
  const core = mobile ? CORE_MOBILE : CORE;

  const {
    activeInput,
    activeOutput,
    phase,
    activeStage,
    corePulse,
    signal,
    illuminateIn,
    illuminateOut,
    hoveredInput,
    hoveredOutput,
    onInputHover,
    onOutputHover,
    routes,
    inputIds,
    outputIds,
  } = useServiceSequence({
    config,
    enabled: entranceReady,
    sectionActive,
    reduceMotion,
    mobile,
  });

  const inputs = useMemo(() => {
    const allow = new Set(inputIds);
    return config.visual.inputs.filter((i) => allow.has(i.id));
  }, [config.visual.inputs, inputIds]);

  const outputs = useMemo(() => {
    const allow = new Set(outputIds);
    return config.visual.outputs.filter((o) => allow.has(o.id));
  }, [config.visual.outputs, outputIds]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const inputX = useTransform(px, (v) => v * 0.35);
  const inputY = useTransform(py, (v) => v * 0.35);
  const panelX = useTransform(px, (v) => v * 0.7);
  const panelY = useTransform(py, (v) => v * 0.7);
  const orbitX = useTransform(px, (v) => v * 1);
  const orbitY = useTransform(py, (v) => v * 1);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!allowParallax || reduceMotion || mobile) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      px.set(nx * 3.5);
      py.set(ny * 3);
    },
    [allowParallax, reduceMotion, mobile, px, py],
  );

  const onPointerLeave = useCallback(() => {
    if (!allowParallax || reduceMotion) return;
    animate(px, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    animate(py, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
  }, [allowParallax, reduceMotion, px, py]);

  useEffect(() => {
    if (!allowParallax || reduceMotion) {
      px.set(0);
      py.set(0);
    }
  }, [allowParallax, reduceMotion, px, py]);

  const pausedClass = !sectionActive || reduceMotion ? " is-paused" : "";
  const allInputIds = config.visual.inputs.map((i) => i.id);
  const allOutputIds = config.visual.outputs.map((o) => o.id);

  return (
    <div
      ref={rootRef}
      className={`ai-hero__system ai-hero__system--${density}${stacked ? " ai-hero__system--stacked" : ""}${pausedClass}${assembled || reduceMotion ? " is-assembled" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label={`${config.serviceName} operating system: ${config.visual.inputLabel} into ${config.visual.coreTitle} producing ${config.visual.outputLabel}`}
    >
      {!stacked && <div className="ai-hero__system-glow" aria-hidden="true" />}

      {!stacked && (
        <>
          <p
            className="ai-hero__col-label ai-hero__col-label--in"
            style={{ left: pct(10, view.w), top: pct(18, view.h) }}
          >
            {config.visual.inputLabel}
          </p>
          <p
            className="ai-hero__col-label ai-hero__col-label--out"
            style={{
              left: pct(842, view.w),
              top: pct(18, view.h),
              width: pct(268, view.w),
            }}
          >
            {config.visual.outputLabel}
          </p>
        </>
      )}

      {stacked && (
        <>
          <p
            className="ai-hero__col-label ai-hero__col-label--in ai-hero__col-label--stacked"
            style={{ left: pct(16, view.w), top: pct(8, view.h) }}
          >
            {config.visual.inputLabel}
          </p>
          <p
            className="ai-hero__col-label ai-hero__col-label--out ai-hero__col-label--stacked"
            style={{ left: pct(16, view.w), top: pct(520, view.h) }}
          >
            {config.visual.outputLabel}
          </p>
        </>
      )}

      <svg
        className="ai-hero__svg"
        viewBox={`0 0 ${view.w} ${view.h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="svc-core-glow" cx="50%" cy="45%" r="50%">
            <stop
              offset="0%"
              stopColor={
                neutral ? "rgba(148,163,184,0.18)" : "rgba(37,99,235,0.22)"
              }
            />
            <stop
              offset="55%"
              stopColor={
                neutral ? "rgba(148,163,184,0.05)" : "rgba(37,99,235,0.06)"
              }
            />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
        </defs>

        <motion.g style={allowParallax && !mobile ? { x: orbitX, y: orbitY } : undefined}>
          {routes.map((r) => {
            const isActiveIn = illuminateIn === r.id && !reduceMotion;
            const isActiveOut =
              illuminateOut === r.outboundTarget && !reduceMotion;
            const hoverIn =
              !mobile &&
              hoveredInput === r.id &&
              !isActiveIn &&
              !reduceMotion;
            const hoverOut =
              !mobile &&
              hoveredOutput === r.outboundTarget &&
              !isActiveOut &&
              !reduceMotion;
            const travelingIn =
              signal?.kind === "inbound" &&
              activeInput === r.id &&
              !reduceMotion;
            const travelingOut =
              signal?.kind === "outbound" &&
              activeInput === r.id &&
              !reduceMotion;
            const travelDur = signal?.duration ?? 1.1;
            const travelStroke = neutral
              ? "#E2E8F0"
              : travelingOut
                ? "#3B82F6"
                : "#60A5FA";

            return (
              <g key={r.id}>
                <path
                  d={r.inbound}
                  className={[
                    "ai-hero__route",
                    "ai-hero__route--in",
                    isActiveIn || reduceMotion ? "is-active" : "",
                    hoverIn ? "is-hover" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  strokeDasharray="4 6"
                  fill="none"
                  strokeLinecap="round"
                />
                {travelingIn && signal && (
                  <motion.path
                    key={`tin-${signal.key}`}
                    className="ai-hero__route--travel"
                    d={r.inbound}
                    fill="none"
                    stroke={travelStroke}
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: travelDur,
                        ease: [0.22, 0.08, 0.2, 1],
                      },
                      opacity: { duration: 0.18 },
                    }}
                  />
                )}
                <path
                  d={r.outbound}
                  className={[
                    "ai-hero__route",
                    "ai-hero__route--out",
                    isActiveOut || reduceMotion ? "is-active" : "",
                    hoverOut ? "is-hover" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  fill="none"
                  strokeLinecap="round"
                />
                {travelingOut && signal && (
                  <motion.path
                    key={`tout-${signal.key}`}
                    className="ai-hero__route--travel"
                    d={r.outbound}
                    fill="none"
                    stroke={travelStroke}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: travelDur,
                        ease: [0.22, 0.08, 0.2, 1],
                      },
                      opacity: { duration: 0.18 },
                    }}
                  />
                )}
              </g>
            );
          })}

          <motion.g
            style={
              allowParallax && !mobile ? { x: panelX, y: panelY } : undefined
            }
          >
            <ServiceCore
              cx={core.x}
              cy={core.y}
              pulse={corePulse || reduceMotion}
              activeStage={
                reduceMotion
                  ? (config.visual.stages[config.visual.stages.length - 1]?.id ??
                    null)
                  : activeStage
              }
              assembled={assembled || reduceMotion}
              reduceMotion={reduceMotion}
              orbitsAlive={sectionActive && assembled && !stacked}
              compact={compact}
              stacked={stacked}
              coreLabel={config.visual.coreLabel}
              coreTitle={config.visual.coreTitle}
              stages={config.visual.stages}
              variant={config.visual.variant}
              neutral={neutral}
            />
          </motion.g>

          {signal && !reduceMotion && (
            <ServiceSignal
              key={signal.key}
              pathD={signal.pathD}
              duration={signal.duration}
              kind={signal.kind}
              neutral={neutral}
            />
          )}
        </motion.g>
      </svg>

      <motion.div
        className="ai-hero__nodes ai-hero__nodes--in"
        style={
          allowParallax && !mobile ? { x: inputX, y: inputY } : undefined
        }
      >
        {inputs.map((node) => {
          const rect = getInputRect(
            mobile ? config.visual.mobileInputIds : allInputIds,
            node.id,
            mobile,
          );
          if (!rect) return null;
          const idx = allInputIds.indexOf(node.id);
          const active = activeInput === node.id && phase !== "idle";
          const related =
            !mobile &&
            (hoveredInput === node.id ||
              (hoveredOutput != null &&
                routes.find((r) => r.outboundTarget === hoveredOutput)?.id ===
                  node.id));
          return (
            <ServiceNode
              key={node.id}
              kind="input"
              title={node.title}
              subtitle={node.subtitle}
              icon={node.icon}
              active={
                active || (!!reduceMotion && node.id === inputs[0]?.id)
              }
              related={!!related && !active}
              style={{
                left: pct(
                  rect.x + (tablet || mobile ? 0 : inputStagger(idx) * 0.35),
                  view.w,
                ),
                top: pct(rect.y, view.h),
                width: pct(rect.w, view.w),
                height: pct(rect.h, view.h),
              }}
              onHover={
                mobile ? undefined : (on) => onInputHover(on ? node.id : null)
              }
            />
          );
        })}
      </motion.div>

      <div className="ai-hero__nodes ai-hero__nodes--out">
        {outputs.map((node) => {
          const rect = getOutputRect(
            mobile ? config.visual.mobileOutputIds : allOutputIds,
            node.id,
            mobile,
          );
          if (!rect) return null;
          const active =
            (activeOutput === node.id &&
              (phase === "outbound" || phase === "settle")) ||
            (!!reduceMotion && node.id === outputs[0]?.id);
          const related = !mobile && hoveredOutput === node.id;
          return (
            <ServiceNode
              key={node.id}
              kind="output"
              title={node.title}
              subtitle={node.subtitle}
              icon={node.icon}
              active={active}
              related={!!related && !active}
              settled={active}
              style={{
                left: pct(rect.x, view.w),
                top: pct(rect.y, view.h),
                width: pct(rect.w, view.w),
                height: pct(rect.h, view.h),
              }}
              onHover={
                mobile
                  ? undefined
                  : (on) => onOutputHover(on ? node.id : null)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

/** Preferred shared alias — same transformation engine for every service */
export { ServiceSystemVisual as ServiceTransformationVisual };
