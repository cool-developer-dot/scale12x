"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";

type CursorFillCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** primary = white→blue (Start Scaling), secondary = blue→white, ghost/pill = same cursor fill */
  variant?: "primary" | "secondary" | "ghost" | "pill";
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "data-hero-animate"?: string;
};

export default function CursorFillCta({
  href,
  children,
  className = "",
  variant = "primary",
  onClick,
  "data-hero-animate": heroAnimate,
}: CursorFillCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setOrigin = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--cta-x", `${x}%`);
    el.style.setProperty("--cta-y", `${y}%`);
  }, []);

  const variantClass =
    variant === "secondary"
      ? "cta-fill--secondary"
      : variant === "ghost"
        ? "cta-fill--ghost"
        : variant === "pill"
          ? "cta-fill--pill"
          : "";

  return (
    <a
      ref={ref}
      href={href}
      data-hero-animate={heroAnimate}
      className={`cta-fill ${variantClass} ${className}`.trim()}
      onMouseEnter={setOrigin}
      onClick={onClick}
    >
      <span className="cta-fill__label">{children}</span>
    </a>
  );
}
