import type { ServiceIconName } from "./types";

type Props = { name: ServiceIconName; className?: string; size?: number };

/** Thin stroke marks — decorative, currentColor. */
export default function ServiceIconMark({
  name,
  className,
  size = 16,
}: Props) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };

  switch (name) {
    case "mail":
      return (
        <svg {...props}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "sheet":
      return (
        <svg {...props}>
          <rect x="4" y="3.5" width="16" height="17" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 9h16M4 14h16M10 9v11.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "chat":
    case "story":
      return (
        <svg {...props}>
          <path d="M5 6.5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4.5 3v-3H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "report":
    case "content":
    case "guide":
    case "coverage":
      return (
        <svg {...props}>
          <path d="M7 3.5h7.5L19 8v12.5a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20.5v-15A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M14 3.5V8h5M8.5 13h7M8.5 16.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "approval":
    case "convert":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8.5 12.2 11 14.7 15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "database":
    case "data":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 6.5v11c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-11" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "workflow":
    case "ops":
      return (
        <svg {...props}>
          <circle cx="6.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="17.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="12" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.35" />
          <path d="M8.5 8.2 10.4 14.4M15.5 8.2 13.6 14.4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "response":
      return (
        <svg {...props}>
          <path d="M4.5 8h10.5l4.5 4.5V18a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M7 13h7M7 16h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "insight":
    case "measure":
    case "signal":
    case "traffic":
    case "learn":
      return (
        <svg {...props}>
          <path d="M5 17.5 10 10l3.5 4.5L19 6.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 6.5H19V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sync":
    case "api":
      return (
        <svg {...props}>
          <path d="M19 8.5A7 7 0 0 0 7.2 6.4M5 15.5A7 7 0 0 0 16.8 17.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M19 4.5v4h-4M5 19.5v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "check-route":
    case "roadmap":
      return (
        <svg {...props}>
          <path d="M4 12h6l2-3 3 6 2-3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "pipeline":
    case "infra":
    case "architecture":
    case "structure":
      return (
        <svg {...props}>
          <rect x="3.5" y="8" width="5" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
          <rect x="9.5" y="6" width="5" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
          <rect x="15.5" y="9" width="5" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.35" />
        </svg>
      );
    case "users":
    case "audience":
      return (
        <svg {...props}>
          <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3.5 18.5c.8-3 2.8-4.5 5.5-4.5s4.7 1.5 5.5 4.5M14 14c2 .2 3.6 1.3 4.5 4.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    case "target":
    case "position":
    case "competitors":
    case "entity":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "funnel":
    case "constraint":
      return (
        <svg {...props}>
          <path d="M4 5h16l-5.5 7.5V19l-5 2v-8.5L4 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "legacy":
    case "tool":
    case "secure":
      return (
        <svg {...props}>
          <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 9h14M9 4v5M15 4v5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path d="M8 18h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 8 18Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "palette":
    case "identity":
    case "brand":
    case "creative":
    case "campaign":
    case "asset":
      return (
        <svg {...props}>
          <path d="M12 3.5 13.8 10.2 20.5 12 13.8 13.8 12 20.5 10.2 13.8 3.5 12 10.2 10.2 12 3.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        </svg>
      );
    case "type":
      return (
        <svg {...props}>
          <path d="M5 6.5h14M12 6.5v11M8.5 17.5h7" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
      );
    case "search":
    case "query":
    case "visibility":
    case "discover":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
      );
    case "meta":
    case "linkedin":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 11v5M8 8.5v.2M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "ux":
    case "interface":
    case "perf":
      return (
        <svg {...props}>
          <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="6.5" cy="7" r="0.7" fill="currentColor" />
          <circle cx="9" cy="7" r="0.7" fill="currentColor" />
        </svg>
      );
    case "topic":
    case "authority":
    case "semantic":
    case "demand":
      return (
        <svg {...props}>
          <circle cx="8" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="13" cy="16" r="2.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9.8 10.2 14.4 8.8M9.5 10.8 11.8 14.4M15.5 9.8 14.2 14.2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}
