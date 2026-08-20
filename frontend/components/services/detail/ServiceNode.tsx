"use client";

import type { CSSProperties } from "react";
import type { ServiceIconName } from "./types";
import ServiceIconMark from "./ServiceIconMark";

type Props = {
  title: string;
  subtitle: string;
  icon: ServiceIconName;
  kind: "input" | "output";
  active: boolean;
  related: boolean;
  settled?: boolean;
  style: CSSProperties;
  onHover?: (active: boolean) => void;
};

export default function ServiceNode({
  title,
  subtitle,
  icon,
  kind,
  active,
  related,
  settled = false,
  style,
  onHover,
}: Props) {
  const stateClass = [
    "ai-hero__node",
    `ai-hero__node--${kind}`,
    active ? "is-active" : "",
    related ? "is-related" : "",
    settled ? "is-settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={stateClass}
      style={style}
      role="group"
      aria-label={`${title}: ${subtitle}`}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <span className="ai-hero__node-icon" aria-hidden="true">
        <ServiceIconMark name={icon} />
      </span>
      <span className="ai-hero__node-copy">
        <span className="ai-hero__node-title">{title}</span>
        <span className="ai-hero__node-sub">{subtitle}</span>
      </span>
      {kind === "output" && (
        <span
          className={`ai-hero__node-check${settled || active ? " is-on" : ""}`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M8.2 12.2 11 15l4.8-5.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
