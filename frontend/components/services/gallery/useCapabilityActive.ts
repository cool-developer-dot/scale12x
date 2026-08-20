"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

type UseCapabilityActiveOptions = {
  /** Intersection ratio that triggers the one-shot mobile/in-view animation */
  threshold?: number;
};

type UseCapabilityActiveResult<T extends HTMLElement = HTMLElement> = {
  rootRef: RefObject<T | null>;
  hovered: boolean;
  inView: boolean;
  isActive: boolean;
  reduceMotion: boolean;
  setHovered: (value: boolean) => void;
};

const HOVER_MQ = "(hover: hover) and (pointer: fine)";

/**
 * Desktop: hover drives isActive.
 * Mobile / coarse pointer: one-shot inView at ~60% visibility.
 * Reduced motion: settled/active state immediately.
 */
export function useCapabilityActive<T extends HTMLElement = HTMLElement>(
  options: UseCapabilityActiveOptions = {},
): UseCapabilityActiveResult<T> {
  const { threshold = 0.6 } = options;
  const rootRef = useRef<T | null>(null);
  const playedRef = useRef(false);
  const prefersReduced = useReducedMotion();
  const reduceMotion = !!prefersReduced;

  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(HOVER_MQ);
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }

    // Fine-pointer hover devices rely on hover — skip in-view choreography.
    if (typeof window !== "undefined" && window.matchMedia(HOVER_MQ).matches) {
      return;
    }

    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // canHover is read via matchMedia inside — keep deps length stable
  }, [reduceMotion, threshold]);

  const isActive = reduceMotion
    ? true
    : canHover
      ? hovered
      : inView;

  return {
    rootRef,
    hovered,
    inView,
    isActive,
    reduceMotion,
    setHovered,
  };
}
