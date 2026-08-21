"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/** SYSTEM BLOOM — premium radial reveal from the 12x core. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGE = 420;
const CX = STAGE / 2;
const CY = STAGE / 2;
const RADIUS = 138;

const NODES = [
  { id: "security", label: "Security", angle: -18, icon: "security" as const },
  { id: "automation", label: "Automation", angle: 54, icon: "automation" as const },
  { id: "ai", label: "AI", angle: -90, icon: "ai" as const },
  { id: "data", label: "Data", angle: 126, icon: "data" as const },
  { id: "cloud", label: "Cloud", angle: 198, icon: "cloud" as const },
] as const;

type NodeId = (typeof NODES)[number]["id"];

/** Stagger delays (seconds) — intentionally tight for one bloom event. */
const NODE_DELAY: Record<NodeId, number> = {
  security: 0.28,
  automation: 0.34,
  ai: 0.4,
  data: 0.46,
  cloud: 0.52,
};

const PLATFORMS = [
  { id: "aws", name: "AWS", src: "/logos/aws.svg" },
  { id: "openai", name: "OpenAI", src: "/logos/openai.svg" },
  { id: "hubspot", name: "HubSpot", src: "/logos/hubspot.svg" },
  { id: "meta", name: "Meta", src: "/logos/meta.svg" },
  { id: "webflow", name: "Webflow", src: "/logos/webflow.svg" },
  { id: "ga", name: "Google Analytics", src: "/logos/google-analytics.svg" },
] as const;

const PLATFORM_START = 0.68;
const PLATFORM_STAGGER = 0.08;

function nodePoint(angle: number, radius = RADIUS) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function circleLen(r: number) {
  return 2 * Math.PI * r;
}

