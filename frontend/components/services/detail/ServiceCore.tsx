"use client";

import { motion } from "framer-motion";
import type { CoreVariant, ServiceProcessStage } from "./types";

type Props = {
  cx: number;
  cy: number;
  pulse: boolean;
  activeStage: string | null;
  assembled: boolean;
  reduceMotion: boolean;
  orbitsAlive: boolean;
  compact?: boolean;
  stacked?: boolean;
  coreLabel: string;
  coreTitle: string;
  stages: ServiceProcessStage[];
  variant: CoreVariant;
  neutral?: boolean;
};

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  }).join(" ");
}

function CoreGeometry({
  cx,
  cy,
  r,
  pulse,
  variant,
  neutral,
}: {
  cx: number;
  cy: number;
  r: number;
  pulse: boolean;
  variant: CoreVariant;
  neutral?: boolean;
}) {
  const stroke = pulse
    ? neutral
      ? "rgba(226,232,240,0.88)"
      : "rgba(147,197,253,0.88)"
    : neutral
      ? "rgba(148,163,184,0.55)"
      : "rgba(96,165,250,0.58)";
  const fill = neutral ? "rgba(148,163,184,0.12)" : "rgba(37,99,235,0.16)";
  const fillInner = neutral ? "rgba(148,163,184,0.2)" : "rgba(37,99,235,0.28)";

  if (variant === "technology") {
    return (
      <>
        <rect x={cx - r} y={cy - r * 0.7} width={r * 2} height={r * 0.4} rx="2" fill={fill} stroke={stroke} strokeWidth="1.1" />
        <rect x={cx - r * 0.85} y={cy - r * 0.2} width={r * 1.7} height={r * 0.4} rx="2" fill={fillInner} stroke={stroke} strokeWidth="1" />
        <rect x={cx - r * 0.7} y={cy + r * 0.3} width={r * 1.4} height={r * 0.35} rx="2" fill={fill} stroke={stroke} strokeWidth="0.9" />
        <circle cx={cx} cy={cy} r={2.8} fill={neutral ? "#E2E8F0" : "#2563EB"} />
      </>
    );
  }

  if (variant === "brand") {
    const g = r * 0.55;
    return (
      <>
        <rect x={cx - g} y={cy - g} width={g * 2} height={g * 2} fill={fill} stroke={stroke} strokeWidth="1.1" />
        <line x1={cx} y1={cy - g} x2={cx} y2={cy + g} stroke={stroke} strokeWidth="0.8" />
        <line x1={cx - g} y1={cy} x2={cx + g} y2={cy} stroke={stroke} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={2.6} fill="#F8FAFC" />
      </>
    );
  }

  if (variant === "media") {
    return (
      <>
        <path d={`M ${cx - r} ${cy} L ${cx} ${cy - r * 0.85} L ${cx + r} ${cy} L ${cx} ${cy + r * 0.55} Z`} fill={fill} stroke={stroke} strokeWidth="1.1" />
        <path d={`M ${cx - r * 0.55} ${cy} L ${cx} ${cy - r * 0.45} L ${cx + r * 0.55} ${cy}`} fill="none" stroke={stroke} strokeWidth="0.9" />
        <circle cx={cx} cy={cy} r={2.8} fill="#2563EB" />
      </>
    );
  }

  if (variant === "web") {
    return (
      <>
        <rect x={cx - r} y={cy - r * 0.75} width={r * 2} height={r * 1.5} rx="3" fill={fill} stroke={stroke} strokeWidth="1.1" />
        <path d={`M ${cx - r} ${cy - r * 0.4} H ${cx + r}`} stroke={stroke} strokeWidth="0.85" />
        <rect x={cx - r * 0.7} y={cy - r * 0.15} width={r * 1.4} height={r * 0.7} rx="2" fill={fillInner} stroke={stroke} strokeWidth="0.85" />
        <circle cx={cx - r * 0.7} cy={cy - r * 0.55} r="1.2" fill="#F8FAFC" opacity="0.7" />
      </>
    );
  }

  if (variant === "search") {
    return (
      <>
        <circle cx={cx} cy={cy} r={r * 0.35} fill={fillInner} stroke={stroke} strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const a = (Math.PI / 180) * deg;
          return (
            <g key={deg}>
              <line
                x1={cx + Math.cos(a) * r * 0.4}
                y1={cy + Math.sin(a) * r * 0.4}
                x2={cx + Math.cos(a) * r * 0.9}
                y2={cy + Math.sin(a) * r * 0.9}
                stroke={stroke}
                strokeWidth="0.75"
              />
              <circle
                cx={cx + Math.cos(a) * r * 0.95}
                cy={cy + Math.sin(a) * r * 0.95}
                r="2"
                fill="none"
                stroke={stroke}
                strokeWidth="0.9"
              />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={2.4} fill="#F8FAFC" />
      </>
    );
  }

  if (variant === "growth") {
    return (
      <>
        <polygon
          points={`${cx},${cy - r} ${cx + r * 0.75},${cy} ${cx},${cy + r} ${cx - r * 0.75},${cy}`}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.15"
        />
        <polygon
          points={`${cx},${cy - r * 0.5} ${cx + r * 0.4},${cy} ${cx},${cy + r * 0.5} ${cx - r * 0.4},${cy}`}
          fill={fillInner}
          stroke="rgba(226,232,240,0.45)"
          strokeWidth="0.9"
        />
        <circle cx={cx} cy={cy} r={2.8} fill="#2563EB" />
        <circle cx={cx} cy={cy} r={1.2} fill="#F8FAFC" />
      </>
    );
  }

  return (
    <>
      <polygon points={hexPoints(cx, cy, r)} fill={fill} stroke={stroke} strokeWidth="1.15" />
      <polygon
        points={hexPoints(cx, cy, r * 0.58)}
        fill={fillInner}
        stroke="rgba(226,232,240,0.45)"
        strokeWidth="0.9"
      />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 180) * (60 * i - 90);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * r * 0.92}
            y2={cy + Math.sin(a) * r * 0.92}
            stroke="rgba(96,165,250,0.35)"
            strokeWidth="0.65"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={3.2} fill="#2563EB" />
      <circle cx={cx} cy={cy} r={1.4} fill="#F8FAFC" />
    </>
  );
}

