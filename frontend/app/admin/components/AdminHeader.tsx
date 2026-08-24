import { signOutAdmin } from "@/app/admin/actions";

export default function AdminHeader() {
  return (
    <header className="admin-app__header">
      <div className="admin-app__brand">
        <span className="admin-app__brand-mark">Scale12x</span>
        <span className="admin-app__brand-sep" aria-hidden="true">
          /
        </span>
        <span className="admin-app__brand-label">Admin</span>
      </div>
      <form action={signOutAdmin}>
        <button type="submit" className="admin-app__logout">
          Logout
        </button>
      </form>
    </header>
  );
}
