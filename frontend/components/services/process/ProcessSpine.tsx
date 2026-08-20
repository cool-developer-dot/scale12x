"use client";

import { SPINE, SPINE_V } from "./data";
import type { SignalLeg } from "./useProcessSequence";

type ProcessSpineProps = {
  activeIndex: number;
  illuminateTo: number;
  signal: SignalLeg | null;
  vertical: boolean;
  reduceMotion: boolean;
  drawn: boolean;
};

function nodeX(i: number) {
  if (i <= 0) return SPINE.nodes[0];
  if (i >= SPINE.nodes.length) return SPINE.endX;
  return SPINE.nodes[i];
}

function nodeY(i: number) {
  if (i <= 0) return SPINE_V.nodes[0];
  if (i >= SPINE_V.nodes.length) return SPINE_V.endY;
  return SPINE_V.nodes[i];
}

/** Continuous operating pathway + traveling signal (SVG motion, no frame state). */
export default function ProcessSpine({
  activeIndex,
  illuminateTo,
  signal,
  vertical,
  reduceMotion,
  drawn,
}: ProcessSpineProps) {
  if (vertical) {
    return (
      <VerticalSpine
        activeIndex={activeIndex}
        illuminateTo={illuminateTo}
        signal={signal}
        reduceMotion={reduceMotion}
        drawn={drawn}
      />
    );
  }

  const y = SPINE.y;
  const pathD = `M ${SPINE.startX} ${y} H ${SPINE.endX}`;
  const illumEnd = nodeX(
    Math.min(illuminateTo, SPINE.nodes.length - 1),
  );
  // Soft traveling window behind the active region
  const illumStart = Math.max(
    SPINE.startX,
    nodeX(Math.max(0, activeIndex)) - 40,
  );

  const sigFrom = signal ? nodeX(signal.from) : SPINE.startX;
  const sigTo = signal
    ? signal.to >= SPINE.nodes.length
      ? SPINE.endX
      : nodeX(signal.to)
    : sigFrom;
  const sigPath = `M ${sigFrom} ${y} H ${sigTo}`;

  return (
    <svg
      className="services-process__spine"
      viewBox={`0 0 ${SPINE.w} ${SPINE.h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* Base path */}
      <path
        d={pathD}
        stroke="rgba(110,130,160,0.30)"
        strokeWidth="1"
        strokeLinecap="round"
        className={drawn ? "is-drawn" : undefined}
      />

      {/* Illuminated energy segment */}
      {!reduceMotion && drawn && (
        <path
          d={`M ${illumStart} ${y} H ${Math.max(illumStart + 8, illumEnd)}`}
          stroke="#3B82F6"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
          style={{ transition: "d 0.55s ease, opacity 0.4s ease" }}
        />
      )}

      {reduceMotion && drawn && (
        <path
          d={`M ${SPINE.startX} ${y} H ${SPINE.nodes[3]}`}
          stroke="#2563EB"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      )}

      {/* Nodes */}
      {SPINE.nodes.map((x, i) => {
        const lit = i <= activeIndex || (reduceMotion && drawn);
        const primary = i === activeIndex || (reduceMotion && i === 3);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {primary && !reduceMotion && (
              <circle r="11" fill="rgba(37,99,235,0.16)" />
            )}
            <circle
              r={primary ? 8 : 7}
              fill="rgba(8,14,28,0.9)"
              stroke={
                lit ? (primary ? "#3B82F6" : "rgba(100,130,180,0.55)") : "rgba(100,120,150,0.35)"
              }
              strokeWidth="1.15"
            />
            <circle
              r={primary ? 3.4 : 2.6}
              fill={primary ? "#E8F1FF" : lit ? "rgba(220,230,245,0.75)" : "rgba(140,149,165,0.45)"}
            />
            {primary && <circle r="1.3" fill="#2563EB" />}
          </g>
        );
      })}

      {/* Traveling signal */}
      {signal && !reduceMotion && drawn && (
        <g key={signal.key}>
          <circle r="7" fill="rgba(59,130,246,0.22)">
            <animateMotion
              dur={`${signal.duration}s`}
              fill="freeze"
              path={sigPath}
              calcMode="spline"
              keySplines="0.25 0.1 0.25 1"
              keyTimes="0;1"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.08;0.88;1"
              dur={`${signal.duration}s`}
              fill="freeze"
            />
          </circle>
          <circle r="3.6" fill="#E8F1FF">
            <animateMotion
              dur={`${signal.duration}s`}
              fill="freeze"
              path={sigPath}
              calcMode="spline"
              keySplines="0.25 0.1 0.25 1"
              keyTimes="0;1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.06;0.9;1"
              dur={`${signal.duration}s`}
              fill="freeze"
            />
          </circle>
        </g>
      )}
    </svg>
  );
}

function VerticalSpine({
  activeIndex,
  illuminateTo,
  signal,
  reduceMotion,
  drawn,
}: Omit<ProcessSpineProps, "vertical">) {
  const x = SPINE_V.x;
  const pathD = `M ${x} ${SPINE_V.startY} V ${SPINE_V.endY}`;
  const illumEnd = nodeY(Math.min(illuminateTo, SPINE_V.nodes.length - 1));
  const illumStart = Math.max(
    SPINE_V.startY,
    nodeY(Math.max(0, activeIndex)) - 30,
  );

  const sigFrom = signal ? nodeY(signal.from) : SPINE_V.startY;
  const sigTo = signal
    ? signal.to >= SPINE_V.nodes.length
      ? SPINE_V.endY
      : nodeY(signal.to)
    : sigFrom;
  const sigPath = `M ${x} ${sigFrom} V ${sigTo}`;

  return (
    <svg
      className="services-process__spine services-process__spine--vertical"
      viewBox={`0 0 ${SPINE_V.w} ${SPINE_V.h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={pathD}
        stroke="rgba(110,130,160,0.30)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {!reduceMotion && drawn && (
        <path
          d={`M ${x} ${illumStart} V ${Math.max(illumStart + 8, illumEnd)}`}
          stroke="#3B82F6"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      )}

      {SPINE_V.nodes.map((ny, i) => {
        const primary = i === activeIndex || (reduceMotion && drawn);
        const lit = i <= activeIndex || reduceMotion;
        return (
          <g key={i} transform={`translate(${x} ${ny})`}>
            {primary && !reduceMotion && (
              <circle r="10" fill="rgba(37,99,235,0.16)" />
            )}
            <circle
              r={primary ? 7.5 : 6.5}
              fill="rgba(8,14,28,0.9)"
              stroke={primary ? "#3B82F6" : "rgba(100,120,150,0.4)"}
              strokeWidth="1.1"
            />
            <circle
              r={primary ? 3.2 : 2.4}
              fill={primary ? "#E8F1FF" : lit ? "rgba(220,230,245,0.7)" : "rgba(140,149,165,0.4)"}
            />
          </g>
        );
      })}

      {signal && !reduceMotion && drawn && (
        <g key={signal.key}>
          <circle r="6.5" fill="rgba(59,130,246,0.22)">
            <animateMotion
              dur={`${signal.duration}s`}
              fill="freeze"
              path={sigPath}
              calcMode="spline"
              keySplines="0.25 0.1 0.25 1"
              keyTimes="0;1"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.08;0.88;1"
              dur={`${signal.duration}s`}
              fill="freeze"
            />
          </circle>
          <circle r="3.2" fill="#E8F1FF">
            <animateMotion
              dur={`${signal.duration}s`}
              fill="freeze"
              path={sigPath}
              calcMode="spline"
              keySplines="0.25 0.1 0.25 1"
              keyTimes="0;1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.06;0.9;1"
              dur={`${signal.duration}s`}
              fill="freeze"
            />
          </circle>
        </g>
      )}
    </svg>
  );
}