function NodeIcon({ type }: { type: (typeof NODES)[number]["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (type) {
    case "ai":
      return (
        <svg {...common}>
          <path
            d="M12 3 13.8 9.2 20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "security":
      return (
        <svg {...common}>
          <path
            d="M12 3.5 19 6.2v5c0 4.4-3 8.2-7 9.3-4-1.1-7-4.9-7-9.3v-5L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 11.8 11.2 13.5 14.8 9.8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "automation":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 5v2M12 17v2M5 12h2M17 12h2M7.05 7.05l1.4 1.4M15.55 15.55l1.4 1.4M7.05 16.95l1.4-1.4M15.55 8.45l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "data":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="7" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path
            d="M7.5 17h8.2a3.2 3.2 0 0 0 .35-6.38A4.5 4.5 0 0 0 7.4 9.4 3.2 3.2 0 0 0 7.5 17Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Premium systems hub — decorative only.
 * SYSTEM BLOOM orchestrates a one-shot radial reveal from the 12x core.
 */
export default function HeroSystemsDiagram() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [orbitPx, setOrbitPx] = useState(RADIUS);
  const [settled, setSettled] = useState(false);
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [signalId, setSignalId] = useState<NodeId | null>(null);
  const bloomStarted = useRef(false);
  const signalLock = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const syncOrbit = () => {
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;
      setOrbitPx(RADIUS * (width / STAGE));
    };

    syncOrbit();
    const ro = new ResizeObserver(syncOrbit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setSettled(true);
      return;
    }
    if (bloomStarted.current) return;
    bloomStarted.current = true;
    const t = window.setTimeout(() => setSettled(true), 1250);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  const fromFactor = isMobile ? 0.42 : 0.1;
  const cardDuration = isMobile ? 0.48 : 0.58;
  const ringDuration = isMobile ? 0.48 : 0.55;

  const easeTransition = useCallback(
    (delay: number, duration: number): Transition => ({
      delay,
      duration,
      ease: EASE,
    }),
    [],
  );

  const onNodeEnter = useCallback(
    (id: NodeId) => {
      if (!settled || reduceMotion) return;
      setHovered(id);
      if (signalLock.current) return;
      signalLock.current = true;
      setSignalId(id);
      window.setTimeout(() => {
        setSignalId(null);
        signalLock.current = false;
      }, 520);
    },
    [settled, reduceMotion],
  );

  const onNodeLeave = useCallback(() => {
    setHovered(null);
  }, []);

  const rInner = 78;
  const rMid = 118;
  const rOuter = 158;
  const lenInner = circleLen(rInner);
  const lenMid = circleLen(rMid);
  const lenOuter = circleLen(rOuter);

  const skip = !!reduceMotion;

  return (
    <div
      className={`hero-diagram${settled ? " is-settled" : ""}${skip ? " is-reduced" : " is-blooming"}`}
      aria-hidden="true"
      data-bloom={settled || skip ? "done" : "running"}
    >
      <div ref={stageRef} className="hero-diagram__stage">
        <div className="hero-diagram__glow" />

        <svg className="hero-diagram__rings" viewBox={`0 0 ${STAGE} ${STAGE}`} fill="none">
          <motion.circle
            cx={CX}
            cy={CY}
            r={rInner}
            className="hero-diagram__ring"
            initial={skip ? false : { strokeDashoffset: lenInner, opacity: 0.35 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={easeTransition(0.18, ringDuration)}
            style={{ strokeDasharray: lenInner }}
          />
          <motion.circle
            cx={CX}
            cy={CY}
            r={rMid}
            className="hero-diagram__ring hero-diagram__ring--mid"
            initial={skip ? false : { strokeDashoffset: lenMid, opacity: 0.35 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={easeTransition(0.24, ringDuration + 0.05)}
            style={{ strokeDasharray: lenMid }}
          />
          <motion.circle
            cx={CX}
            cy={CY}
            r={rOuter}
            className="hero-diagram__ring hero-diagram__ring--outer"
            initial={skip ? false : { strokeDashoffset: lenOuter * 0.85, opacity: 0.4 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={easeTransition(0.3, ringDuration + 0.1)}
            style={{ strokeDasharray: "4 8" }}
          />

          {NODES.map((node) => {
            const { x, y } = nodePoint(node.angle);
            const x2 = CX + x;
            const y2 = CY + y;
            const len = Math.hypot(x, y);
            const delay = NODE_DELAY[node.id];
            const active = hovered === node.id;

            return (
              <g key={`line-${node.id}`}>
                <motion.line
                  x1={CX}
                  y1={CY}
                  x2={x2}
                  y2={y2}
                  className={`hero-diagram__connector${active ? " is-active" : ""}`}
                  initial={skip ? false : { strokeDashoffset: len, opacity: 0 }}
                  animate={{
                    strokeDashoffset: 0,
                    opacity: 1,
                  }}
                  transition={easeTransition(delay + 0.04, isMobile ? 0.38 : 0.42)}
                  style={{
                    strokeDasharray: settled || skip ? undefined : `${len}`,
                  }}
                  vectorEffect="non-scaling-stroke"
                />
                <motion.circle
                  cx={x2}
                  cy={y2}
                  r={3}
                  className={`hero-diagram__connector-dot${active ? " is-active" : ""}`}
                  initial={skip ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={easeTransition(delay + 0.22, 0.22)}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {signalId === node.id && (
                  <motion.circle
                    r={2.5}
                    className="hero-diagram__signal"
                    initial={{ cx: CX, cy: CY, opacity: 0.95 }}
                    animate={{ cx: x2, cy: y2, opacity: [0.95, 1, 0] }}
                    transition={{ duration: 0.48, ease: EASE }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="hero-diagram__core">
          <motion.div
            className="hero-diagram__core-hex"
            initial={skip ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={easeTransition(0, 0.22)}
          >
            <span className="hero-diagram__core-mark">12x</span>
          </motion.div>
        </div>

        {NODES.map((node) => {
          const { x, y } = nodePoint(node.angle, orbitPx);
          const delay = NODE_DELAY[node.id];
          const xFrom = x * fromFactor;
          const yFrom = y * fromFactor;

          return (
            <motion.div
              key={node.id}
              className="hero-diagram__node"
              style={
                {
                  ["--node-x"]: `${x}px`,
                  ["--node-y"]: `${y}px`,
                  ["--node-delay"]: `${delay}s`,
                } as CSSProperties
              }
              initial={
                skip
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.85,
                      x: `calc(-50% + ${xFrom}px)`,
                      y: `calc(-50% + ${yFrom}px)`,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y}px)`,
              }}
              transition={easeTransition(delay, cardDuration)}
              onMouseEnter={() => onNodeEnter(node.id)}
              onMouseLeave={onNodeLeave}
            >
              <div className="hero-diagram__node-shell">
                <motion.span
                  className={`hero-diagram__node-icon hero-diagram__node-icon--${node.id}`}
                  initial={skip ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={easeTransition(delay + 0.1, 0.28)}
                >
                  <NodeIcon type={node.icon} />
                </motion.span>
                <motion.span
                  className="hero-diagram__node-label"
                  initial={skip ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={easeTransition(delay + 0.14, 0.28)}
                >
                  {node.label}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ul className="hero-diagram__platforms">
        {PLATFORMS.map((p, i) => (
          <motion.li
            key={p.id}
            className="hero-diagram__platform"
            initial={
              skip ? false : { opacity: 0, x: -10, y: 4, scale: 0.96 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={easeTransition(PLATFORM_START + i * PLATFORM_STAGGER, 0.32)}
          >
            <Image src={p.src} alt="" width={32} height={32} />
            <span className="sr-only">{p.name}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
