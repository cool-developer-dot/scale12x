export const CONTACT_STATUSES = ["new", "handled"] as const;

export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export type ContactInquiry = {
  id: string;
  first_name: string;
  last_name: string;
  work_email: string;
  company: string;
  role_title: string | null;
  website: string | null;
  service: string;
  message: string;
  budget: string | null;
  status: ContactStatus;
  created_at: string;
};

export function isContactStatus(value: unknown): value is ContactStatus {
  return (
    typeof value === "string" &&
    (CONTACT_STATUSES as readonly string[]).includes(value)
  );
}

export function statusLabel(status: ContactStatus): string {
  switch (status) {
    case "new":
      return "New";
    case "handled":
      return "Handled";
  }
}
