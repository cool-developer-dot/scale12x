export type NavLink = {
  href: string;
  label: string;
  /** Stable key for active-state matching */
  id: "home" | "services" | "contact";
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "services", href: "/services", label: "Services" },
  { id: "contact", href: "/contact", label: "Contact" },
] as const;

/** Keep homepage section anchors working; use absolute paths off-home. */
export function navHref(link: NavLink, pathname: string): string {
  if (link.id === "contact") return "/contact";
  return link.href;
}

/** Resolve which primary nav item is active from pathname + hash. */
export function resolveActiveNav(
  pathname: string,
  hash: string,
): NavLink["id"] {
  if (pathname.startsWith("/services")) return "services";
  if (pathname === "/contact" || pathname.startsWith("/contact/")) {
    return "contact";
  }

  const h = hash || "#home";
  if (pathname === "/" || pathname === "") {
    if (h === "#contact" || h === "#start") return "contact";
    if (h === "#services") return "services";
    return "home";
  }

  return "home";
}
