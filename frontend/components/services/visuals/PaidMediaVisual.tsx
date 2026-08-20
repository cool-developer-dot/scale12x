"use client";

type PaidMediaVisualProps = {
  active?: boolean;
};

export default function PaidMediaVisual({
  active = false,
}: PaidMediaVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--paid${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--paid.is-active .service-visual__dot {
          animation: sv-paid-dot 2.4s ease-in-out infinite;
        }
        .service-visual--paid.is-active .service-visual__chart-line {
          stroke-dasharray: 180;
          stroke-dashoffset: 180;
          animation: sv-paid-draw 1.6s ease forwards;
        }
        .service-visual--paid.is-active .service-visual__pulse {
          animation: sv-paid-pulse 2s ease-in-out infinite;
        }
        @keyframes sv-paid-dot {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes sv-paid-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sv-paid-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--paid.is-active .service-visual__dot,
          .service-visual--paid.is-active .service-visual__chart-line,
          .service-visual--paid.is-active .service-visual__pulse {
            animation: none;
            stroke-dasharray: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Funnel of dots */}
      <g className="service-visual__funnel" fill="#93C5FD">
        {/* Wide top row */}
        {[40, 58, 76, 94, 112, 130].map((x, i) => (
          <circle
            key={`t-${x}`}
            className="service-visual__dot"
            cx={x}
            cy="36"
            r="3"
            fillOpacity="0.55"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
        {[48, 66, 84, 102, 120].map((x, i) => (
          <circle
            key={`m1-${x}`}
            className="service-visual__dot"
            cx={x}
            cy="56"
            r="2.8"
            fill="#60A5FA"
            fillOpacity="0.5"
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          />
        ))}
        {[58, 76, 94, 112].map((x, i) => (
          <circle
            key={`m2-${x}`}
            className="service-visual__dot"
            cx={x}
            cy="76"
            r="2.6"
            fill="#BFDBFE"
            fillOpacity="0.55"
            style={{ animationDelay: `${0.4 + i * 0.08}s` }}
          />
        ))}
        {[68, 86, 104].map((x, i) => (
          <circle
            key={`b-${x}`}
            className="service-visual__dot"
            cx={x}
            cy="96"
            r="2.5"
            fill="#60A5FA"
            fillOpacity="0.6"
            style={{ animationDelay: `${0.6 + i * 0.08}s` }}
          />
        ))}
        <circle className="service-visual__dot service-visual__pulse" cx="86" cy="116" r="3.2" fill="#93C5FD" fillOpacity="0.8" />
      </g>

      {/* Funnel outline guides */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none">
        <path d="M32 28 L78 122 L94 122 L140 28" />
      </g>

      {/* Line chart */}
      <g className="service-visual__chart" transform="translate(158 40)">
        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="0" y1="20" x2="0" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path
          className="service-visual__chart-line"
          d="M8 82 L28 68 L48 74 L68 42 L88 28"
          stroke="#60A5FA"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="service-visual__pulse" cx="88" cy="28" r="3.5" fill="#93C5FD" />
        <g fontFamily="var(--font-geist), system-ui, sans-serif" fontSize="8" fill="rgba(255,255,255,0.65)">
          <text x="8" y="14">CPA</text>
          <text x="62" y="18">ROAS</text>
        </g>
      </g>
    </svg>
  );
}
