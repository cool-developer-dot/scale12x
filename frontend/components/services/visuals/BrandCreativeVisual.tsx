"use client";

type BrandCreativeVisualProps = {
  active?: boolean;
};

export default function BrandCreativeVisual({
  active = false,
}: BrandCreativeVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--brand${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--brand.is-active .service-visual__arc {
          animation: sv-brand-arc 4s ease-in-out infinite;
        }
        .service-visual--brand.is-active .service-visual__spark {
          animation: sv-brand-spark 2.2s ease-in-out infinite;
        }
        .service-visual--brand.is-active .service-visual__letter {
          animation: sv-brand-letter 3.5s ease-in-out infinite;
        }
        .service-visual--brand.is-active .service-visual__tick {
          animation: sv-brand-tick 2.8s ease-in-out infinite;
        }
        @keyframes sv-brand-arc {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }
        @keyframes sv-brand-spark {
          0%, 100% { opacity: 0.4; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes sv-brand-letter {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
        @keyframes sv-brand-tick {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--brand.is-active .service-visual__arc,
          .service-visual--brand.is-active .service-visual__spark,
          .service-visual--brand.is-active .service-visual__letter,
          .service-visual--brand.is-active .service-visual__tick {
            animation: none;
          }
        }
      `}</style>

      {/* Large faint brand A */}
      <text
        className="service-visual__letter"
        x="140"
        y="128"
        textAnchor="middle"
        fontFamily="var(--font-geist), system-ui, sans-serif"
        fontSize="120"
        fill="#BFDBFE"
        fillOpacity="0.16"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.75"
      >
        A
      </text>

      {/* Overlapping circles / arcs */}
      <g className="service-visual__arcs" strokeWidth="1.25" fill="none">
        <circle className="service-visual__arc" cx="118" cy="88" r="42" stroke="rgba(255,255,255,0.28)" />
        <circle className="service-visual__arc" cx="162" cy="92" r="38" stroke="#93C5FD" strokeOpacity="0.35" style={{ animationDelay: "0.4s" }} />
        <path
          className="service-visual__arc"
          d="M78 118 A54 54 0 0 1 168 48"
          stroke="rgba(255,255,255,0.4)"
          style={{ animationDelay: "0.8s" }}
        />
        <path
          className="service-visual__arc"
          d="M108 148 A48 48 0 0 0 208 96"
          stroke="#60A5FA"
          strokeOpacity="0.4"
          style={{ animationDelay: "1.2s" }}
        />
      </g>

      {/* Sparks / stars */}
      <g className="service-visual__sparks" fill="#93C5FD">
        <path
          className="service-visual__spark"
          d="M214 42 L217 50 L225 53 L217 56 L214 64 L211 56 L203 53 L211 50 Z"
          fillOpacity="0.75"
          style={{ transformOrigin: "214px 53px" }}
        />
        <path
          className="service-visual__spark"
          d="M58 56 L60 61 L65 63 L60 65 L58 70 L56 65 L51 63 L56 61 Z"
          fillOpacity="0.55"
          style={{ animationDelay: "0.5s", transformOrigin: "58px 63px" }}
        />
        <path
          className="service-visual__spark"
          d="M232 128 L234 132 L238 134 L234 136 L232 140 L230 136 L226 134 L230 132 Z"
          fill="#60A5FA"
          fillOpacity="0.65"
          style={{ animationDelay: "1s", transformOrigin: "232px 134px" }}
        />
      </g>

      {/* Construction ticks */}
      <g className="service-visual__ticks" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
        <line className="service-visual__tick" x1="42" y1="36" x2="42" y2="48" />
        <line className="service-visual__tick" x1="36" y1="42" x2="48" y2="42" />
        <line className="service-visual__tick" x1="238" y1="152" x2="238" y2="164" style={{ animationDelay: "0.3s" }} />
        <line className="service-visual__tick" x1="232" y1="158" x2="244" y2="158" style={{ animationDelay: "0.3s" }} />
        <line className="service-visual__tick" x1="196" y1="28" x2="216" y2="28" style={{ animationDelay: "0.6s" }} />
        <line className="service-visual__tick" x1="64" y1="150" x2="84" y2="150" style={{ animationDelay: "0.9s" }} />
      </g>
    </svg>
  );
}
