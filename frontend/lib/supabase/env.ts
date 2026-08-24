/**
 * Supabase + admin env accessors.
 * Never log or expose these values to clients beyond NEXT_PUBLIC_*.
 */

export type SupabasePublicEnv = {
  url: string;
  publishableKey: string;
};

export function getSupabasePublicEnv(): SupabasePublicEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export function requireSupabasePublicEnv(): SupabasePublicEnv {
  const env = getSupabasePublicEnv();
  if (!env) {
    throw new Error("Missing Supabase environment configuration.");
  }
  return env;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Server-only approved admin identity (single email for Phase 1). */
export function getApprovedAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  if (!email) return null;
  return normalizeEmail(email);
}

export function isApprovedAdminEmail(
  email: string | null | undefined,
): boolean {
  if (!email) return false;
  const approved = getApprovedAdminEmail();
  if (!approved) return false;
  return normalizeEmail(email) === approved;
}

export function isAdminAuthConfigured(): boolean {
  return getSupabasePublicEnv() !== null && getApprovedAdminEmail() !== null;
}
