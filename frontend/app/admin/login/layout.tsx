/**
 * Login-only atmospheric shell. Dashboard uses admin-app instead.
 */
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <div className="admin-shell__grid" aria-hidden="true" />
      <div className="admin-shell__orb admin-shell__orb--a" aria-hidden="true" />
      <div className="admin-shell__orb admin-shell__orb--b" aria-hidden="true" />
      <div className="admin-shell__inner">{children}</div>
    </div>
  );
}
