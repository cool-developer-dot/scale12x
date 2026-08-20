import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  type BudgetOption,
  type ServiceOption,
} from "@/components/contact/data";

export const runtime = "nodejs";

type Body = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  website?: unknown;
  services?: unknown;
  opportunity?: unknown;
  budget?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isService(value: unknown): value is ServiceOption {
  return (
    typeof value === "string" &&
    (SERVICE_OPTIONS as readonly string[]).includes(value)
  );
}

function isBudget(value: unknown): value is BudgetOption {
  return (
    typeof value === "string" &&
    (BUDGET_OPTIONS as readonly string[]).includes(value)
  );
}

export async function POST(request: NextRequest) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const firstName = asString(body.firstName);
  const lastName = asString(body.lastName);
  const email = asString(body.email);
  const company = asString(body.company);
  const role = asString(body.role);
  const website = asString(body.website);
  const opportunity = asString(body.opportunity);
  const budgetRaw = asString(body.budget);
  const services = Array.isArray(body.services)
    ? body.services.filter(isService)
    : [];

  if (!firstName || !lastName || !email || !company || !opportunity) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid work email." },
      { status: 400 },
    );
  }

  if (services.length === 0) {
    return NextResponse.json(
      { message: "Select at least one service." },
      { status: 400 },
    );
  }

  if (opportunity.length < 20) {
    return NextResponse.json(
      { message: "Please share a bit more detail about the opportunity." },
      { status: 400 },
    );
  }

  const budget = isBudget(budgetRaw) ? budgetRaw : "";

  const payload = {
    firstName,
    lastName,
    email,
    company,
    role,
    website,
    services,
    opportunity,
    budget,
    receivedAt: new Date().toISOString(),
    source: "scale12x-contact",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (webhook) {
    try {
      const upstream = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok) {
        return NextResponse.json(
          {
            message:
              "Unable to deliver your message right now. Please email hello@scale12x.com.",
          },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        {
          message:
            "Unable to deliver your message right now. Please email hello@scale12x.com.",
        },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[contact]", payload);
  }

  return NextResponse.json({ ok: true });
}
