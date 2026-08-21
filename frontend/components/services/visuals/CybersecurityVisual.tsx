"use client";

type CybersecurityVisualProps = {
  active?: boolean;
};

export default function CybersecurityVisual({
  active = false,
}: CybersecurityVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--cyber${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--cyber.is-active .service-visual__dot {
          animation: sv-cyber-dot 2.6s ease-in-out infinite;
        }
        .service-visual--cyber.is-active .service-visual__check {
          animation: sv-cyber-check 3.2s ease-in-out infinite;
        }
        .service-visual--cyber.is-active .service-visual__gate {
          animation: sv-cyber-gate 3.2s ease-in-out infinite;
        }
        @keyframes sv-cyber-dot {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
        }
        @keyframes sv-cyber-check {
          0%, 40% { opacity: 0.35; }
          55%, 75% { opacity: 1; }
          100% { opacity: 0.35; }
        }
        @keyframes sv-cyber-gate {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--cyber.is-active .service-visual__dot,
          .service-visual--cyber.is-active .service-visual__check,
          .service-visual--cyber.is-active .service-visual__gate {
            animation: none;
          }
        }
      `}</style>

      {/* Inbound traffic */}
      {[70, 100, 130, 160, 190].map((x, i) => (
        <circle
          key={x}
          className="service-visual__dot"
          cx={x}
          cy="34"
          r="2.6"
          fill="#93C5FD"
          fillOpacity="0.7"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}

      {/* Shield */}
      <path
        d="M140 52 L178 68 L178 104 C178 128 140 146 140 146 C140 146 102 128 102 104 L102 68 Z"
        fill="rgba(147,197,253,0.1)"
        stroke="#93C5FD"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <path
        className="service-visual__check"
        d="M126 100 L136 110 L156 88"
        stroke="#BFDBFE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Gates */}
      {[
        { x: 70, label: "VERIFY" },
        { x: 140, label: "SCAN" },
        { x: 210, label: "PROTECT" },
      ].map((gate, i) => (
        <g key={gate.label} className="service-visual__gate" style={{ animationDelay: `${0.2 + i * 0.2}s` }}>
          <line x1="140" y1="146" x2={gate.x} y2="158" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <rect x={gate.x - 28} y="158" width="56" height="18" rx="5" fill="rgba(15,23,42,0.35)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          <text
            x={gate.x}
            y="170"
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize="6.5"
            letterSpacing="0.08em"
            fill="rgba(255,255,255,0.75)"
          >
            {gate.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
