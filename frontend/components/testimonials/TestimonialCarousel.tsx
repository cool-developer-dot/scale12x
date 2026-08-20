"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TestimonialItem } from "./data";
import TestimonialCard from "./TestimonialCard";
import TestimonialProgress from "./TestimonialProgress";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TRANSITION_MS = 700;
const RESUME_DELAY_MS = 650;
const DESKTOP_INTERVAL_MS = 2500;
const MOBILE_INTERVAL_MS = 3000;

/** Side-card depth — compact product-card hierarchy */
const SIDE_SCALE = 0.92;
const SIDE_Y = 12;
const SIDE_OPACITY = 0.36;
/** Horizontal pitch creates ~20–28px visual gaps after scale */
const X_PITCH = 1.04;

type Geo = {
  stageHeight: number;
  cardWidth: number;
  cardHeight: number;
  intervalMs: number;
  /** 0 = mobile (sides invisible), 1 = tablet/desktop peeks */
  maxVisible: number;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function panelHeight(w: number): number {
  if (w < 768) return Math.round(Math.min(Math.max(292, w * 0.72), 328));
  if (w < 1024) return Math.round(Math.min(336, Math.max(300, w * 0.34)));
  return Math.round(Math.min(334, Math.max(308, w * 0.178)));
}

function panelWidth(w: number): number {
  if (w < 768) return Math.round(w - 36);
  if (w < 1024) return Math.round(Math.min(400, Math.max(340, w * 0.4)));
  return Math.round(Math.min(428, Math.max(392, w * 0.214)));
}

function useCarouselGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({
    stageHeight: 350,
    cardWidth: 412,
    cardHeight: 322,
    intervalMs: DESKTOP_INTERVAL_MS,
    maxVisible: 1,
  });

  useEffect(() => {
    let raf = 0;
    let lastKey = "";

    const compute = () => {
      const w = window.innerWidth;
      const cardHeight = panelHeight(w);
      const cardWidth = panelWidth(w);
      const mobile = w < 768;
      // Extra stage room so lowered side cards aren't clipped
      const stageHeight = mobile
        ? cardHeight
        : cardHeight + Math.round(SIDE_Y * 1.35);

      const next: Geo = {
        stageHeight,
        cardWidth,
        cardHeight,
        intervalMs: mobile ? MOBILE_INTERVAL_MS : DESKTOP_INTERVAL_MS,
        maxVisible: mobile ? 0 : 1,
      };

      const key = `${next.cardWidth}|${next.cardHeight}|${next.maxVisible}|${next.intervalMs}`;
      if (key === lastKey) return;
      lastKey = key;
      setGeo(next);
    };

    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return geo;
}

/**
 * Unified rail pose from relativeIndex = cardIndex - activeIndex.
 * Buffer ±2 keeps enter/exit cards in the same synchronized motion.
 */
function poseForOffset(off: number, cardWidth: number, maxVisible: number) {
  const abs = Math.abs(off);
  const x = off * cardWidth * X_PITCH;

  if (abs === 0) {
    return { x, y: 0, scale: 1, opacity: 1, zIndex: 10 };
  }

  if (maxVisible === 0) {
    return {
      x: off * (cardWidth + 28),
      y: 0,
      scale: 0.94,
      opacity: 0,
      zIndex: 2,
    };
  }

  if (abs === 1) {
    return {
      x,
      y: SIDE_Y,
      scale: SIDE_SCALE,
      opacity: SIDE_OPACITY,
      zIndex: 3,
    };
  }

  return {
    x: off * cardWidth * X_PITCH,
    y: SIDE_Y + 10,
    scale: 0.8,
    opacity: 0,
    zIndex: 1,
  };
}

type RailSlot = {
  item: TestimonialItem;
  i: number;
  off: number;
};

function buildRail(
  items: TestimonialItem[],
  active: number,
  maxVisible: number,
): RailSlot[] {
  const len = items.length;
  if (!len) return [];

  const buffer = maxVisible + 1;
  const seen = new Set<number>();
  const slots: RailSlot[] = [];

  for (let off = -buffer; off <= buffer; off++) {
    const i = wrapIndex(active + off, len);
    if (seen.has(i)) continue;
    seen.add(i);
    slots.push({ item: items[i]!, i, off });
  }

  return slots;
}

type TestimonialCarouselProps = {
  items: TestimonialItem[];
  inView: boolean;
};

export default function TestimonialCarousel({
  items,
  inView,
}: TestimonialCarouselProps) {
  const reduceMotion = useReducedMotion();
  const geo = useCarouselGeo();
  const len = items.length;

  const [active, setActive] = useState(() => {
    const featuredIdx = items.findIndex((item) => item.featured);
    return featuredIdx >= 0 ? featuredIdx : 0;
  });
  const [rowHovered, setRowHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const activeRef = useRef(active);
  const nextRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const goTo = useCallback(
    (index: number) => {
      if (!len) return;
      setActive(wrapIndex(index, len));
    },
    [len],
  );

  const prev = useCallback(() => goTo(activeRef.current - 1), [goTo]);
  const next = useCallback(() => goTo(activeRef.current + 1), [goTo]);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  const setPaused = useCallback((paused: boolean) => {
    pausedRef.current = paused;
  }, []);

  const onRowEnter = useCallback(() => {
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setRowHovered(true);
    setPaused(true);
  }, [setPaused]);

  const onRowLeave = useCallback(() => {
    setRowHovered(false);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, RESUME_DELAY_MS);
  }, [setPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const isPaused = rowHovered || dragging || !inView;

  useEffect(() => {
    setPaused(isPaused);
  }, [isPaused, setPaused]);

  useEffect(() => {
    if (reduceMotion || !len || !inView) return;

    const hold = geo.intervalMs;
    let last = performance.now();
    let elapsed = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current && document.visibilityState === "visible") {
        elapsed += dt;
        if (elapsed >= hold) {
          elapsed = 0;
          nextRef.current();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, len, inView, geo.intervalMs, active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const rail = useMemo(
    () => buildRail(items, active, geo.maxVisible),
    [items, active, geo.maxVisible],
  );

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.2 }
        : {
            duration: TRANSITION_MS / 1000,
            ease: EASE,
          },
    [reduceMotion],
  );

  if (!len) return null;

  const { cardWidth, cardHeight, maxVisible } = geo;

  return (
    <div className="testimonial-carousel">
      <div
        className="testimonial-carousel__stage"
        style={{ height: geo.stageHeight }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onKeyDown={onKeyDown}
        onMouseEnter={onRowEnter}
        onMouseLeave={onRowLeave}
        onFocus={onRowEnter}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            onRowLeave();
          }
        }}
      >
        <div className="testimonial-carousel__glow" aria-hidden="true" />

        <div className="testimonial-carousel__track">
          {rail.map(({ item, off }) => {
            const abs = Math.abs(off);
            const pose = poseForOffset(off, cardWidth, maxVisible);
            const isActive = off === 0;
            const isNear = abs === 1 && maxVisible > 0;

            return (
              <motion.div
                key={item.id}
                className={`testimonial-carousel__shell${
                  isActive ? " is-active" : ""
                }${isNear ? " is-near" : ""}${
                  abs >= 2 || (maxVisible === 0 && abs >= 1) ? " is-far" : ""
                }`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  zIndex: pose.zIndex,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                }}
                initial={false}
                animate={{
                  x: pose.x,
                  y: pose.y,
                  scale: pose.scale,
                  opacity: pose.opacity,
                }}
                transition={transition}
                whileHover={
                  isNear && !reduceMotion
                    ? { scale: SIDE_SCALE, opacity: 0.48 }
                    : undefined
                }
                drag={isActive && !reduceMotion ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onClick={() => {
                  if (off === -1) prev();
                  else if (off === 1) next();
                }}
                onDragStart={() => {
                  setDragging(true);
                  setPaused(true);
                }}
                onDragEnd={(_e, info) => {
                  setDragging(false);
                  const travel = info.offset.x;
                  const v = info.velocity.x;
                  const threshold = Math.min(110, cardWidth * 0.18);
                  if (travel > threshold || v > 550) prev();
                  else if (travel < -threshold || v < -550) next();
                  if (resumeTimer.current) {
                    window.clearTimeout(resumeTimer.current);
                  }
                  resumeTimer.current = window.setTimeout(() => {
                    if (!rowHovered) setPaused(false);
                    resumeTimer.current = null;
                  }, RESUME_DELAY_MS);
                }}
                aria-hidden={!isActive || undefined}
                aria-current={isActive ? "true" : undefined}
              >
                <TestimonialCard item={item} active={isActive} />
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          className="testimonial-carousel__nav testimonial-carousel__nav--prev"
          aria-label="Previous testimonial"
          onClick={prev}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="testimonial-carousel__nav testimonial-carousel__nav--next"
          aria-label="Next testimonial"
          onClick={next}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <TestimonialProgress
        count={len}
        active={active}
        durationMs={geo.intervalMs}
        paused={isPaused || Boolean(reduceMotion)}
        reduceMotion={Boolean(reduceMotion)}
      />
    </div>
  );
}
