"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteLead, updateLeadStatus } from "@/app/admin/leads-actions";
import StatusBadge from "@/app/admin/components/StatusBadge";
import {
  formatDrawerDateTime,
  formatTableDate,
  fullName,
  mailtoHref,
  safeExternalUrl,
} from "@/lib/contact/format";
import {
  statusLabel,
  type ContactInquiry,
  type ContactStatus,
} from "@/lib/contact/types";

type LeadsWorkspaceProps = {
  leads: ContactInquiry[];
  initialLeadId: string | null;
  hasActiveFilters: boolean;
};

function statusActions(status: ContactStatus): Array<{
  label: string;
  next: ContactStatus;
  primary?: boolean;
}> {
  switch (status) {
    case "new":
      return [{ label: "Mark as Handled", next: "handled", primary: true }];
    case "handled":
      return [{ label: "Mark as New", next: "new", primary: false }];
  }
}

export default function LeadsWorkspace({
  leads,
  initialLeadId,
  hasActiveFilters,
}: LeadsWorkspaceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(initialLeadId);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setSelectedId(initialLeadId);
    setConfirmDelete(false);
    setActionError(null);
    setCopyState("idle");
  }, [initialLeadId, leads]);

  const selected = useMemo(
    () => leads.find((lead) => lead.id === selectedId) ?? null,
    [leads, selectedId],
  );

  const syncLeadParam = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set("lead", id);
      else params.delete("lead");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const openLead = useCallback(
    (id: string) => {
      setSelectedId(id);
      setConfirmDelete(false);
      setActionError(null);
      setCopyState("idle");
      syncLeadParam(id);
    },
    [syncLeadParam],
  );

  const closeLead = useCallback(() => {
    setSelectedId(null);
    setConfirmDelete(false);
    setActionError(null);
    syncLeadParam(null);
  }, [syncLeadParam]);

  const onCopyEmail = useCallback(async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }, []);

  const onUpdateStatus = useCallback(
    (id: string, status: ContactStatus) => {
      setActionError(null);
      startTransition(async () => {
        const result = await updateLeadStatus(id, status);
        if (!result.ok) {
          setActionError(result.message ?? "Unable to update status.");
          return;
        }
        router.refresh();
      });
    },
    [router],
  );

  const onDelete = useCallback(
    (id: string) => {
      setActionError(null);
      startTransition(async () => {
        const result = await deleteLead(id);
        if (!result.ok) {
          setActionError(result.message ?? "Unable to delete inquiry.");
          return;
        }
        setConfirmDelete(false);
        setSelectedId(null);
        syncLeadParam(null);
        router.refresh();
      });
    },
    [router, syncLeadParam],
  );

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLead();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeLead]);

  if (leads.length === 0) {
    return (
      <div className="admin-empty" role="status">
        {hasActiveFilters ? (
          <>
            <p className="admin-empty__title">No inquiries match your current filters.</p>
            <a href="/admin" className="admin-empty__action">
              Clear filters
            </a>
          </>
        ) : (
          <>
            <p className="admin-empty__title">No contact inquiries yet.</p>
            <p className="admin-empty__copy">
              New submissions from the contact form will appear here.
            </p>
          </>
        )}
      </div>
    );
  }

  const websiteUrl = selected ? safeExternalUrl(selected.website) : null;

  return (
    <>
      <div className="admin-leads" data-pending={pending || undefined}>
        <div className="admin-table-wrap" role="region" aria-label="Contact inquiries">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Company</th>
                <th scope="col" className="admin-table__col-service">
                  Service
                </th>
                <th scope="col" className="admin-table__col-budget">
                  Budget
                </th>
                <th scope="col" className="admin-table__col-email">
                  Email
                </th>
                <th scope="col">Submitted</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const name = fullName(lead.first_name, lead.last_name);
                const active = lead.id === selectedId;
                return (
                  <tr
                    key={lead.id}
                    className={active ? "is-active" : undefined}
                    tabIndex={0}
                    aria-selected={active}
                    onClick={() => openLead(lead.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openLead(lead.id);
                      }
                    }}
                  >
                    <td>
                      <span className="admin-table__primary">{name}</span>
                    </td>
                    <td>{lead.company}</td>
                    <td className="admin-table__col-service">{lead.service}</td>
                    <td className="admin-table__col-budget">
                      {lead.budget ?? "—"}
                    </td>
                    <td className="admin-table__col-email">{lead.work_email}</td>
                    <td>{formatTableDate(lead.created_at)}</td>
                    <td>
                      <StatusBadge status={lead.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="admin-mobile-list">
          {leads.map((lead) => {
            const name = fullName(lead.first_name, lead.last_name);
            const active = lead.id === selectedId;
            return (
              <li key={lead.id}>
                <button
                  type="button"
                  className={`admin-mobile-card${active ? " is-active" : ""}`}
                  onClick={() => openLead(lead.id)}
                >
                  <div className="admin-mobile-card__top">
                    <span className="admin-mobile-card__name">{name}</span>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="admin-mobile-card__company">{lead.company}</p>
                  <p className="admin-mobile-card__meta">
                    <span>{lead.service}</span>
                    {lead.budget ? <span>{lead.budget}</span> : null}
                  </p>
                  <p className="admin-mobile-card__date">
                    {formatTableDate(lead.created_at)}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected ? (
        <div className="admin-drawer-root">
          <button
            type="button"
            className="admin-drawer__backdrop"
            aria-label="Close lead details"
            onClick={closeLead}
          />
          <aside
            className="admin-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-drawer-title"
          >
            <div className="admin-drawer__head">
              <div>
                <p className="admin-drawer__eyebrow">Lead detail</p>
                <h2 id="admin-drawer-title" className="admin-drawer__title">
                  {fullName(selected.first_name, selected.last_name)}
                </h2>
              </div>
              <button
                type="button"
                className="admin-drawer__close"
                onClick={closeLead}
              >
                Close
              </button>
            </div>

            <div className="admin-drawer__body">
              <Field label="Email" value={selected.work_email} />
              <Field label="Company" value={selected.company} />
              <Field label="Role" value={selected.role_title || "—"} />
              <Field
                label="Website"
                value={selected.website || "—"}
                href={websiteUrl}
              />
              <Field label="Service" value={selected.service} />
              <Field label="Budget" value={selected.budget || "—"} />
              <Field
                label="Opportunity"
                value={selected.message}
                multiline
              />
              <Field
                label="Submitted"
                value={formatDrawerDateTime(selected.created_at)}
              />
              <div className="admin-drawer__field">
                <p className="admin-drawer__label">Status</p>
                <StatusBadge status={selected.status} />
              </div>

              {actionError ? (
                <p className="admin-drawer__error" role="alert">
                  {actionError}
                </p>
              ) : null}

              <div className="admin-drawer__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => onCopyEmail(selected.work_email)}
                  disabled={pending}
                >
                  {copyState === "copied"
                    ? "Copied"
                    : copyState === "failed"
                      ? "Copy failed"
                      : "Copy Email"}
                </button>
                <a
                  className="admin-btn admin-btn--ghost"
                  href={mailtoHref(selected.work_email)}
                >
                  Email Lead
                </a>
                {websiteUrl ? (
                  <a
                    className="admin-btn admin-btn--ghost"
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Website ↗
                  </a>
                ) : null}
              </div>

              <div className="admin-drawer__status-actions">
                {statusActions(selected.status).map((action) => (
                  <button
                    key={action.next + action.label}
                    type="button"
                    className={`admin-btn ${action.primary ? "admin-btn--primary" : "admin-btn--ghost"}`}
                    disabled={pending}
                    onClick={() => onUpdateStatus(selected.id, action.next)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              <div className="admin-drawer__danger">
                {!confirmDelete ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    disabled={pending}
                    onClick={() => setConfirmDelete(true)}
                  >
                    Delete
                  </button>
                ) : (
                  <div className="admin-drawer__confirm">
                    <p className="admin-drawer__confirm-title">
                      Delete this inquiry?
                    </p>
                    <p className="admin-drawer__confirm-copy">
                      This action cannot be undone.
                    </p>
                    <div className="admin-drawer__confirm-actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost"
                        disabled={pending}
                        onClick={() => setConfirmDelete(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        disabled={pending}
                        onClick={() => onDelete(selected.id)}
                      >
                        {pending ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <p className="admin-drawer__hint">
                Current status: {statusLabel(selected.status)}
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  value,
  href,
  multiline = false,
}: {
  label: string;
  value: string;
  href?: string | null;
  multiline?: boolean;
}) {
  return (
    <div className="admin-drawer__field">
      <p className="admin-drawer__label">{label}</p>
      {href ? (
        <a
          className="admin-drawer__value admin-drawer__value--link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : (
        <p
          className={`admin-drawer__value${multiline ? " admin-drawer__value--multi" : ""}`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
