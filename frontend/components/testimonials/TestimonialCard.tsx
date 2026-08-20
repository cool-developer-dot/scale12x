"use client";

import Image from "next/image";
import type { TestimonialItem } from "./data";
import { getTestimonialInitials } from "./data";

type TestimonialCardProps = {
  item: TestimonialItem;
  active: boolean;
};

function StarIcon() {
  return (
    <svg
      className="testimonial-card__star"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M10 1.6l2.18 5.02 5.47.58-4.12 3.68 1.18 5.37L10 13.72 5.29 16.25l1.18-5.37L2.35 7.2l5.47-.58L10 1.6z" />
    </svg>
  );
}

export default function TestimonialCard({ item, active }: TestimonialCardProps) {
  const initials = getTestimonialInitials(item);
  const quoteLen = item.quote.length;
  const quoteTone =
    quoteLen > 170 ? "is-long" : quoteLen > 120 ? "is-medium" : "is-short";

  return (
    <article
      className={`testimonial-card${active ? " is-active" : " is-inactive"}`}
    >
      <span className="testimonial-card__mark" aria-hidden="true">
        &ldquo;
      </span>

      <div className="testimonial-card__stars" aria-hidden="true">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>

      <blockquote
        className={`testimonial-card__quote ${quoteTone}`}
        cite={`#testimonial-${item.id}`}
      >
        <p>{item.quote}</p>
      </blockquote>

      <footer className="testimonial-card__identity">
        <div className="testimonial-card__divider" aria-hidden="true" />

        <div className="testimonial-card__author">
          <div className="testimonial-card__avatar" aria-hidden="true">
            {item.avatarSrc ? (
              <Image
                src={item.avatarSrc}
                alt=""
                width={40}
                height={40}
                sizes="(max-width: 767px) 36px, 40px"
                className="testimonial-card__avatar-img"
                loading="lazy"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="testimonial-card__meta">
            <cite className="testimonial-card__name">{item.name}</cite>
            <p className="testimonial-card__role">
              {item.role}
              <span className="testimonial-card__dot" aria-hidden="true">
                ·
              </span>
              {item.company}
            </p>
            {item.source && !item.isPlaceholder ? (
              <p className="testimonial-card__source">{item.source}</p>
            ) : null}
          </div>
        </div>
      </footer>
    </article>
  );
}
