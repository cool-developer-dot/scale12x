"use client";

import { useCallback, useEffect, useId, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import CursorFillCta from "./CursorFillCta";
import BrandLogo from "@/components/brand/BrandLogo";
import { NAV_LINKS, navHref, resolveActiveNav } from "@/components/header/nav";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [portalReady, setPortalReady] = useState(false);
  const activeId = resolveActiveNav(pathname, hash);

  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const animatingRef = useRef(false);
  const openRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const titleId = useId();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  // Keep panel off-screen on first paint — GSAP-owned transform only
  useEffect(() => {
    if (!portalReady) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const logo = logoRef.current;
    const closeBtn = closeBtnRef.current;
    const links = linkRefs.current.filter(Boolean);
    const cta = ctaRef.current;
    if (!overlay || !panel) return;

    gsap.set(rootRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(panel, { xPercent: 100, force3D: true });
    gsap.set([logo, closeBtn, ...links, cta], { autoAlpha: 0 });
  }, [portalReady]);

  const clearBodyLock = useCallback(() => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    delete document.body.dataset.navScrollY;
  }, []);

  const lockScroll = useCallback(() => {
    const y = window.scrollY;
    document.body.dataset.navScrollY = String(y);
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }, []);

  /** restore=true keeps prior scroll (dismiss menu). restore=false lands at top (route change). */
  const unlockScroll = useCallback(
    (restore = true) => {
      const y = Number(document.body.dataset.navScrollY || "0");
      clearBodyLock();
      window.scrollTo({
        top: restore ? y : 0,
        left: 0,
        behavior: "auto",
      });
    },
    [clearBodyLock],
  );

  const resetMenuVisual = useCallback(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const logo = logoRef.current;
    const closeBtn = closeBtnRef.current;
    const links = linkRefs.current.filter(Boolean);
    const cta = ctaRef.current;

    tlRef.current?.kill();
    tlRef.current = null;

    if (root) gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    if (panel) gsap.set(panel, { xPercent: 100, force3D: true });
    gsap.set([logo, closeBtn, ...links, cta], { autoAlpha: 0, x: 0, y: 0 });
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current || animatingRef.current) return;
    openRef.current = true;
    animatingRef.current = true;
    setOpen(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const logo = logoRef.current;
    const closeBtn = closeBtnRef.current;
    const links = linkRefs.current.filter(Boolean);
    const cta = ctaRef.current;
    if (!root || !overlay || !panel) {
      animatingRef.current = false;
      return;
    }

    tlRef.current?.kill();
    lockScroll();

    if (reduceMotion) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(panel, { xPercent: 0 });
      gsap.set([logo, closeBtn, ...links, cta], { autoAlpha: 1, x: 0, y: 0 });
      animatingRef.current = false;
      closeBtn?.focus({ preventScroll: true });
      return;
    }

    // Prepare instantly, then animate on next frames — avoids mount/layout hitch
    gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(panel, { xPercent: 100, force3D: true });
    gsap.set([logo, closeBtn], { autoAlpha: 0, y: -6 });
    gsap.set(links, { autoAlpha: 0, x: 16 });
    gsap.set(cta, { autoAlpha: 0, y: 10 });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", overwrite: "auto" },
          onComplete: () => {
            animatingRef.current = false;
            closeBtn?.focus({ preventScroll: true });
          },
        });
        tlRef.current = tl;

        // Panel slides first (primary motion), content follows lightly
        tl.to(overlay, { autoAlpha: 1, duration: 0.3 }, 0)
          .to(panel, { xPercent: 0, duration: 0.42, force3D: true }, 0)
          .to(logo, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.16)
          .to(closeBtn, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.18)
          .to(links, { autoAlpha: 1, x: 0, duration: 0.32, stagger: 0.05 }, 0.22)
          .to(cta, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.36);
      });
    });
  }, [lockScroll]);

  const closeMenu = useCallback(
    (options?: { restoreScroll?: boolean }) => {
      const restoreScroll = options?.restoreScroll ?? true;

      if (!openRef.current) {
        if (document.body.style.position === "fixed") {
          unlockScroll(restoreScroll);
        }
        return;
      }

      if (animatingRef.current && restoreScroll) return;
      animatingRef.current = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = rootRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const links = linkRefs.current.filter(Boolean);

      // Route navigations must release the body lock immediately so the
      // destination page is not painted under a leftover fixed offset.
      if (!restoreScroll) {
        unlockScroll(false);
      }

      const finish = () => {
        openRef.current = false;
        animatingRef.current = false;
        setOpen(false);
        if (restoreScroll) unlockScroll(true);
        toggleRef.current?.focus({ preventScroll: true });
      };

      tlRef.current?.kill();

      if (!root || !overlay || !panel || reduceMotion || !restoreScroll) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        if (panel) gsap.set(panel, { xPercent: 100 });
        if (overlay) gsap.set(overlay, { autoAlpha: 0 });
        finish();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", overwrite: "auto" },
        onComplete: finish,
      });
      tlRef.current = tl;

      tl.to(links, { autoAlpha: 0, x: 10, duration: 0.14, stagger: 0.02 }, 0)
        .to(overlay, { autoAlpha: 0, duration: 0.24 }, 0.02)
        .to(panel, { xPercent: 100, duration: 0.34, force3D: true }, 0.02)
        .set(root, { autoAlpha: 0, pointerEvents: "none" });
    },
    [unlockScroll],
  );

  // Soft route change while the menu is open: land at top, never restore prior Y.
  useEffect(() => {
    if (!openRef.current && document.body.style.position !== "fixed") return;

    openRef.current = false;
    animatingRef.current = false;
    setOpen(false);
    resetMenuVisual();
    unlockScroll(false);
  }, [pathname, resetMenuVisual, unlockScroll]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();

      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]',
        );
        if (focusables.length < 2) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
      // Never restore prior-route scrollY onto the next page.
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        delete document.body.dataset.navScrollY;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 72) closeMenu();
  };

  const onNavigate = useCallback(() => {
    closeMenu({ restoreScroll: false });
  }, [closeMenu]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open navigation"
        onClick={openMenu}
      >
        <span className="burger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {portalReady
        ? createPortal(
            <div
              ref={rootRef}
              className="fixed inset-0 z-[9999] lg:hidden"
              aria-hidden={!open}
            >
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/45"
                onClick={() => closeMenu()}
              />

              <aside
                id="mobile-nav-panel"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className="mobile-nav-panel absolute top-0 right-0 flex h-[100dvh] w-[min(92vw,400px)] max-w-full flex-col border-l border-[var(--color-border-dark)] bg-[var(--color-bg-deep)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_80%_-10%,rgba(var(--color-accent-rgb),0.1),transparent_55%)]" />

                <div className="relative z-10 flex shrink-0 items-center justify-between px-5 pt-5 pb-2 sm:px-6">
                  <div id={titleId} ref={logoRef} onClick={onNavigate}>
                    <BrandLogo />
                  </div>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => closeMenu()}
                    aria-label="Close navigation"
                    className="mobile-nav-close flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-text)]/15 bg-[var(--color-text)]/[0.03] text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-accent-hover)]/50 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-text)] active:scale-[0.97]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M1.2 1.2l11.6 11.6M12.8 1.2L1.2 12.8"
                        stroke="currentColor"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <nav className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-5">
                  <ul className="flex flex-col gap-1.5">
                    {NAV_LINKS.map((link, index) => {
                      const isActive = activeId === link.id;

                      return (
                        <li
                          key={link.id}
                          ref={(el) => {
                            linkRefs.current[index] = el;
                          }}
                        >
                          <Link
                            href={navHref(link, pathname)}
                            onClick={onNavigate}
                            aria-current={isActive ? "page" : undefined}
                            className={`mobile-nav-item group flex min-h-12 items-center justify-between px-4 py-3.5 text-[1.2rem] font-medium tracking-[0.1em] uppercase transition-colors duration-200 active:bg-[var(--color-text)]/[0.04] sm:text-[1.28rem] ${
                              isActive
                                ? "mobile-nav-item--active text-[var(--color-text)]"
                                : "text-[var(--color-muted-nav)] hover:text-[var(--color-text)]"
                            }`}
                          >
                            <span>{link.label}</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                              className={
                                isActive
                                  ? "text-[var(--color-accent-hover)]"
                                  : "text-[var(--color-muted)]/50"
                              }
                            >
                              <path
                                d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div
                  ref={ctaRef}
                  className="relative z-10 shrink-0 px-5 pt-2 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-6"
                >
                  <CursorFillCta
                    href="/contact"
                    onClick={onNavigate}
                    className="mobile-nav-cta min-h-12 w-full px-6 text-[0.82rem] tracking-[0.16em] uppercase"
                  >
                    Start Scaling ↗
                  </CursorFillCta>
                  <p className="mt-4 text-center font-mono text-[0.6rem] font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    Scale12x · AI-Native Growth Studio
                  </p>
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
