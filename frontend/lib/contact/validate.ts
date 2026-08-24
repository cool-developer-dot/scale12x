import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  type BudgetOption,
  type ServiceOption,
} from "@/components/contact/data";

export type ContactInquiryInput = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  roleTitle: string | null;
  website: string | null;
  service: string;
  message: string;
  budget: string | null;
};

export type ContactValidationResult =
  | { ok: true; data: ContactInquiryInput }
  | { ok: false; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_JSON_BYTES = 32_768;

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

function within(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Validate + normalize contact payloads for DB persistence.
 * Ignores privileged client fields (id, status, created_at).
 */
export function validateContactInquiry(
  body: unknown,
): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  const firstName = asString(raw.firstName);
  const lastName = asString(raw.lastName);
  const workEmail = asString(raw.email).toLowerCase();
  const company = asString(raw.company);
  const roleTitleRaw = asString(raw.role);
  const websiteRaw = asString(raw.website);
  const message = asString(raw.opportunity);
  const budgetRaw = asString(raw.budget);

  const services = Array.isArray(raw.services)
    ? raw.services.filter(isService)
    : [];

  // De-dupe while preserving UI order
  const uniqueServices = [...new Set(services)];

  if (
    !firstName ||
    !lastName ||
    !workEmail ||
    !company ||
    !message ||
    uniqueServices.length === 0
  ) {
    return {
      ok: false,
      message: "Please complete all required fields.",
    };
  }

  if (!within(firstName, 1, 80) || !within(lastName, 1, 80)) {
    return { ok: false, message: "Please check the highlighted fields." };
  }

  if (!within(company, 1, 160)) {
    return { ok: false, message: "Please check the highlighted fields." };
  }

  if (!within(workEmail, 3, 254) || !EMAIL_RE.test(workEmail)) {
    return { ok: false, message: "Enter a valid work email." };
  }

  if (roleTitleRaw.length > 120 || websiteRaw.length > 500) {
    return { ok: false, message: "Please check the highlighted fields." };
  }

  if (message.length < 20) {
    return {
      ok: false,
      message: "Please share a bit more detail about the opportunity.",
    };
  }

  if (message.length > 5000) {
    return { ok: false, message: "Please shorten your message and try again." };
  }

  if (budgetRaw && !isBudget(budgetRaw)) {
    return { ok: false, message: "Please select a valid budget range." };
  }

  // All services already allowlisted via filter; reject if any raw entries were invalid
  if (Array.isArray(raw.services)) {
    const invalid = raw.services.some(
      (item) => typeof item === "string" && item.trim() !== "" && !isService(item),
    );
    if (invalid) {
      return { ok: false, message: "Select a valid service." };
    }
  } else if (raw.services !== undefined) {
    return { ok: false, message: "Select at least one service." };
  }

  const service = uniqueServices.join(", ");
  if (!within(service, 1, 400)) {
    return { ok: false, message: "Select a valid service." };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      workEmail,
      company,
      roleTitle: roleTitleRaw || null,
      website: websiteRaw || null,
      service,
      message,
      budget: budgetRaw && isBudget(budgetRaw) ? budgetRaw : null,
    },
  };
}

export function isContactPayloadTooLarge(contentLength: string | null): boolean {
  if (!contentLength) return false;
  const size = Number(contentLength);
  return Number.isFinite(size) && size > MAX_JSON_BYTES;
}

export { MAX_JSON_BYTES };
