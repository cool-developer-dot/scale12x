"use client";

type MotifProps = {
  active: boolean;
  reduceMotion: boolean;
};

/** 01 — Diagnose: radar rings + bottleneck node + subtle sweep */
export function DiagnoseMotif({ active, reduceMotion }: MotifProps) {
  return (
    <svg
      className={`process-motif process-motif--diagnose${active ? " is-active" : ""}`}
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="100" cy="78" r="54" stroke="rgba(100,120,150,0.18)" strokeWidth="0.8" />
      <circle cx="100" cy="78" r="36" stroke="rgba(100,120,150,0.22)" strokeWidth="0.8" />
      <circle cx="100" cy="78" r="18" stroke="rgba(100,120,150,0.28)" strokeWidth="0.85" />

      {/* Sweep arc */}
      <g
        className={
          active && !reduceMotion
            ? "process-motif__sweep"
            : undefined
        }
        style={{ transformOrigin: "100px 78px" }}
      >
        <path
          d="M 100 78 L 100 24 A 54 54 0 0 1 148 48 Z"
          fill="rgba(37,99,235,0.06)"
          stroke="rgba(59,130,246,0.35)"
          strokeWidth="0.7"
        />
      </g>

      {/* Peripheral nodes */}
      <circle cx="62" cy="48" r="2.2" fill="rgba(140,149,165,0.55)" />
      <circle cx="138" cy="52" r="2.2" fill="rgba(140,149,165,0.55)" />
      <circle cx="148" cy="98" r="2" fill="rgba(140,149,165,0.45)" />
      <circle cx="70" cy="110" r="2" fill="rgba(140,149,165,0.45)" />

      {/* Bottleneck highlight */}
      <circle
        cx="128"
        cy="64"
        r={active ? 3.4 : 2.6}
        fill={active ? "#3B82F6" : "rgba(37,99,235,0.55)"}
        className={active && !reduceMotion ? "process-motif__pulse" : undefined}
      />
      <line
        x1="128"
        y1="64"
        x2="100"
        y2="78"
        stroke={active ? "rgba(59,130,246,0.65)" : "rgba(100,120,150,0.3)"}
        strokeWidth="0.85"
      />

      <circle cx="100" cy="78" r="3.2" fill={active ? "#E8F1FF" : "rgba(220,230,245,0.7)"} />
      <circle cx="100" cy="78" r="1.4" fill={active ? "#2563EB" : "rgba(37,99,235,0.5)"} />
    </svg>
  );
}

/** 02 — Architect: connected system blocks + blueprint route */
export function ArchitectMotif({ active, reduceMotion }: MotifProps) {
  return (
    <svg
      className={`process-motif process-motif--architect${active ? " is-active" : ""}`}
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
    >
      {/* Blocks */}
      {[
        { x: 36, y: 36, w: 38, h: 22 },
        { x: 92, y: 28, w: 42, h: 26 },
        { x: 150, y: 40, w: 28, h: 20 },
        { x: 48, y: 78, w: 34, h: 24 },
        { x: 106, y: 74, w: 48, h: 30 },
        { x: 72, y: 118, w: 56, h: 18 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="2"
          fill="rgba(8,14,28,0.55)"
          stroke={
            active && i === 4
              ? "#3B82F6"
              : "rgba(120,140,170,0.35)"
          }
          strokeWidth={active && i === 4 ? 1.15 : 0.85}
          className={
            active && !reduceMotion
              ? `process-motif__block process-motif__block--${i}`
              : undefined
          }
        />
      ))}

      {/* Connecting paths */}
      <path
        d="M 74 47 H 92 M 134 41 H 150 M 82 90 H 106 M 130 104 V 118"
        stroke="rgba(100,120,150,0.35)"
        strokeWidth="0.8"
      />
      <path
        d="M 55 58 V 78 M 130 58 V 74"
        stroke={active ? "rgba(59,130,246,0.55)" : "rgba(100,120,150,0.28)"}
        strokeWidth="0.85"
        strokeDasharray="2 3"
      />

      {/* Primary blueprint route */}
      <path
        d="M 55 47 C 70 60, 90 68, 106 89"
        stroke={active ? "#2563EB" : "rgba(100,120,150,0.25)"}
        strokeWidth={active ? 1.25 : 0.85}
        strokeLinecap="round"
        className={active && !reduceMotion ? "process-motif__route" : undefined}
      />

      <circle cx="130" cy="89" r="2.4" fill={active ? "#E8F1FF" : "rgba(220,230,245,0.55)"} />
    </svg>
  );
}

