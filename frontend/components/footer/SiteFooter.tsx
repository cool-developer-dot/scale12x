"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import BrandLogo from "@/components/brand/BrandLogo";

const COMPANY_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

const SERVICE_LINKS = [
  { label: "Growth Strategy", href: "/services/growth-strategy" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Technology & Transformation", href: "/services/technology-transformation" },
  { label: "Brand & Creative", href: "/services/brand-creative" },
  { label: "Paid Media", href: "/services/paid-media" },
  { label: "Web & Digital", href: "/services/web-digital" },
] as const;

const CONNECT_LINKS = [
  { label: "Book a discovery call", href: "/contact" },
  { label: "Start Scaling", href: "/contact" },
] as const;

const CITIES = [
  "London",
  "New York",
  "San Francisco",
  "Dubai",
  "Riyadh",
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/#privacy" },
  { label: "Terms", href: "/#terms" },
  { label: "Cookies", href: "/#cookies" },
] as const;

/** Soft-scroll on homepage; absolute paths from other routes. */
function footerHref(href: string, pathname: string): string {
  const onHome = pathname === "/" || pathname === "";
  if (!href.startsWith("/#") && !href.startsWith("#")) return href;
  if (onHome && href.startsWith("/#")) return href.slice(1);
  if (!onHome && href.startsWith("#")) return `/${href}`;
  return href;
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.451L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const pathname = usePathname() ?? "/";

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bits = footer.querySelectorAll<HTMLElement>("[data-footer-animate]");

    if (prefersReduced) {
      gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(bits, { opacity: 0, y: 8 });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const pick = (name: string) =>
          footer.querySelectorAll<HTMLElement>(
            `[data-footer-animate="${name}"]`,
          );

        tl.to(pick("brand"), { opacity: 1, y: 0, duration: 0.45 }, 0)
          .to(
            pick("nav"),
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
            0.08,
          )
          .to(pick("meta"), { opacity: 1, duration: 0.4 }, 0.2)
          .to(pick("legal"), { opacity: 1, duration: 0.35 }, 0.28);

        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="site-footer"
      aria-labelledby="footer-brand"
    >
      <span className="site-footer__wordmark" aria-hidden="true">
        SCALE12X
      </span>

      <div className="site-footer__inner">
        <div className="site-footer__layer site-footer__layer--primary">
          <div
            data-footer-animate="brand"
            className="site-footer__brand opacity-0"
          >
            <BrandLogo className="site-footer__logo" />
            <p id="footer-brand" className="site-footer__tagline">
              Growth, amplified. One partner. Every channel. Built on AI.
            </p>
            <p className="site-footer__status">
              AI-native delivery
              <span aria-hidden="true"> · </span>
              One partner. Every channel.
            </p>
            <div className="site-footer__social">
              <a
                href="https://www.linkedin.com/company/scale12x"
                className="site-footer__social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scale12x on LinkedIn (opens in a new tab)"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://x.com/scale12x"
                className="site-footer__social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scale12x on X (opens in a new tab)"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <div
              data-footer-animate="nav"
              className="site-footer__col opacity-0"
            >
              <p className="site-footer__col-title">Company</p>
              <ul className="site-footer__list">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={footerHref(link.href, pathname)}
                      className="site-footer__link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-footer-animate="nav"
              className="site-footer__col opacity-0"
            >
              <p className="site-footer__col-title">Services</p>
              <ul className="site-footer__list">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="site-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-footer-animate="nav"
              className="site-footer__col site-footer__col--connect opacity-0"
            >
              <p className="site-footer__col-title">Connect</p>
              <ul className="site-footer__list">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={footerHref(link.href, pathname)}
                      className="site-footer__link site-footer__link--connect"
                    >
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__rule" aria-hidden="true" />

        <div
          data-footer-animate="meta"
          className="site-footer__layer site-footer__layer--meta opacity-0"
        >
          <div className="site-footer__meta-item">
            <p className="site-footer__meta-label">Email</p>
            <a
              href="mailto:hello@scale12x.com"
              className="site-footer__meta-value site-footer__email"
            >
              hello@scale12x.com
            </a>
          </div>

          <div className="site-footer__meta-item site-footer__meta-item--cities">
            <p className="site-footer__meta-label">Operating Across</p>
            <p className="site-footer__meta-value site-footer__cities">
              {CITIES.map((city, i) => (
                <span key={city}>
                  {city}
                  {i < CITIES.length - 1 ? (
                    <span className="site-footer__city-sep" aria-hidden="true">
                      {" "}
                      ·{" "}
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>

          <div className="site-footer__meta-item">
            <p className="site-footer__meta-label">Availability</p>
            <p className="site-footer__meta-value site-footer__availability">
              <span className="site-footer__status-dot" aria-hidden="true" />
              Founder-led. AI-native. Taking select growth engagements.
            </p>
          </div>
        </div>

        <div className="site-footer__rule" aria-hidden="true" />

        <div
          data-footer-animate="legal"
          className="site-footer__layer site-footer__layer--legal opacity-0"
        >
          <p className="site-footer__copyright">
            © 2026 Scale12x. All rights reserved.
          </p>

          <div className="site-footer__legal-right">
            <nav className="site-footer__legal-nav" aria-label="Legal">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={footerHref(link.href, pathname)}
                  className="site-footer__legal-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="site-footer__top"
              onClick={scrollToTop}
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
