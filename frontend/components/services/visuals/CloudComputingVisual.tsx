"use client";

type CloudComputingVisualProps = {
  active?: boolean;
};

export default function CloudComputingVisual({
  active = false,
}: CloudComputingVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--cloud${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--cloud.is-active .service-visual__link {
          animation: sv-cloud-link 3.6s ease-in-out infinite;
        }
        .service-visual--cloud.is-active .service-visual__node {
          animation: sv-cloud-node 3.6s ease-in-out infinite;
        }
        .service-visual--cloud.is-active .service-visual__pulse {
          animation: sv-cloud-pulse 2.8s ease-in-out infinite;
        }
        @keyframes sv-cloud-link {
          0%, 100% { opacity: 0.28; }
          45%, 60% { opacity: 0.85; }
        }
        @keyframes sv-cloud-node {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        @keyframes sv-cloud-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--cloud.is-active .service-visual__link,
          .service-visual--cloud.is-active .service-visual__node,
          .service-visual--cloud.is-active .service-visual__pulse {
            animation: none;
          }
        }
      `}</style>

      {/* Cloud outline */}
      <path
        d="M92 78c0-18 14-32 32-32 10 0 19 4 25 11a28 28 0 0 1 41 24c0 1 0 3-.2 4H92.4A20 20 0 0 1 92 78Z"
        fill="rgba(147,197,253,0.12)"
        stroke="#93C5FD"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <text
        x="140"
        y="78"
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontSize="8"
        letterSpacing="0.14em"
        fill="rgba(255,255,255,0.7)"
      >
        CLOUD
      </text>

      {/* Links */}
      <g stroke="#60A5FA" strokeWidth="1.25" fill="none">
        <path className="service-visual__link" d="M118 96 L78 132" strokeOpacity="0.55" />
        <path className="service-visual__link" d="M140 98 L140 132" strokeOpacity="0.55" style={{ animationDelay: "0.25s" }} />
        <path className="service-visual__link" d="M162 96 L202 132" strokeOpacity="0.55" style={{ animationDelay: "0.5s" }} />
      </g>

      <circle className="service-visual__pulse" cx="100" cy="112" r="2.2" fill="#93C5FD" />
      <circle className="service-visual__pulse" cx="140" cy="116" r="2.2" fill="#93C5FD" style={{ animationDelay: "0.35s" }} />
      <circle className="service-visual__pulse" cx="180" cy="112" r="2.2" fill="#93C5FD" style={{ animationDelay: "0.7s" }} />

      {/* Nodes */}
      {[
        { x: 78, label: "APP" },
        { x: 140, label: "DB" },
        { x: 202, label: "STORAGE" },
      ].map((node, i) => (
        <g key={node.label} className="service-visual__node" style={{ animationDelay: `${0.2 + i * 0.2}s` }}>
          <rect x={node.x - 28} y="132" width="56" height="22" rx="6" fill="rgba(15,23,42,0.35)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          <text
            x={node.x}
            y="146"
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize="7"
            letterSpacing="0.08em"
            fill="rgba(255,255,255,0.78)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
