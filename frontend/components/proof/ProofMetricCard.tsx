"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";

export type ProofMetricData = {
  index: string;
  category: string;
  value: number;
  label: string;
  description: string;
};

type ProofMetricCardProps = {
  data: ProofMetricData;
  delay?: number;
  animate?: boolean;
  reduceMotion?: boolean;
};

export default function ProofMetricCard({
  data,
  delay = 0,
  animate = false,
  reduceMotion = false,
}: ProofMetricCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);
  const metricRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const signalRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);
  const moveRafRef = useRef(0);
  const [display, setDisplay] = useState(reduceMotion ? `$${data.value}K+` : "$0");

  const runCount = useCallback(() => {
    if (countedRef.current) return;
    countedRef.current = true;

    if (reduceMotion) {
      setDisplay(`$${data.value}K+`);
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 1 });
      }
      return;
    }

    const progress = progressRef.current;
    if (progress) {
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(progress, {
        scaleX: 1,
        duration: 1.5,
        delay: 0.05,
        ease: "power3.inOut",
      });
    }

    const obj = { n: 0 };
    gsap.to(obj, {
      n: data.value,
      duration: 1.5,
      delay: 0.05,
      ease: "power3.inOut",
      onUpdate: () => {
        const v = obj.n;
        if (v >= data.value - 0.4) {
          setDisplay(`$${data.value}K+`);
        } else {
          setDisplay(`$${Math.round(v)}K`);
        }
      },
      onComplete: () => {
        setDisplay(`$${data.value}K+`);
        if (metricRef.current) {
          gsap.fromTo(
            metricRef.current,
            { y: -1.5 },
            { y: 0, duration: 0.28, ease: "power2.out" },
          );
        }
      },
    });
  }, [data.value, reduceMotion]);

  useEffect(() => {
    if (!animate) return;
    const card = cardRef.current;
    if (!card) return;

    if (reduceMotion) {
      gsap.set([card, indexRef.current, metricRef.current, labelRef.current, descRef.current], {
        opacity: 1,
        y: 0,
      });
      runCount();
      return;
    }

    gsap.set(card, { opacity: 0, y: 14 });
    gsap.set([indexRef.current, labelRef.current, descRef.current], { opacity: 0, y: 8 });
    gsap.set(metricRef.current, { opacity: 0 });
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
    }

    const tl = gsap.timeline({ delay, defaults: { ease: "power3.out" } });
    tl.to(card, { opacity: 1, y: 0, duration: 0.48 }, 0)
      .to(indexRef.current, { opacity: 1, y: 0, duration: 0.32 }, 0.08)
      .to(metricRef.current, { opacity: 1, duration: 0.28 }, 0.12)
      .add(runCount, 0.14)
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.34 }, 0.3)
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.36 }, 0.38);

    return () => {
      tl.kill();
    };
  }, [animate, delay, reduceMotion, runCount]);

  const onEnter = () => {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    const signal = signalRef.current;
    if (!signal) return;
    gsap.killTweensOf(signal);
    gsap.fromTo(
      signal,
      { xPercent: -40, opacity: 0 },
      {
        xPercent: 460,
        opacity: 1,
        duration: 0.85,
        ease: "power2.inOut",
        onComplete: () => gsap.set(signal, { opacity: 0, xPercent: -40 }),
      },
    );
  };

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion || !glowRef.current || !cardRef.current) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const glow = glowRef.current;
    const card = cardRef.current;
    const { clientX, clientY } = e;
    if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
    moveRafRef.current = requestAnimationFrame(() => {
      moveRafRef.current = 0;
      const rect = card.getBoundingClientRect();
      glow.style.setProperty("--mx", `${((clientX - rect.left) / rect.width) * 100}%`);
      glow.style.setProperty("--my", `${((clientY - rect.top) / rect.height) * 100}%`);
      glow.style.opacity = "1";
    });
  };

  const onLeave = () => {
    if (moveRafRef.current) {
      cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = 0;
    }
    if (signalRef.current) {
      gsap.to(signalRef.current, { opacity: 0, duration: 0.18, overwrite: true });
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <article
      ref={cardRef}
      className="proof-card group relative flex flex-col opacity-0"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={glowRef} className="proof-card-glow" aria-hidden="true" />
      <span className="proof-card-accent" aria-hidden="true" />

      <p
        ref={indexRef}
        className="font-mono text-[0.62rem] font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase opacity-0"
      >
        {data.index} / {data.category}
      </p>

      <p className="proof-metric mt-5 font-sans text-[clamp(2.35rem,4vw,3.15rem)] leading-none font-medium tracking-[-0.04em]">
        <span ref={metricRef} className="inline-block opacity-0">
          {display}
        </span>
      </p>

      <p
        ref={labelRef}
        className="mt-3.5 font-mono text-[0.68rem] font-medium tracking-[0.16em] text-[var(--color-accent)] uppercase opacity-0"
      >
        {data.label}
      </p>

      <div className="proof-rule relative mt-4 h-px w-full overflow-hidden" aria-hidden="true">
        <span
          ref={progressRef}
          className="proof-rule-fill absolute inset-y-0 left-0 h-full w-full origin-left scale-x-0 bg-[var(--color-accent)]"
        />
        <span
          ref={signalRef}
          className="proof-signal absolute top-1/2 left-0 z-[1] h-[2px] w-7 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-0"
        />
      </div>

      <p
        ref={descRef}
        className="mt-4 text-[0.9rem] leading-relaxed text-[var(--color-muted)] opacity-0"
      >
        {data.description}
      </p>
    </article>
  );
}
