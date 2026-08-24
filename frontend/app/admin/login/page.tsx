import type { Metadata } from "next";
import AdminLoginForm from "@/app/admin/login/login-form";
import { redirectIfAdminAuthenticated } from "@/lib/admin/auth";
import { isAdminAuthConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Scale12x Admin",
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

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

function messageForQueryError(code: string | undefined): string | null {
  if (code === "config") {
    return "Admin authentication is not configured. Contact the site operator.";
  }
  if (code === "denied") {
    return "Unable to sign in with those credentials.";
  }
  return null;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (isAdminAuthConfigured()) {
    await redirectIfAdminAuthenticated();
  }

  const params = await searchParams;
  const initialError =
    messageForQueryError(params.error) ??
    (!isAdminAuthConfigured()
      ? "Admin authentication is not configured. Contact the site operator."
      : null);

  return (
    <div className="admin-panel">
      <header className="admin-panel__brand">
        <p className="admin-panel__eyebrow">Internal access</p>
        <h1 className="admin-panel__title">Scale12x Admin</h1>
        <p className="admin-panel__subtitle">
          Sign in with your approved Scale12x credentials.
        </p>
      </header>

      <AdminLoginForm initialError={initialError} />
    </div>
  );
}