export default function ServiceCore({
  cx,
  cy,
  pulse,
  activeStage,
  assembled,
  reduceMotion,
  orbitsAlive,
  compact = false,
  stacked = false,
  coreLabel,
  coreTitle,
  stages,
  variant,
  neutral = false,
}: Props) {
  const scale = stacked ? 0.78 : compact ? 0.86 : 1;
  const chamberW = (stacked ? 220 : 336) * scale;
  const chamberH = (stacked ? 260 : 520) * scale;
  const chamberX = cx - chamberW / 2;
  const chamberY = cy - (stacked ? 118 : 168) * scale;

  const rOuter = 86 * scale;
  const rMid = 62 * scale;
  const rInner = 38 * scale;
  const showStages = !stacked;
  const visibleStages = showStages ? stages : [];
  const stackTop = cy + rInner + 36 * scale;
  const stackGap = compact ? 20 : 22;
  const stageIndex = Object.fromEntries(
    stages.map((s, i) => [s.id, i]),
  ) as Record<string, number>;

  const ringStroke = neutral
    ? "rgba(148,163,184,0.35)"
    : "rgba(59,130,246,0.3)";
  const activeRing = neutral
    ? "rgba(226,232,240,0.7)"
    : "rgba(59,130,246,0.48)";
  const activeRingPulse = neutral
    ? "rgba(248,250,252,0.85)"
    : "rgba(96,165,250,0.78)";
  const edgeBlue = neutral
    ? "rgba(148,163,184,0.22)"
    : "rgba(59,130,246,0.22)";

  return (
    <g className="ai-hero__core-group">
      {/* Soft chamber glow — restrained */}
      <motion.ellipse
        cx={cx}
        cy={cy + 8 * scale}
        rx={chamberW * 0.42}
        ry={chamberH * 0.38}
        fill="url(#svc-core-glow)"
        animate={{ opacity: pulse ? 0.85 : 0.5 }}
        transition={{ duration: 0.35 }}
      />

      {/* Nested chamber borders */}
      <rect
        x={chamberX - 6}
        y={chamberY - 6}
        width={chamberW + 12}
        height={chamberH + 12}
        rx={32 * scale}
        fill="none"
        stroke={edgeBlue}
        strokeWidth="0.75"
        opacity="0.55"
      />
      <rect
        x={chamberX}
        y={chamberY}
        width={chamberW}
        height={chamberH}
        rx={28 * scale}
        fill="rgba(5,11,20,0.55)"
        stroke="rgba(148,163,184,0.2)"
        strokeWidth="1.1"
      />
      <rect
        x={chamberX + 8}
        y={chamberY + 8}
        width={chamberW - 16}
        height={chamberH - 16}
        rx={22 * scale}
        fill="none"
        stroke={neutral ? "rgba(148,163,184,0.1)" : "rgba(59,130,246,0.1)"}
        strokeWidth="0.8"
      />

      {/* Internal alignment grid */}
      <line
        x1={cx}
        y1={chamberY + 28 * scale}
        x2={cx}
        y2={chamberY + chamberH - 36 * scale}
        stroke={neutral ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.1)"}
        strokeWidth="0.7"
        strokeDasharray="2 6"
      />
      <motion.line
        x1={cx}
        y1={chamberY + 28 * scale}
        x2={cx}
        y2={chamberY + chamberH - 36 * scale}
        stroke={neutral ? "rgba(226,232,240,0.35)" : "rgba(96,165,250,0.45)"}
        strokeWidth="1"
        initial={false}
        animate={{ opacity: pulse ? 0.9 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Top label */}
      <text
        x={cx}
        y={chamberY + 28 * scale}
        textAnchor="middle"
        className="ai-hero__core-label"
        fill={neutral ? "#94A3B8" : "#3B82F6"}
        fontSize={stacked ? 7.5 : 9}
        letterSpacing="0.22em"
      >
        {coreLabel}
      </text>

      {/* Orbital rings */}
      <g
        className={
          orbitsAlive && !reduceMotion
            ? "ai-hero__orbit ai-hero__orbit--a"
            : undefined
        }
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          fill="none"
          stroke={ringStroke}
          strokeWidth="0.95"
          strokeDasharray="2.5 8"
        />
      </g>
      <g
        className={
          orbitsAlive && !reduceMotion
            ? "ai-hero__orbit ai-hero__orbit--b"
            : undefined
        }
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx={rMid + 6}
          ry={rMid - 8}
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="0.7"
          strokeDasharray="1.5 7"
        />
      </g>

      <circle
        cx={cx}
        cy={cy}
        r={rMid}
        fill="none"
        stroke="rgba(210,225,245,0.18)"
        strokeWidth="0.9"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rInner + 14}
        fill="none"
        stroke="rgba(148,163,184,0.12)"
        strokeWidth="0.7"
      />

      {/* Radial guides */}
      {[0, 45, 90, 135].map((deg) => {
        const a = (Math.PI / 180) * deg;
        return (
          <line
            key={deg}
            x1={cx + Math.cos(a) * (rInner + 10)}
            y1={cy + Math.sin(a) * (rInner + 10)}
            x2={cx + Math.cos(a) * (rOuter - 6)}
            y2={cy + Math.sin(a) * (rOuter - 6)}
            stroke="rgba(148,163,184,0.12)"
            strokeWidth="0.6"
          />
        );
      })}

      <motion.circle
        cx={cx}
        cy={cy}
        r={rInner + 7}
        fill="none"
        stroke={activeRing}
        strokeWidth="1.05"
        animate={{
          r: pulse ? (rInner + 7) * 1.025 : rInner + 7,
          rotate: pulse ? 3 : 0,
          stroke: pulse ? activeRingPulse : activeRing,
        }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{
          rotate: pulse ? 3 : 0,
          opacity: assembled ? 1 : 0,
          scale: pulse ? 1.02 : 1,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <CoreGeometry
          cx={cx}
          cy={cy}
          r={rInner}
          pulse={pulse}
          variant={variant}
          neutral={neutral}
        />
      </motion.g>

      <text
        x={cx}
        y={cy + rInner + 22 * scale}
        textAnchor="middle"
        fill="rgba(248,250,252,0.94)"
        fontSize={stacked ? 7.5 : 9}
        fontWeight={500}
        letterSpacing="0.16em"
        style={{
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        }}
      >
        {coreTitle}
      </text>

      {/* Process stages */}
      {visibleStages.map((stage, i) => {
        const lit = activeStage === stage.id;
        const passed =
          activeStage != null &&
          (stageIndex[activeStage] ?? -1) >= (stageIndex[stage.id] ?? 0);
        const y = stackTop + i * stackGap;
        return (
          <g key={stage.id} opacity={assembled ? 1 : 0}>
            <circle
              cx={cx - 48 * scale}
              cy={y}
              r={3.2}
              fill={
                lit
                  ? neutral
                    ? "#E2E8F0"
                    : "#3B82F6"
                  : passed
                    ? "rgba(59,130,246,0.45)"
                    : "transparent"
              }
              stroke={
                lit || passed
                  ? "rgba(96,165,250,0.85)"
                  : "rgba(148,163,184,0.35)"
              }
              strokeWidth="1"
            />
            {i < visibleStages.length - 1 && (
              <line
                x1={cx - 48 * scale}
                y1={y + 5}
                x2={cx - 48 * scale}
                y2={y + stackGap - 5}
                stroke="rgba(148,163,184,0.22)"
                strokeWidth="0.75"
              />
            )}
            <text
              x={cx - 34 * scale}
              y={y + 3.5}
              fill={lit ? "#F8FAFC" : passed ? "#94A3B8" : "#64748B"}
              fontSize={compact ? 8.5 : 9.5}
              letterSpacing="0.18em"
              style={{
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                textTransform: "uppercase",
              }}
            >
              {stage.label}
            </text>
          </g>
        );
      })}

      {/* Bottom elliptical platform */}
      <motion.ellipse
        className="ai-hero__platform"
        cx={cx}
        cy={chamberY + chamberH - 18 * scale}
        rx={chamberW * 0.28}
        ry={10 * scale}
        fill="none"
        stroke={neutral ? "rgba(148,163,184,0.28)" : "rgba(59,130,246,0.32)"}
        strokeWidth="1"
        animate={
          reduceMotion || !orbitsAlive
            ? { opacity: 0.5 }
            : { opacity: [0.35, 0.62, 0.35] }
        }
        transition={
          reduceMotion || !orbitsAlive
            ? { duration: 0.3 }
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <ellipse
        cx={cx}
        cy={chamberY + chamberH - 18 * scale}
        rx={chamberW * 0.18}
        ry={5 * scale}
        fill={neutral ? "rgba(148,163,184,0.06)" : "rgba(37,99,235,0.08)"}
      />
    </g>
  );
}
