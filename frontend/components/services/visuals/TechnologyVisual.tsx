"use client";

type TechnologyVisualProps = {
  active?: boolean;
};

export default function TechnologyVisual({
  active = false,
}: TechnologyVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`service-visual service-visual--technology${active ? " is-active" : ""}`}
    >
      <style>{`
        .service-visual--technology.is-active .service-visual__glow {
          animation: sv-tech-glow 2.8s ease-in-out infinite;
        }
        .service-visual--technology.is-active .service-visual__path {
          stroke-dasharray: 4 6;
          animation: sv-tech-dash 1.8s linear infinite;
        }
        .service-visual--technology.is-active .service-visual__module {
          animation: sv-tech-mod 2.4s ease-in-out infinite;
        }
        .service-visual--technology.is-active .service-visual__rack {
          animation: sv-tech-rack 3s ease-in-out infinite;
        }
        @keyframes sv-tech-glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        @keyframes sv-tech-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes sv-tech-mod {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes sv-tech-rack {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-visual--technology.is-active .service-visual__glow,
          .service-visual--technology.is-active .service-visual__path,
          .service-visual--technology.is-active .service-visual__module,
          .service-visual--technology.is-active .service-visual__rack {
            animation: none;
          }
        }
      `}</style>

      {/* Left server racks */}
      <g className="service-visual__racks" transform="translate(28 48)">
        <g className="service-visual__rack">
          <rect width="36" height="104" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" />
          <rect x="6" y="10" width="24" height="8" rx="1" fill="#93C5FD" fillOpacity="0.45" />
          <rect x="6" y="26" width="24" height="8" rx="1" fill="rgba(255,255,255,0.18)" />
          <rect x="6" y="42" width="24" height="8" rx="1" fill="#60A5FA" fillOpacity="0.35" />
          <rect x="6" y="58" width="24" height="8" rx="1" fill="rgba(255,255,255,0.18)" />
          <rect x="6" y="74" width="24" height="8" rx="1" fill="#BFDBFE" fillOpacity="0.4" />
        </g>
        <g className="service-visual__rack" transform="translate(48 12)" style={{ animationDelay: "0.4s" }}>
          <rect width="30" height="92" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          <rect x="5" y="10" width="20" height="7" rx="1" fill="rgba(255,255,255,0.2)" />
          <rect x="5" y="24" width="20" height="7" rx="1" fill="#93C5FD" fillOpacity="0.4" />
          <rect x="5" y="38" width="20" height="7" rx="1" fill="rgba(255,255,255,0.16)" />
          <rect x="5" y="52" width="20" height="7" rx="1" fill="#60A5FA" fillOpacity="0.35" />
        </g>
      </g>

      {/* Connecting paths */}
      <g className="service-visual__paths" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
        <path className="service-visual__path" d="M112 100 H138" />
        <path className="service-visual__path" d="M182 100 H208" style={{ animationDelay: "0.3s" }} />
        <path className="service-visual__path" d="M160 72 V48" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* Center cloud */}
      <g className="service-visual__cloud" transform="translate(160 100)">
        <ellipse className="service-visual__glow" cx="0" cy="4" rx="38" ry="26" fill="#93C5FD" fillOpacity="0.12" />
        <path
          d="M-28 8c-8 0-14-6-14-13s6-13 14-13c2-10 12-16 22-14 6-8 18-8 24-1 10-2 18 6 16 15 8 1 14 8 12 15H-28z"
          fill="#BFDBFE"
          fillOpacity="0.1"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.25"
        />
        <circle cx="0" cy="2" r="4" fill="#60A5FA" fillOpacity="0.7" />
      </g>

      {/* Right 3x3 module grid */}
      <g className="service-visual__grid" transform="translate(216 58)">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              className="service-visual__module"
              x={col * 26}
              y={row * 26}
              width="20"
              height="20"
              rx="3"
              fill={col === 1 && row === 1 ? "#60A5FA" : "rgba(255,255,255,0.05)"}
              fillOpacity={col === 1 && row === 1 ? 0.35 : 1}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              style={{ animationDelay: `${(row * 3 + col) * 0.12}s` }}
            />
          )),
        )}
      </g>
    </svg>
  );
}
