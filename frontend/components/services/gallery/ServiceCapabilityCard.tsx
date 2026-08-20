"use client";

import type { ComponentType } from "react";
import type { CapabilityItem } from "./data";
import CapabilityHeader from "./CapabilityHeader";
import { useCapabilityActive } from "./useCapabilityActive";
import type { CapabilityVisualProps } from "./visuals/types";

type ServiceCapabilityCardProps = {
  capability: CapabilityItem;
  /** Hand-authored visualization for this service only */
  Visual: ComponentType<CapabilityVisualProps>;
};

/**
 * Shared dark capability shell.
 * Each service receives its own Visual — never a generic viz with swapped text.
 */
export default function ServiceCapabilityCard({
  capability,
  Visual,
}: ServiceCapabilityCardProps) {
  const { rootRef, hovered, inView, isActive, reduceMotion, setHovered } =
    useCapabilityActive<HTMLAnchorElement>({ threshold: 0.6 });

  return (
    <a
      ref={rootRef}
      href={capability.href}
      id={`capability-${capability.id}`}
      className={`scc${capability.featured ? " scc--featured" : ""}${hovered ? " is-hover" : ""}${inView ? " is-inview" : ""}${isActive ? " is-active" : ""}`}
      aria-label={`${capability.id} ${capability.title}: ${capability.promise}`}
      onMouseEnter={() => {
        if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="scc__top">
        <CapabilityHeader
          id={capability.id}
          title={capability.title}
          promise={capability.promise}
        />
      </div>

      <div className="scc__visual" data-active={isActive ? "true" : "false"}>
        <Visual
          isActive={isActive}
          isHovered={hovered}
          inView={inView}
          reduceMotion={reduceMotion}
        />
      </div>

      <footer className="scc__foot">
        <p className="scc__status">{capability.status}</p>
        <span className="scc__cta">
          Explore Capability
          <span className="scc__cta-arrow" aria-hidden="true">
            ↗
          </span>
        </span>
      </footer>
    </a>
  );
}
