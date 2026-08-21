import type { ServiceIcon } from "./data";

type ServiceCardIconProps = {
  name: ServiceIcon;
};

/** Minimal circular badge icons — decorative */
export default function ServiceCardIcon({ name }: ServiceCardIconProps) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "orbit":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "chip":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path
            d="M8 18h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 8 18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3.5 19 6.5v5.2c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6.5L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 11.6 11.1 13.5 14.8 9.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "window":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="0.8" fill="currentColor" />
          <circle cx="9.5" cy="7" r="0.8" fill="currentColor" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
