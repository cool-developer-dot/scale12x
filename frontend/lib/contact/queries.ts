import "server-only";

import {
  createServiceClient,
  isContactDbConfigured,
} from "@/lib/supabase/admin";
import {
  isContactStatus,
  type ContactInquiry,
} from "@/lib/contact/types";

export type ListInquiriesParams = {
  q?: string;
  status?: string;
};

export type ListInquiriesResult =
  | { ok: true; leads: ContactInquiry[] }
  | { ok: false; message: string };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

function escapeIlike(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

function mapRow(row: Record<string, unknown>): ContactInquiry | null {
  if (
    typeof row.id !== "string" ||
    typeof row.first_name !== "string" ||
    typeof row.last_name !== "string" ||
    typeof row.work_email !== "string" ||
    typeof row.company !== "string" ||
    typeof row.service !== "string" ||
    typeof row.message !== "string" ||
    typeof row.created_at !== "string" ||
    !isContactStatus(row.status)
  ) {
    return null;
  }

  return {
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    work_email: row.work_email,
    company: row.company,
    role_title: typeof row.role_title === "string" ? row.role_title : null,
    website: typeof row.website === "string" ? row.website : null,
    service: row.service,
    message: row.message,
    budget: typeof row.budget === "string" ? row.budget : null,
    status: row.status,
    created_at: row.created_at,
  };
}

export async function listContactInquiries(
  params: ListInquiriesParams = {},
): Promise<ListInquiriesResult> {
  if (!isContactDbConfigured()) {
    return {
      ok: false,
      message: "Unable to load contact inquiries right now.",
    };
  }

  try {
    const supabase = createServiceClient();
    let query = supabase
      .from("contact_inquiries")
      .select(
        "id, first_name, last_name, work_email, company, role_title, website, service, message, budget, status, created_at",
      )
      .order("created_at", { ascending: false });

    const status = params.status?.trim().toLowerCase();
    if (status && status !== "all" && isContactStatus(status)) {
      query = query.eq("status", status);
    }

    const q = params.q?.trim();
    if (q) {
      const safe = escapeIlike(q.replace(/,/g, " ").replace(/"/g, ""));
      const pattern = `%${safe}%`;
      query = query.or(
        [
          `first_name.ilike."${pattern}"`,
          `last_name.ilike."${pattern}"`,
          `work_email.ilike."${pattern}"`,
          `company.ilike."${pattern}"`,
          `service.ilike."${pattern}"`,
        ].join(","),
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("[admin] list inquiries failed", {
        code: error.code,
        timestamp: new Date().toISOString(),
      });
      return {
        ok: false,
        message: "Unable to load contact inquiries right now.",
      };
    }

    const leads = (data ?? [])
      .map((row) => mapRow(row as Record<string, unknown>))
      .filter((row): row is ContactInquiry => row !== null);

    return { ok: true, leads };
  } catch (err) {
    console.error("[admin] list inquiries exception", {
      name: err instanceof Error ? err.name : "unknown",
      timestamp: new Date().toISOString(),
    });
    return {
      ok: false,
      message: "Unable to load contact inquiries right now.",
    };
  }
}
