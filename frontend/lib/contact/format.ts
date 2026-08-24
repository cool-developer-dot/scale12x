const tableDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const drawerDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const drawerTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export function fullName(first: string, last: string): string {
  return `${first.trim()} ${last.trim()}`.trim();
}

export function formatTableDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return tableDate.format(date);
}

export function formatDrawerDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${drawerDate.format(date)} · ${drawerTime.format(date)}`;
}

/** Safe external href or null if unusable. */
export function safeExternalUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function mailtoHref(email: string): string {
  return `mailto:${encodeURIComponent(email.trim())}`;
}
