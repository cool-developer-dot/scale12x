import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AdminHeader from "@/app/admin/components/AdminHeader";
import LeadsToolbar from "@/app/admin/components/LeadsToolbar";
import LeadsWorkspace from "@/app/admin/components/LeadsWorkspace";
import { requireAdmin } from "@/lib/admin/auth";
import { isUuid, listContactInquiries } from "@/lib/contact/queries";
import {
  isContactStatus,
  type ContactStatus,
} from "@/lib/contact/types";

export const metadata: Metadata = {
  title: "Contact Inquiries · Scale12x Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type AdminPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    lead?: string;
  }>;
};

function parseStatus(raw: string | undefined): "all" | ContactStatus {
  if (!raw) return "all";
  const value = raw.trim().toLowerCase();
  if (value === "all") return "all";
  return isContactStatus(value) ? value : "all";
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = parseStatus(params.status);
  const leadId =
    params.lead && isUuid(params.lead) ? params.lead : null;

  const result = await listContactInquiries({
    q: q || undefined,
    status,
  });

  const hasActiveFilters = Boolean(q) || status !== "all";

  return (
    <div className="admin-app">
      <AdminHeader />
      <main className="admin-app__main">
        <div className="admin-app__intro">
          <h1 className="admin-app__title">Contact Inquiries</h1>
          <p className="admin-app__subtitle">
            Incoming project inquiries from the Scale12x contact form.
          </p>
        </div>

        <LeadsToolbar q={q} status={status} />

        {!result.ok ? (
          <div className="admin-empty" role="alert">
            <p className="admin-empty__title">{result.message}</p>
            <Link
              href={
                hasActiveFilters
                  ? `/admin?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(status !== "all" ? { status } : {}),
                    }).toString()}`
                  : "/admin"
              }
              className="admin-empty__action"
            >
              Retry
            </Link>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="admin-empty" role="status">
                <p className="admin-empty__title">Loading inquiries…</p>
              </div>
            }
          >
            <LeadsWorkspace
              leads={result.leads}
              initialLeadId={leadId}
              hasActiveFilters={hasActiveFilters}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}
