import type { WorkflowIcon } from "./data";

type WorkflowIconMarkProps = {
  name: WorkflowIcon;
  className?: string;
};

/** Thin stroke marks — decorative, currentColor. */
export default function WorkflowIconMark({
  name,
  className,
}: WorkflowIconMarkProps) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className,
  };

  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "sheet":
      return (
        <svg {...common}>
          <rect x="4" y="3.5" width="16" height="17" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 9h16M4 14h16M10 9v11.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path
            d="M5 6.5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4.5 3v-3H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "report":
      return (
        <svg {...common}>
          <path d="M7 3.5h7.5L19 8v12.5a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20.5v-15A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M14 3.5V8h5M8.5 13h7M8.5 16.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "approval":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8.5 12.2 11 14.7 15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 6.5v11c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-11" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <circle cx="6.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="17.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="12" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <path d="M8.5 8.2 10.4 14.4M15.5 8.2 13.6 14.4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "response":
      return (
        <svg {...common}>
          <path d="M4.5 8h10.5l4.5 4.5V18a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M7 13h7M7 16h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "insight":
      return (
        <svg {...common}>
          <path d="M5 17.5 10 10l3.5 4.5L19 6.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 6.5H19V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sync":
      return (
        <svg {...common}>
          <path d="M19 8.5A7 7 0 0 0 7.2 6.4M5 15.5A7 7 0 0 0 16.8 17.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M19 4.5v4h-4M5 19.5v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "check-route":
      return (
        <svg {...common}>
          <path d="M4 12h6l2-3 3 6 2-3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...common}>
          <rect x="3.5" y="8" width="5" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
          <rect x="9.5" y="6" width="5" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
          <rect x="15.5" y="9" width="5" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
        </svg>
      );
    default:
      return null;
  }
}
