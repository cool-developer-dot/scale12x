"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CursorFillCta from "@/components/hero/CursorFillCta";
import MobileNav from "@/components/hero/MobileNav";
import BrandLogo from "@/components/brand/BrandLogo";
import { NAV_LINKS, navHref, resolveActiveNav } from "./nav";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const activeId = resolveActiveNav(pathname, hash);
  const onContact =
    pathname === "/contact" || pathname.startsWith("/contact/");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 12);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <BrandLogo priority />

        <nav
          className="hero-nav hidden items-center gap-9 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.id}
                className={`hero-nav-link${isActive ? " is-active" : ""}`}
                href={navHref(link, pathname)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <CursorFillCta
              href={onContact ? "#project-inquiry" : "/contact"}
              className="h-10 rounded-full px-5 text-[0.72rem] sm:h-11 sm:text-[0.8rem]"
            >
              Start Scaling
            </CursorFillCta>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
