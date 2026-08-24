"use server";

import { revalidatePath } from "next/cache";
import { resolveAdminAuth } from "@/lib/admin/auth";
import { isUuid } from "@/lib/contact/queries";
import { isContactStatus, type ContactStatus } from "@/lib/contact/types";
import {
  createServiceClient,
  isContactDbConfigured,
} from "@/lib/supabase/admin";

export type LeadMutationResult = {
  ok: boolean;
  message?: string;
};

async function assertAdminMutation(): Promise<LeadMutationResult | null> {
  const auth = await resolveAdminAuth();
  if (auth.status !== "ok") {
    return { ok: false, message: "Unauthorized." };
  }
  if (!isContactDbConfigured()) {
    return {
      ok: false,
      message: "Unable to update inquiry right now. Please try again.",
    };
  }
  return null;
}

export async function updateLeadStatus(
  id: string,
  status: ContactStatus,
): Promise<LeadMutationResult> {
  const denied = await assertAdminMutation();
  if (denied) return denied;

  if (!isUuid(id) || !isContactStatus(status)) {
    return { ok: false, message: "Invalid request." };
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("contact_inquiries")
      .update({ status })
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("[admin] status update failed", {
        code: error.code,
        timestamp: new Date().toISOString(),
      });
      return {
        ok: false,
        message: "Unable to update status right now. Please try again.",
      };
    }

    if (!data) {
      return { ok: false, message: "Inquiry not found." };
    }

    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    console.error("[admin] status update exception", {
      name: err instanceof Error ? err.name : "unknown",
      timestamp: new Date().toISOString(),
    });
    return {
      ok: false,
      message: "Unable to update status right now. Please try again.",
    };
  }
}

export async function deleteLead(id: string): Promise<LeadMutationResult> {
  const denied = await assertAdminMutation();
  if (denied) return denied;

  if (!isUuid(id)) {
    return { ok: false, message: "Invalid request." };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("contact_inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[admin] delete failed", {
        code: error.code,
        timestamp: new Date().toISOString(),
      });
      return {
        ok: false,
        message: "Unable to delete inquiry right now. Please try again.",
      };
    }

    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    console.error("[admin] delete exception", {
      name: err instanceof Error ? err.name : "unknown",
      timestamp: new Date().toISOString(),
    });
    return {
      ok: false,
      message: "Unable to delete inquiry right now. Please try again.",
    };
  }
}
