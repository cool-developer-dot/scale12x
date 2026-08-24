import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import {
  getApprovedAdminEmail,
  getSupabasePublicEnv,
  isApprovedAdminEmail,
} from "@/lib/supabase/env";

export type AdminAuthResult =
  | { status: "ok"; user: User }
  | { status: "unauthenticated" }
  | { status: "unauthorized" }
  | { status: "misconfigured" };

/**
 * Server-side authz: Auth API user lookup + ADMIN_EMAIL allowlist.
 * Never trust client state or unverified JWT payloads alone.
 */
export async function resolveAdminAuth(): Promise<AdminAuthResult> {
  if (!getSupabasePublicEnv() || !getApprovedAdminEmail()) {
    return { status: "misconfigured" };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { status: "unauthenticated" };
  }

  if (!isApprovedAdminEmail(user.email)) {
    await supabase.auth.signOut();
    return { status: "unauthorized" };
  }

  return { status: "ok", user };
}

/** Protect /admin pages. Redirects unauthorized visitors to login. */
export async function requireAdmin(): Promise<User> {
  const result = await resolveAdminAuth();

  if (result.status === "ok") {
    return result.user;
  }

  if (result.status === "misconfigured") {
    redirect("/admin/login?error=config");
  }

  if (result.status === "unauthorized") {
    redirect("/admin/login?error=denied");
  }

  redirect("/admin/login");
}

/** If an approved admin is already signed in, send them to /admin. */
export async function redirectIfAdminAuthenticated(): Promise<void> {
  const result = await resolveAdminAuth();
  if (result.status === "ok") {
    redirect("/admin");
  }
}
