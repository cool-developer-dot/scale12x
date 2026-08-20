export const MEETING_DETAILS = {
  duration: "30 minutes",
  platform: "Google Meet",
  type: "Strategy / Discovery Session",
  note: "You'll receive the meeting link automatically after booking.",
} as const;

/** Production Calendly event — do not change without product approval. */
export const CALENDLY_EVENT_URL = "https://calendly.com/foreman-pilot/30min";

const DESKTOP_HEIGHT = 680;
const MOBILE_HEIGHT = 920;

/** Stable embed domain — must match on server and client to avoid hydration mismatch. */
export function getCalendlyEmbedDomain(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://scale12x.com";

  try {
    return new URL(raw).host;
  } catch {
    return "scale12x.com";
  }
}

/**
 * Official Calendly inline embed URL.
 * embed_type + embed_domain are required for proper embed chrome / postMessage resize.
 * Light surface matches the event's native branding (avoids broken dark-theme padding).
 */
export function getCalendlyEmbedUrl(
  embedDomain: string = getCalendlyEmbedDomain(),
): string {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || CALENDLY_EVENT_URL;

  try {
    const url = new URL(raw);
    url.searchParams.set("embed_domain", embedDomain);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "ffffff");
    url.searchParams.set("text_color", "0b1220");
    url.searchParams.set("primary_color", "0055ff");
    return url.toString();
  } catch {
    return raw;
  }
}

export function getCalendlyFrameHeight(viewportWidth: number): number {
  return viewportWidth < 768 ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
}
