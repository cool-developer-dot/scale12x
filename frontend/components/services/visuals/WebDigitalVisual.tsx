"use client";

type WebDigitalVisualProps = {
  active?: boolean;
};

export default function WebDigitalVisual({
  active = false,
}: WebDigitalVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--web${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--web.is-active .service-visual__panel--main {
          animation: sv-web-float 3.2s ease-in-out infinite;
        }
        .service-visual--web.is-active .service-visual__panel--sm {
          animation: sv-web-float 2.8s ease-in-out infinite;
        }
        .service-visual--web.is-active .service-visual__chrome-dot {
          animation: sv-web-blink 2.4s ease-in-out infinite;
        }
        @keyframes sv-web-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes sv-web-blink {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--web.is-active .service-visual__panel--main,
          .service-visual--web.is-active .service-visual__panel--sm,
          .service-visual--web.is-active .service-visual__chrome-dot {
            animation: none;
          }
        }
      `}</style>

      {/* Main desktop panel */}
      <g className="service-visual__panel service-visual__panel--main" transform="translate(48 36)">
        <rect
          width="168"
          height="112"
          rx="6"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
        />
        {/* Chrome bar */}
        <rect width="168" height="18" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect y="12" width="168" height="6" fill="rgba(255,255,255,0.08)" />
        <circle className="service-visual__chrome-dot" cx="12" cy="9" r="2.2" fill="#93C5FD" fillOpacity="0.7" />
        <circle className="service-visual__chrome-dot" cx="22" cy="9" r="2.2" fill="#60A5FA" fillOpacity="0.55" style={{ animationDelay: "0.3s" }} />
        <circle className="service-visual__chrome-dot" cx="32" cy="9" r="2.2" fill="rgba(255,255,255,0.35)" style={{ animationDelay: "0.6s" }} />
        <rect x="48" y="5" width="72" height="8" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        {/* Abstract UI */}
        <rect x="14" y="30" width="52" height="8" rx="2" fill="#BFDBFE" fillOpacity="0.35" />
        <rect x="14" y="46" width="70" height="5" rx="1.5" fill="rgba(255,255,255,0.18)" />
        <rect x="14" y="56" width="58" height="5" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="14" y="74" width="40" height="22" rx="3" fill="#60A5FA" fillOpacity="0.25" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        <rect x="62" y="74" width="40" height="22" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <rect x="110" y="30" width="42" height="66" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        <rect x="118" y="40" width="26" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="118" y="50" width="26" height="4" rx="1" fill="#93C5FD" fillOpacity="0.4" />
        <rect x="118" y="60" width="20" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
      </g>

      {/* Smaller floating window — top right */}
      <g className="service-visual__panel service-visual__panel--sm" transform="translate(188 24)" style={{ animationDelay: "0.4s" }}>
        <rect
          width="72"
          height="54"
          rx="4"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.38)"
          strokeWidth="1"
        />
        <rect width="72" height="12" rx="4" fill="rgba(255,255,255,0.1)" />
        <rect y="8" width="72" height="4" fill="rgba(255,255,255,0.1)" />
        <circle cx="8" cy="6" r="1.8" fill="#93C5FD" fillOpacity="0.6" />
        <rect x="10" y="22" width="36" height="4" rx="1" fill="rgba(255,255,255,0.22)" />
        <rect x="10" y="32" width="48" height="12" rx="2" fill="#60A5FA" fillOpacity="0.28" />
      </g>

      {/* Smaller floating window — bottom right */}
      <g className="service-visual__panel service-visual__panel--sm" transform="translate(176 108)" style={{ animationDelay: "0.8s" }}>
        <rect
          width="80"
          height="48"
          rx="4"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
        <rect width="80" height="11" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect y="7" width="80" height="4" fill="rgba(255,255,255,0.08)" />
        <circle cx="8" cy="5.5" r="1.6" fill="#BFDBFE" fillOpacity="0.55" />
        <rect x="10" y="20" width="24" height="18" rx="2" fill="#93C5FD" fillOpacity="0.25" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
        <rect x="40" y="22" width="28" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="40" y="30" width="22" height="3" rx="1" fill="rgba(255,255,255,0.14)" />
      </g>
    </svg>
  );
}
