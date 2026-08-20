"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Fraction of element that must be visible to count as in-view. */
  threshold?: number;
  /** Extra root margin — negative shrinks the effective viewport. */
  rootMargin?: string;
};

/**
 * Tracks section IntersectionObserver + Page Visibility API.
 * Pauses expensive work when offscreen or tab-hidden.
 */
export function useSectionVisibility(
  ref: RefObject<Element | null>,
  { threshold = 0.12, rootMargin = "0px" }: Options = {},
) {
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(!!entry?.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return {
    inView,
    pageVisible,
    active: inView && pageVisible,
  };
}
