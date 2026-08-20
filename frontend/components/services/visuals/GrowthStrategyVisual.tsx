"use client";

type GrowthStrategyVisualProps = {
  active?: boolean;
};

export default function GrowthStrategyVisual({
  active = false,
}: GrowthStrategyVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--growth${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--growth .service-visual__orbit {
          transform-origin: 160px 100px;
        }
        .service-visual--growth.is-active .service-visual__orbit--slow {
          animation: sv-growth-spin 28s linear infinite;
        }
        .service-visual--growth.is-active .service-visual__orbit--fast {
          animation: sv-growth-spin 18s linear infinite reverse;
        }
        .service-visual--growth.is-active .service-visual__pulse {
          animation: sv-growth-pulse 2.4s ease-in-out infinite;
        }
        .service-visual--growth.is-active .service-visual__node {
          animation: sv-growth-node 2.8s ease-in-out infinite;
        }
        @keyframes sv-growth-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sv-growth-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
        @keyframes sv-growth-node {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--growth.is-active .service-visual__orbit--slow,
          .service-visual--growth.is-active .service-visual__orbit--fast,
          .service-visual--growth.is-active .service-visual__pulse,
          .service-visual--growth.is-active .service-visual__node {
            animation: none;
          }
        }
      `}</style>

      {/* Concentric radar rings */}
      <g className="service-visual__orbits" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <circle cx="160" cy="100" r="28" />
        <circle className="service-visual__orbit service-visual__orbit--fast service-visual__pulse" cx="160" cy="100" r="48" stroke="rgba(255,255,255,0.28)" />
        <circle className="service-visual__orbit service-visual__orbit--slow" cx="160" cy="100" r="72" strokeDasharray="3 5" />
        <circle cx="160" cy="100" r="96" stroke="rgba(255,255,255,0.12)" />
      </g>

      {/* Crosshair guides */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
        <line x1="160" y1="22" x2="160" y2="178" />
        <line x1="48" y1="100" x2="272" y2="100" />
      </g>

      {/* Central node */}
      <g className="service-visual__core">
        <circle className="service-visual__pulse" cx="160" cy="100" r="14" fill="#BFDBFE" fillOpacity="0.25" stroke="rgba(255,255,255,0.55)" strokeWidth="1.25" />
        <circle cx="160" cy="100" r="5" fill="#93C5FD" />
      </g>

      {/* Satellite nodes */}
      <g className="service-visual__satellites" fontFamily="var(--font-geist), system-ui, sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.72)">
        {/* Market Insights — top */}
        <g className="service-visual__node" transform="translate(160 28)">
          <circle r="5.5" fill="#60A5FA" fillOpacity="0.55" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <text textAnchor="middle" y="-10">Market Insights</text>
        </g>
        {/* Positioning — right */}
        <g className="service-visual__node" transform="translate(256 100)" style={{ animationDelay: "0.4s" }}>
          <circle r="5.5" fill="#93C5FD" fillOpacity="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <text textAnchor="start" x="10" y="3">Positioning</text>
        </g>
        {/* Opportunity Mapping — bottom */}
        <g className="service-visual__node" transform="translate(160 172)" style={{ animationDelay: "0.8s" }}>
          <circle r="5.5" fill="#BFDBFE" fillOpacity="0.55" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <text textAnchor="middle" y="16">Opportunity Mapping</text>
        </g>
        {/* Growth Model — left */}
        <g className="service-visual__node" transform="translate(64 100)" style={{ animationDelay: "1.2s" }}>
          <circle r="5.5" fill="#60A5FA" fillOpacity="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <text textAnchor="end" x="-10" y="3">Growth Model</text>
        </g>
      </g>
    </svg>
  );
}
