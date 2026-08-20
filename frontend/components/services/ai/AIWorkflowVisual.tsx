"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  AI_INPUTS,
  AI_OUTPUTS,
  MOBILE_INPUT_IDS,
  MOBILE_OUTPUT_IDS,
  type WorkflowNodeId,
  type WorkflowOutputId,
} from "./data";
import {
  CORE,
  CORE_MOBILE,
  INPUT_LAYOUT,
  INPUT_LAYOUT_MOBILE,
  OUTPUT_LAYOUT,
  OUTPUT_LAYOUT_MOBILE,
  VIEW,
  VIEW_MOBILE,
} from "./topology";
import AICore from "./AICore";
import AISignal from "./AISignal";
import WorkflowNode from "./WorkflowNode";
import { useAIWorkflowSequence } from "./useAIWorkflowSequence";
import { useSectionVisibility } from "@/components/services/hero/useSectionVisibility";

export type VisualDensity = "desktop" | "laptop" | "tablet" | "mobile";

type AIWorkflowVisualProps = {
  reduceMotion: boolean;
  assembled: boolean;
  entranceReady: boolean;
  density: VisualDensity;
  allowParallax: boolean;
};

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

export default function AIWorkflowVisual({
  reduceMotion,
  assembled,
  entranceReady,
  density,
  allowParallax,
}: AIWorkflowVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { active: sectionActive } = useSectionVisibility(rootRef, {
    threshold: 0.15,
  });

  const mobile = density === "mobile";
  const tablet = density === "tablet";
  const compact = mobile || tablet;

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
  } = useAIWorkflowSequence({
    enabled: entranceReady,
    sectionActive,
    reduceMotion,
    mobile,
  });

  const inputs = useMemo(() => {
    if (mobile) {
      return AI_INPUTS.filter((i) =>
        (MOBILE_INPUT_IDS as string[]).includes(i.id),
      );
    }
    return AI_INPUTS;
  }, [mobile]);

  const outputs = useMemo(() => {
    if (mobile) {
      return AI_OUTPUTS.filter((o) =>
        (MOBILE_OUTPUT_IDS as string[]).includes(o.id),
      );
    }
    return AI_OUTPUTS;
  }, [mobile]);

  const routeList = routes;

  // Parallax via MotionValues — no React state on pointer move
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
      if (!allowParallax || reduceMotion) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      px.set(nx * 3.5);
      py.set(ny * 3);
    },
    [allowParallax, reduceMotion, px, py],
  );

  const onPointerLeave = useCallback(() => {
    if (!allowParallax || reduceMotion) return;
    animate(px, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    animate(py, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
  }, [allowParallax, reduceMotion, px, py]);

  // Reset parallax when disabled
  useEffect(() => {
    if (!allowParallax || reduceMotion) {
      px.set(0);
      py.set(0);
    }
  }, [allowParallax, reduceMotion, px, py]);

  const getInputRect = (id: WorkflowNodeId) => {
    if (mobile) {
      return INPUT_LAYOUT_MOBILE[id as keyof typeof INPUT_LAYOUT_MOBILE];
    }
    return INPUT_LAYOUT[id];
  };

  const getOutputRect = (id: WorkflowOutputId) => {
    if (mobile) {
      return OUTPUT_LAYOUT_MOBILE[id as keyof typeof OUTPUT_LAYOUT_MOBILE];
    }
    return OUTPUT_LAYOUT[id];
  };

  const pausedClass =
    !sectionActive || reduceMotion ? " is-paused" : "";

  return (
    <div
      ref={rootRef}
      className={`ai-hero__system ai-hero__system--${density}${pausedClass}${assembled || reduceMotion ? " is-assembled" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label="AI orchestration diagram: fragmented manual inputs flow into an AI core and emerge as automated unified outputs"
    >
      <div className="ai-hero__system-glow" aria-hidden="true" />

      {/* Column headings */}
      {!mobile && (
        <>
          <p
            className="ai-hero__col-label ai-hero__col-label--in"
            style={{ left: pct(10, view.w), top: pct(12, view.h) }}
          >
            Manual &amp; Fragmented
          </p>
          <p
            className="ai-hero__col-label ai-hero__col-label--out"
            style={{
              left: pct(788, view.w),
              top: pct(12, view.h),
              width: pct(188, view.w),
            }}
          >
            Automated &amp; Unified
          </p>
        </>
      )}

      {/* SVG connectors + core */}
      <svg
        className="ai-hero__svg"
        viewBox={`0 0 ${view.w} ${view.h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ai-core-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.28)" />
            <stop offset="55%" stopColor="rgba(37,99,235,0.08)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
        </defs>

        <motion.g style={allowParallax ? { x: orbitX, y: orbitY } : undefined}>
          {/* Ambient base routes + progressive travel overlays */}
          {routeList.map((r) => {
              const isActiveIn =
                illuminateIn === r.id && !reduceMotion;
              const isActiveOut =
                illuminateOut === r.outboundTarget && !reduceMotion;
              const hoverIn =
                hoveredInput === r.id && !isActiveIn && !reduceMotion;
              const hoverOut =
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
                      stroke="#60A5FA"
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
                      stroke="#3B82F6"
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
            style={allowParallax ? { x: panelX, y: panelY } : undefined}
          >
            <AICore
              cx={core.x}
              cy={core.y}
              pulse={corePulse || reduceMotion}
              activeStage={
                reduceMotion ? "learn" : activeStage
              }
              assembled={assembled || reduceMotion}
              reduceMotion={reduceMotion}
              orbitsAlive={sectionActive && assembled}
              compact={compact}
            />
          </motion.g>

          {signal && !reduceMotion && (
            <AISignal
              key={signal.key}
              pathD={signal.pathD}
              duration={signal.duration}
              kind={signal.kind}
            />
          )}
        </motion.g>
      </svg>

      {/* HTML nodes overlaid on topology */}
      <motion.div
        className="ai-hero__nodes ai-hero__nodes--in"
        style={allowParallax ? { x: inputX, y: inputY } : undefined}
      >
        {inputs.map((node) => {
          const rect = getInputRect(node.id);
          if (!rect) return null;
          const active = activeInput === node.id && phase !== "idle";
          const related =
            hoveredInput === node.id ||
            (hoveredOutput != null &&
              routes.find((r) => r.outboundTarget === hoveredOutput)?.id ===
                node.id);
          return (
            <WorkflowNode
              key={node.id}
              kind="input"
              title={node.title}
              subtitle={node.subtitle}
              icon={node.icon}
              active={active || (!!reduceMotion && node.id === "emails")}
              related={related && !active}
              style={{
                left: pct(
                  rect.x + (tablet || mobile ? 0 : node.stagger * 0.4),
                  view.w,
                ),
                top: pct(rect.y, view.h),
                width: pct(rect.w, view.w),
                height: pct(rect.h, view.h),
              }}
              onHover={(on) => onInputHover(on ? node.id : null)}
            />
          );
        })}
      </motion.div>

      <div className="ai-hero__nodes ai-hero__nodes--out">
        {outputs.map((node) => {
          const rect = getOutputRect(node.id);
          if (!rect) return null;
          const active =
            (activeOutput === node.id &&
              (phase === "outbound" || phase === "settle")) ||
            (!!reduceMotion && node.id === "responses");
          const related = hoveredOutput === node.id;
          return (
            <WorkflowNode
              key={node.id}
              kind="output"
              title={node.title}
              subtitle={node.subtitle}
              icon={node.icon}
              active={active}
              related={related && !active}
              settled={active}
              style={{
                left: pct(rect.x, view.w),
                top: pct(rect.y, view.h),
                width: pct(rect.w, view.w),
                height: pct(rect.h, view.h),
              }}
              onHover={(on) => onOutputHover(on ? node.id : null)}
            />
          );
        })}
      </div>
    </div>
  );
}
