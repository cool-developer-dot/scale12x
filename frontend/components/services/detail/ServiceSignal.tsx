"use client";

type Props = {
  pathD: string;
  duration?: number;
  kind?: "inbound" | "outbound";
  /** Brand/neutral mode uses softer white-cobalt mix */
  neutral?: boolean;
};

export default function ServiceSignal({
  pathD,
  duration = 0.8,
  kind = "inbound",
  neutral = false,
}: Props) {
  const outbound = kind === "outbound";
  const coreR = outbound ? 2.4 : 2.2;
  const midR = outbound ? 4 : 3.6;
  const glowR = outbound ? 6.2 : 5.6;
  const midFill = neutral
    ? outbound
      ? "rgba(226,232,240,0.85)"
      : "rgba(148,163,184,0.9)"
    : outbound
      ? "#3B82F6"
      : "#60A5FA";

  const motionProps = {
    dur: `${duration}s`,
    fill: "freeze" as const,
    path: pathD,
    keyPoints: "0;1",
    keyTimes: "0;1",
    calcMode: "spline" as const,
    keySplines: "0.25 0.1 0.25 1",
  };

  return (
    <g className="ai-hero__signal" aria-hidden="true">
      <circle r={glowR} fill="rgba(59, 130, 246, 0.22)">
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values="0;0.7;0.7;0.2;0"
          keyTimes="0;0.06;0.78;0.92;1"
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
      <circle r={midR} fill={midFill}>
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values="0;0.95;0.9;0.35;0"
          keyTimes="0;0.05;0.8;0.92;1"
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
      <circle r={coreR} fill="#F8FAFC">
        <animateMotion {...motionProps} />
        <animate
          attributeName="opacity"
          values="0;1;1;0.5;0"
          keyTimes="0;0.05;0.8;0.92;1"
          dur={`${duration}s`}
          fill="freeze"
        />
      </circle>
    </g>
  );
}
