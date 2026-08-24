import Link from "next/link";
import { statusLabel, type ContactStatus } from "@/lib/contact/types";

const FILTERS: Array<{ value: "all" | ContactStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "new", label: statusLabel("new") },
  { value: "handled", label: statusLabel("handled") },
];

type LeadsToolbarProps = {
  q: string;
  status: "all" | ContactStatus;
};

function hrefFor(status: string, q: string): string {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (q.trim()) params.set("q", q.trim());
  const qs = params.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export default function LeadsToolbar({ q, status }: LeadsToolbarProps) {
  return (
    <div className="admin-toolbar">
      <form className="admin-toolbar__search" method="get" action="/admin">
        {status !== "all" ? (
          <input type="hidden" name="status" value={status} />
        ) : null}
        <label className="admin-sr-only" htmlFor="admin-lead-search">
          Search leads
        </label>
        <input
          id="admin-lead-search"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search leads…"
          className="admin-toolbar__input"
          autoComplete="off"
        />
        <button type="submit" className="admin-toolbar__search-btn">
          Search
        </button>
      </form>

      <nav className="admin-toolbar__filters" aria-label="Filter by status">
        {FILTERS.map((filter) => {
          const active = status === filter.value;
          return (
            <Link
              key={filter.value}
              href={hrefFor(filter.value, q)}
              className={`admin-toolbar__filter${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
