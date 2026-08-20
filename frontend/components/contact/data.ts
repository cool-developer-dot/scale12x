export const CONTACT_EMAIL = "hello@scale12x.com";

export const OPERATING_CITIES =
  "London · New York · San Francisco · Dubai · Riyadh" as const;

export const SERVICE_OPTIONS = [
  "Growth Strategy",
  "AI & Automation",
  "Technology",
  "Brand & Creative",
  "Paid Media",
  "Web & Digital",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
  "Not sure yet",
] as const;

export type BudgetOption = (typeof BUDGET_OPTIONS)[number];

export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  website: string;
  services: ServiceOption[];
  opportunity: string;
  budget: BudgetOption | "";
};
