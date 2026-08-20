"use client";

import { useEffect, useRef } from "react";
import type { PlatformItem } from "./data";

type PlatformMarqueeProps = {
  platforms: PlatformItem[];
  reduceMotion?: boolean;
  className?: string;
};

function PlatformItemView({
  platform,
  hidden = false,
}: {
  platform: PlatformItem;
  hidden?: boolean;
}) {
  return (
    <div
      className="platform-item"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : platform.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={platform.src}
        alt=""
        className="platform-item__logo"
        loading="lazy"
        decoding="async"
        draggable={false}
        aria-hidden="true"
      />
      <span className="platform-item__name">{platform.displayName}</span>
    </div>
  );
}

function renderSet(platforms: PlatformItem[], keyPrefix: string, hidden = false) {
  return (
    <div
      className="platform-marquee__set"
      aria-hidden={hidden || undefined}
    >
      {platforms.map((platform) => (
        <PlatformItemView
          key={`${keyPrefix}-${platform.id}`}
          platform={platform}
          hidden={hidden}
        />
      ))}
    </div>
  );
}

export default function PlatformMarquee({
  platforms,
  reduceMotion = false,
  className = "",
}: PlatformMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry?.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.05, rootMargin: "12% 0px" },
    );
    io.observe(viewport);
    return () => io.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        ref={viewportRef}
        className={`platform-marquee platform-marquee--static ${className}`.trim()}
      >
        <div className="platform-marquee__set platform-marquee__set--static">
          {platforms.map((platform) => (
            <PlatformItemView key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      className={`platform-marquee ${className}`.trim()}
    >
      <div ref={trackRef} className="platform-marquee__track">
        {renderSet(platforms, "a")}
        {renderSet(platforms, "b", true)}
      </div>
    </div>
  );
}
