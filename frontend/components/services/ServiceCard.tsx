"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import type { ServiceItem } from "./data";
import { SERVICE_VISUALS } from "./visuals";
import ServiceCardIcon from "./ServiceCardIcon";

type ServiceCardProps = {
  service: ServiceItem;
  animate?: boolean;
  reduceMotion?: boolean;
  delay?: number;
};

export default function ServiceCard({
  service,
  animate = false,
  reduceMotion = false,
  delay = 0,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const ctaRafRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const Visual = SERVICE_VISUALS[service.visual];
  const ctaVariant =
    service.surface === "navy" ? "cta-fill" : "cta-fill cta-fill--secondary";

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !animate) return;

    if (reduceMotion) {
      gsap.set(card, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(card, { opacity: 0, y: 22 });
    const tween = gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      delay,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
    };
  }, [animate, delay, reduceMotion]);

  const setCtaOrigin = useCallback((event: MouseEvent<HTMLSpanElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const { clientX, clientY } = event;
    if (ctaRafRef.current) cancelAnimationFrame(ctaRafRef.current);
    ctaRafRef.current = requestAnimationFrame(() => {
      ctaRafRef.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--cta-x", `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--cta-y", `${((clientY - rect.top) / rect.height) * 100}%`);
    });
  }, []);

  return (
    <a
      ref={cardRef}
      href={service.href}
      className={`service-card service-card--${service.surface}${service.featured ? " is-featured" : ""} opacity-0`}
      onMouseEnter={() => {
        if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${service.index} ${service.title}: ${service.description}`}
    >
      <div className="service-card__art" aria-hidden="true">
        <Visual active={hovered && !reduceMotion} />
      </div>

      <div className="service-card__content">
        <div className="service-card__meta">
          <span className="service-card__icon" aria-hidden="true">
            <ServiceCardIcon name={service.icon} />
          </span>
          <p className="service-card__index">
            {service.index} / {service.label}
          </p>
        </div>

        <div className="service-card__copy">
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__desc">{service.description}</p>
        </div>

        <span
          ref={ctaRef}
          className={`${ctaVariant} service-card__cta`}
          onMouseEnter={setCtaOrigin}
          onMouseMove={setCtaOrigin}
        >
          <span className="cta-fill__label">
            Explore
            <span className="service-card__cta-arrow" aria-hidden="true">
              ↗
            </span>
          </span>
        </span>
      </div>
    </a>
  );
}
