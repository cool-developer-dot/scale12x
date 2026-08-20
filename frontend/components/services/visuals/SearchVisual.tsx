"use client";

type SearchVisualProps = {
  active?: boolean;
};

export default function SearchVisual({ active = false }: SearchVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--search${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--search .service-visual__orbit {
          transform-origin: 140px 90px;
        }
        .service-visual--search.is-active .service-visual__orbit--spin {
          animation: sv-search-spin 22s linear infinite;
        }
        .service-visual--search.is-active .service-visual__ring {
          animation: sv-search-ring 2.8s ease-in-out infinite;
        }
        .service-visual--search.is-active .service-visual__glass {
          animation: sv-search-glass 3s ease-in-out infinite;
        }
        .service-visual--search.is-active .service-visual__node {
          animation: sv-search-node 2.6s ease-in-out infinite;
        }
        @keyframes sv-search-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sv-search-ring {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.65; }
        }
        @keyframes sv-search-glass {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes sv-search-node {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--search.is-active .service-visual__orbit--spin,
          .service-visual--search.is-active .service-visual__ring,
          .service-visual--search.is-active .service-visual__glass,
          .service-visual--search.is-active .service-visual__node {
            animation: none;
          }
        }
      `}</style>

      {/* Concentric rings */}
      <g className="service-visual__rings" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
        <circle className="service-visual__ring" cx="140" cy="90" r="28" />
        <circle className="service-visual__ring" cx="140" cy="90" r="48" stroke="rgba(255,255,255,0.28)" style={{ animationDelay: "0.4s" }} />
        <circle className="service-visual__orbit service-visual__orbit--spin" cx="140" cy="90" r="68" strokeDasharray="2 6" stroke="rgba(255,255,255,0.22)" />
      </g>

      {/* Magnifying glass */}
      <g className="service-visual__glass" transform="translate(140 90)">
        <circle
          r="22"
          fill="#BFDBFE"
          fillOpacity="0.1"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <circle r="8" fill="#93C5FD" fillOpacity="0.35" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <line
          x1="16"
          y1="16"
          x2="30"
          y2="30"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Orbit nodes with labels */}
      <g
        className="service-visual__satellites"
        fontFamily="var(--font-geist), system-ui, sans-serif"
        fontSize="7"
        letterSpacing="0.06em"
        fill="rgba(255,255,255,0.7)"
      >
        <g className="service-visual__node" transform="translate(140 22)">
          <circle r="4.5" fill="#60A5FA" fillOpacity="0.55" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
          <text textAnchor="middle" y="-9">SEARCH</text>
        </g>
        <g className="service-visual__node" transform="translate(208 90)" style={{ animationDelay: "0.4s" }}>
          <circle r="4.5" fill="#93C5FD" fillOpacity="0.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
          <text textAnchor="start" x="9" y="3">AUTHORITY</text>
        </g>
        <g className="service-visual__node" transform="translate(140 158)" style={{ animationDelay: "0.8s" }}>
          <circle r="4.5" fill="#BFDBFE" fillOpacity="0.55" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
          <text textAnchor="middle" y="14">DISCOVERY</text>
        </g>
        <g className="service-visual__node" transform="translate(72 90)" style={{ animationDelay: "1.2s" }}>
          <circle r="4.5" fill="#60A5FA" fillOpacity="0.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
          <text textAnchor="end" x="-9" y="3">AI ANSWERS</text>
        </g>
      </g>
    </svg>
  );
}
