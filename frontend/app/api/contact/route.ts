import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  isContactPayloadTooLarge,
  validateContactInquiry,
} from "@/lib/contact/validate";
import {
  createServiceClient,
  isContactDbConfigured,
} from "@/lib/supabase/admin";

export const runtime = "nodejs";

const GENERIC_ERROR =
  "Unable to submit your inquiry right now. Please try again.";

type ContactRow = {
  first_name: string;
  last_name: string;
  work_email: string;
  company: string;
  role_title: string | null;
  website: string | null;
  service: string;
  message: string;
  budget: string | null;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  if (isContactPayloadTooLarge(request.headers.get("content-length"))) {
    return jsonError("Request is too large.", 400);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const validated = validateContactInquiry(body);
  if (!validated.ok) {
    return jsonError(validated.message, 400);
  }

  const { data } = validated;

  if (!isContactDbConfigured()) {
    console.error("[contact] missing service configuration", { requestId });
    return jsonError(GENERIC_ERROR, 500);
  }

  const row: ContactRow = {
    first_name: data.firstName,
    last_name: data.lastName,
    work_email: data.workEmail,
    company: data.company,
    role_title: data.roleTitle,
    website: data.website,
    service: data.service,
    message: data.message,
    budget: data.budget,
  };

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("contact_inquiries").insert({
      ...row,
      // status + created_at owned by database defaults — never from client
    });

    if (error) {
      console.error("[contact] insert failed", {
        requestId,
        code: error.code,
        timestamp: new Date().toISOString(),
      });
      return jsonError(GENERIC_ERROR, 500);
    }
  } catch (err) {
    console.error("[contact] insert exception", {
      requestId,
      name: err instanceof Error ? err.name : "unknown",
      timestamp: new Date().toISOString(),
    });
    return jsonError(GENERIC_ERROR, 500);
  }

  // Notification is best-effort. DB is source of truth.
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.workEmail,
      company: data.company,
      role: data.roleTitle ?? "",
      website: data.website ?? "",
      services: data.service.split(", ").filter(Boolean),
      opportunity: data.message,
      budget: data.budget ?? "",
      receivedAt: new Date().toISOString(),
      source: "scale12x-contact",
    };

    try {
      const upstream = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok) {
        console.error("[contact] webhook failed", {
          requestId,
          status: upstream.status,
          timestamp: new Date().toISOString(),
        });
      }
    } catch {
      console.error("[contact] webhook exception", {
        requestId,
        timestamp: new Date().toISOString(),
      });
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact] stored", {
      requestId,
      service: data.service,
      hasBudget: Boolean(data.budget),
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
