"use client";

type TestimonialProgressProps = {
  count: number;
  active: number;
  durationMs: number;
  paused: boolean;
  reduceMotion: boolean;
};

/**
 * Three positional lines (previous / active / next) — not one line per testimonial.
 * Only the center line fills during autoplay, keyed to the same activeIndex.
 */
export default function TestimonialProgress({
  count,
  active,
  durationMs,
  paused,
  reduceMotion,
}: TestimonialProgressProps) {
  return (
    <div
      className="testimonial-progress"
      role="status"
      aria-live="polite"
      aria-label={`Testimonial progress, ${active + 1} of ${count}`}
    >
      <span className="testimonial-progress__line" aria-hidden="true" />

      <span
        className="testimonial-progress__line is-active"
        aria-hidden="true"
      >
        <span
          key={`fill-${active}`}
          className={`testimonial-progress__fill${paused ? " is-paused" : ""}`}
          style={
            reduceMotion
              ? { transform: "scaleX(1)" }
              : { animationDuration: `${durationMs}ms` }
          }
        />
      </span>

      <span className="testimonial-progress__line" aria-hidden="true" />
    </div>
  );
}