/** 03 — Execute: progress bars + completion check */
export function ExecuteMotif({ active, reduceMotion }: MotifProps) {
  return (
    <svg
      className={`process-motif process-motif--execute${active ? " is-active" : ""}`}
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
    >
      {/* Track frames */}
      {[42, 72, 102].map((y, i) => (
        <g key={y}>
          <rect
            x="36"
            y={y}
            width="128"
            height="14"
            rx="2"
            fill="rgba(8,14,28,0.5)"
            stroke="rgba(100,120,150,0.28)"
            strokeWidth="0.8"
          />
          <rect
            x="36"
            y={y}
            width={i === 0 ? 98 : i === 1 ? 72 : 48}
            height="14"
            rx="2"
            fill={
              active
                ? i === 0
                  ? "rgba(37,99,235,0.45)"
                  : "rgba(37,99,235,0.28)"
                : "rgba(100,120,150,0.18)"
            }
            className={
              active && !reduceMotion
                ? `process-motif__bar process-motif__bar--${i}`
                : undefined
            }
          />
          <circle
            cx="178"
            cy={y + 7}
            r="3"
            fill="none"
            stroke={
              active && i === 0
                ? "#3B82F6"
                : "rgba(100,120,150,0.4)"
            }
            strokeWidth="0.9"
          />
          {active && i === 0 && (
            <path
              d="M 176 49 L 178 51.5 L 181.5 47"
              stroke="#E8F1FF"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
      ))}

      {/* Output markers */}
      <circle cx="48" cy="132" r="2" fill={active ? "#3B82F6" : "rgba(140,149,165,0.45)"} />
      <circle cx="64" cy="132" r="2" fill="rgba(140,149,165,0.4)" />
      <circle cx="80" cy="132" r="2" fill="rgba(140,149,165,0.35)" />
      <line
        x1="96"
        y1="132"
        x2="128"
        y2="132"
        stroke="rgba(100,120,150,0.3)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/** 04 — Scale: orbital rings + outward growth nodes */
export function ScaleMotif({ active, reduceMotion }: MotifProps) {
  return (
    <svg
      className={`process-motif process-motif--scale${active ? " is-active" : ""}`}
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="100"
        cy="82"
        rx="62"
        ry="38"
        stroke="rgba(100,120,150,0.2)"
        strokeWidth="0.75"
        className={active && !reduceMotion ? "process-motif__orbit process-motif__orbit--a" : undefined}
        style={{ transformOrigin: "100px 82px" }}
      />
      <ellipse
        cx="100"
        cy="82"
        rx="44"
        ry="26"
        stroke="rgba(100,120,150,0.28)"
        strokeWidth="0.8"
        className={active && !reduceMotion ? "process-motif__orbit process-motif__orbit--b" : undefined}
        style={{ transformOrigin: "100px 82px" }}
      />
      <ellipse
        cx="100"
        cy="82"
        rx="26"
        ry="14"
        stroke={active ? "rgba(59,130,246,0.45)" : "rgba(100,120,150,0.32)"}
        strokeWidth="0.9"
      />

      {/* Growth trajectory */}
      <path
        d="M 100 82 C 118 70, 136 52, 152 34"
        stroke={active ? "#2563EB" : "rgba(100,120,150,0.28)"}
        strokeWidth={active ? 1.15 : 0.8}
        strokeLinecap="round"
        strokeDasharray="2.5 4"
      />

      <circle cx="100" cy="82" r="3.4" fill={active ? "#2563EB" : "rgba(37,99,235,0.45)"} />
      <circle cx="100" cy="82" r="1.4" fill="#E8F1FF" />

      <circle
        cx="152"
        cy="34"
        r={active ? 3.2 : 2.4}
        fill={active ? "#3B82F6" : "rgba(140,149,165,0.5)"}
        className={active && !reduceMotion ? "process-motif__drift" : undefined}
      />
      <circle cx="148" cy="88" r="2" fill="rgba(140,149,165,0.45)" />
      <circle cx="58" cy="70" r="2" fill="rgba(140,149,165,0.4)" />
      <circle cx="72" cy="108" r="1.8" fill="rgba(140,149,165,0.35)" />
    </svg>
  );
}
