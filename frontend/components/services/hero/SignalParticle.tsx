"use client";

type SignalParticleProps = {
  pathD: string;
  duration?: number;
  reversed?: boolean;
  kind?: "primary" | "secondary";
};

/**
 * Precision cobalt-white signal — SVG motion path, no React frames.
 * White center ~2.5px, cobalt outer ~4px, soft local glow only.
 */
export default function SignalParticle({
  pathD,
  duration = 1.2,
  reversed = false,
  kind = "primary",
}: SignalParticleProps) {
  const isSecondary = kind === "secondary";
  const coreR = isSecondary ? 1.8 : 2.5;
  const midR = isSecondary ? 3.2 : 4.2;
  const glowR = isSecondary ? 5 : 6.5;
  const keyPoints = reversed ? "1;0" : "0;1";

  const motionProps = {
    dur: `${duration}s`,
    fill: "freeze" as const,
    path: pathD,
    keyPoints,
    keyTimes: "0;1",
    calcMode: "spline" as const,
    keySplines: "0.25 0.1 0.25 1",
  };

  return (
    <g className="services-hero__signal" opacity={isSecondary ? 0.4 : 1}>
      <circle r={glowR} fill="rgba(59, 130, 246, 0.22)">
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values={isSecondary ? "0;0.4;0.4;0" : "0;0.75;0.75;0.25;0"}
          keyTimes={isSecondary ? "0;0.08;0.85;1" : "0;0.06;0.78;0.92;1"}
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
      <circle r={midR} fill="#3B82F6">
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values={isSecondary ? "0;0.55;0.55;0" : "0;0.9;0.9;0.4;0"}
          keyTimes={isSecondary ? "0;0.08;0.85;1" : "0;0.05;0.8;0.92;1"}
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
      <circle r={coreR} fill="#F5F5F2">
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values={isSecondary ? "0;0.65;0.65;0" : "0;1;1;0.55;0"}
          keyTimes={isSecondary ? "0;0.08;0.85;1" : "0;0.05;0.8;0.92;1"}
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
    </g>
  );
}
