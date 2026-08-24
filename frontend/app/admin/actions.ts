"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getApprovedAdminEmail,
  getSupabasePublicEnv,
  isApprovedAdminEmail,
} from "@/lib/supabase/env";

export type AdminLoginState = {
  error: string | null;
};

const GENERIC_CREDENTIALS_ERROR =
  "Unable to sign in with those credentials.";
const GENERIC_DENIED_ERROR = "Unable to sign in with those credentials.";
const CONFIG_ERROR =
  "Admin authentication is not configured. Contact the site operator.";

export async function signInAdmin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!getSupabasePublicEnv() || !getApprovedAdminEmail()) {
    return { error: CONFIG_ERROR };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: GENERIC_CREDENTIALS_ERROR };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: CONFIG_ERROR };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: GENERIC_CREDENTIALS_ERROR };
  }

  if (!isApprovedAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return { error: GENERIC_DENIED_ERROR };
  }

  redirect("/admin");
}

export async function signOutAdmin(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Still send the user to login even if sign-out fails.
  }
  redirect("/admin/login");
}
