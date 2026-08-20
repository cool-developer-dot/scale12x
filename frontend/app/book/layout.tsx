import type { ReactNode } from "react";

/**
 * Book-route resource hints — start Calendly DNS/TLS before the iframe mounts.
 */
export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://calendly.com" />
      <link rel="dns-prefetch" href="https://assets.calendly.com" />
      {children}
    </>
  );
}
