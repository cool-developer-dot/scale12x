"use client";

import { useActionState } from "react";
import {
  signInAdmin,
  type AdminLoginState,
} from "@/app/admin/actions";

const initialState: AdminLoginState = { error: null };

type AdminLoginFormProps = {
  initialError?: string | null;
};

export default function AdminLoginForm({
  initialError = null,
}: AdminLoginFormProps) {
  const [state, formAction, pending] = useActionState(
    signInAdmin,
    initialState,
  );

  const errorMessage = state.error ?? initialError;

  return (
    <form action={formAction} className="admin-form" noValidate>
      <div className="admin-form__field">
        <label htmlFor="admin-email" className="admin-form__label">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          disabled={pending}
          placeholder="you@company.com"
          className="admin-form__input"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="admin-password" className="admin-form__label">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          placeholder="••••••••••••"
          className="admin-form__input"
        />
      </div>

      {errorMessage ? (
        <p role="alert" aria-live="polite" className="admin-form__error">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="admin-form__submit">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
