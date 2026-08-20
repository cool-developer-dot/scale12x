"use client";

type AIAutomationVisualProps = {
  active?: boolean;
};

export default function AIAutomationVisual({
  active = false,
}: AIAutomationVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--ai${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--ai.is-active .service-visual__stream-dot {
          animation: sv-ai-flow 2.2s linear infinite;
        }
        .service-visual--ai.is-active .service-visual__bar {
          animation: sv-ai-bar 2.6s ease-in-out infinite;
          transform-origin: center bottom;
          transform-box: fill-box;
        }
        .service-visual--ai.is-active .service-visual__hex {
          animation: sv-ai-hex 3.2s ease-in-out infinite;
        }
        .service-visual--ai.is-active .service-visual__chip {
          animation: sv-ai-chip 2.8s ease-in-out infinite;
        }
        @keyframes sv-ai-flow {
          0% { opacity: 0.15; }
          40% { opacity: 1; }
          100% { opacity: 0.15; }
        }
        @keyframes sv-ai-bar {
          0%, 100% { transform: scaleY(0.88); }
          50% { transform: scaleY(1); }
        }
        @keyframes sv-ai-hex {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes sv-ai-chip {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--ai.is-active .service-visual__stream-dot,
          .service-visual--ai.is-active .service-visual__bar,
          .service-visual--ai.is-active .service-visual__hex,
          .service-visual--ai.is-active .service-visual__chip {
            animation: none;
          }
        }
      `}</style>

      {/* Left data stream */}
      <g className="service-visual__stream" stroke="rgba(255,255,255,0.28)" strokeWidth="1">
        <line x1="28" y1="48" x2="118" y2="92" />
        <line x1="28" y1="78" x2="118" y2="108" />
        <line x1="28" y1="108" x2="118" y2="124" />
        <line x1="28" y1="138" x2="118" y2="140" />
        <g fill="#93C5FD">
          <circle className="service-visual__stream-dot" cx="42" cy="54" r="2.2" />
          <circle className="service-visual__stream-dot" cx="58" cy="72" r="2" style={{ animationDelay: "0.3s" }} />
          <circle className="service-visual__stream-dot" cx="48" cy="98" r="2.2" style={{ animationDelay: "0.55s" }} />
          <circle className="service-visual__stream-dot" cx="72" cy="118" r="1.8" style={{ animationDelay: "0.8s" }} />
          <circle className="service-visual__stream-dot" cx="54" cy="136" r="2" style={{ animationDelay: "1.05s" }} />
          <circle className="service-visual__stream-dot" cx="90" cy="128" r="2.2" style={{ animationDelay: "1.3s" }} />
        </g>
      </g>

      {/* Featured hex center */}
      <g className="service-visual__hex" transform="translate(180 110)">
        <polygon
          points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21"
          fill="#BFDBFE"
          fillOpacity="0.14"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.4"
        />
        <polygon
          points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
          fill="#60A5FA"
          fillOpacity="0.28"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
        />
        <circle r="5" fill="#93C5FD" />
      </g>

      {/* Right bar chart */}
      <g className="service-visual__chart" transform="translate(248 52)">
        <line x1="0" y1="100" x2="88" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect className="service-visual__bar" x="8" y="58" width="12" height="42" rx="2" fill="#93C5FD" fillOpacity="0.45" />
        <rect className="service-visual__bar" x="28" y="38" width="12" height="62" rx="2" fill="#60A5FA" fillOpacity="0.5" style={{ animationDelay: "0.2s" }} />
        <rect className="service-visual__bar" x="48" y="48" width="12" height="52" rx="2" fill="#BFDBFE" fillOpacity="0.4" style={{ animationDelay: "0.4s" }} />
        <rect className="service-visual__bar" x="68" y="22" width="12" height="78" rx="2" fill="#60A5FA" fillOpacity="0.6" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* Chips */}
      <g
        className="service-visual__chips"
        fontFamily="var(--font-geist), system-ui, sans-serif"
        fontSize="8"
        letterSpacing="0.08em"
        fill="rgba(255,255,255,0.7)"
      >
        {[
          { label: "PREDICT", x: 48 },
          { label: "AUTOMATE", x: 118 },
          { label: "OPTIMIZE", x: 198 },
          { label: "SCALE", x: 278 },
        ].map((chip, i) => (
          <g
            key={chip.label}
            className="service-visual__chip"
            transform={`translate(${chip.x} 188)`}
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            <rect x="-28" y="-10" width="56" height="20" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <text textAnchor="middle" y="3.5">{chip.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
