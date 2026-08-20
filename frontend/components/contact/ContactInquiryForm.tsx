"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  type BudgetOption,
  type ContactFormPayload,
  type ServiceOption,
} from "./data";
import { CheckIcon, ShieldIcon } from "./icons";

type FieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "company"
    | "services"
    | "opportunity"
    | "form",
    string
  >
>;

type SubmitState = "idle" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!values.email.trim()) errors.email = "Work email is required.";
  else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid work email.";
  }
  if (!values.company.trim()) errors.company = "Company is required.";
  if (values.services.length === 0) {
    errors.services = "Select at least one service.";
  }
  if (!values.opportunity.trim()) {
    errors.opportunity = "Tell us a little about the opportunity.";
  } else if (values.opportunity.trim().length < 20) {
    errors.opportunity = "Please share a bit more detail (at least 20 characters).";
  }

  return errors;
}

const INITIAL: ContactFormPayload = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  website: "",
  services: [],
  opportunity: "",
  budget: "",
};

export default function ContactInquiryForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactFormPayload>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const submittedRef = useRef(false);

  const setField = useCallback(
    <K extends keyof ContactFormPayload>(key: K, value: ContactFormPayload[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleService = useCallback((service: ServiceOption) => {
    setValues((prev) => {
      const next = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: next };
    });
    setErrors((prev) => {
      if (!prev.services) return prev;
      const next = { ...prev };
      delete next.services;
      return next;
    });
  }, []);

  const selectBudget = useCallback((budget: BudgetOption) => {
    setValues((prev) => ({
      ...prev,
      budget: prev.budget === budget ? "" : budget,
    }));
  }, []);

  const onBlurField = useCallback((key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submittedRef.current || status === "loading" || status === "success") {
        return;
      }

      const nextErrors = validate(values);
      setErrors(nextErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        company: true,
        services: true,
        opportunity: true,
      });

      if (Object.keys(nextErrors).length > 0) {
        const firstKey = Object.keys(nextErrors)[0];
        const el = document.getElementById(`${formId}-${firstKey}`);
        el?.focus();
        return;
      }

      setStatus("loading");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            message?: string;
          } | null;
          setErrors({
            form:
              data?.message ??
              "Something went wrong. Please try again or email hello@scale12x.com.",
          });
          setStatus("idle");
          return;
        }

        submittedRef.current = true;
        setStatus("success");
      } catch {
        setErrors({
          form:
            "Unable to send right now. Please email hello@scale12x.com directly.",
        });
        setStatus("idle");
      }
    },
    [formId, status, values],
  );

  const onServiceKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, service: ServiceOption) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggleService(service);
      }
    },
    [toggleService],
  );

  if (status === "success") {
    return (
      <div
        id="project-inquiry"
        className="contact-form-panel contact-form-panel--success"
        role="status"
        aria-live="polite"
      >
        <p className="contact-form-panel__eyebrow">MESSAGE RECEIVED</p>
        <h2 className="contact-form-panel__title">Thank you.</h2>
        <p className="contact-form-panel__helper">
          We’ll review the details and get back to you within one business day.
        </p>
        <div className="contact-form-success__actions">
          <a
            href="mailto:hello@scale12x.com?subject=Discovery%20call"
            className="contact-form-success__secondary"
          >
            Book a discovery call ↗
          </a>
          <Link href="/" className="contact-form-success__ghost">
            Back to Scale12x
          </Link>
        </div>
      </div>
    );
  }

  const show = (key: keyof FieldErrors) => Boolean(touched[key] && errors[key]);

  const ctaLabel =
    status === "loading" ? "Sending…" : "Book a discovery call ↗";

  return (
    <div id="project-inquiry" className="contact-form-panel">
      <p className="contact-form-panel__eyebrow">PROJECT INQUIRY</p>
      <h2 className="contact-form-panel__title">
        Ready when you are.
      </h2>
      <p className="contact-form-panel__helper">
        A few details get you a discovery call, and a custom proposal in 48
        hours.
      </p>

      <form
        className="contact-form"
        noValidate
        onSubmit={handleSubmit}
        aria-describedby={errors.form ? `${formId}-form-error` : undefined}
      >
        <div className="contact-form__grid">
          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-firstName`}>
              First Name
            </label>
            <input
              id={`${formId}-firstName`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Enter first name"
              className="contact-field__input"
              value={values.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              onBlur={() => onBlurField("firstName")}
              aria-invalid={show("firstName") || undefined}
              aria-describedby={
                show("firstName") ? `${formId}-firstName-error` : undefined
              }
              required
            />
            {show("firstName") ? (
              <p id={`${formId}-firstName-error`} className="contact-field__error">
                {errors.firstName}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-lastName`}>
              Last Name
            </label>
            <input
              id={`${formId}-lastName`}
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Enter last name"
              className="contact-field__input"
              value={values.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              onBlur={() => onBlurField("lastName")}
              aria-invalid={show("lastName") || undefined}
              aria-describedby={
                show("lastName") ? `${formId}-lastName-error` : undefined
              }
              required
            />
            {show("lastName") ? (
              <p id={`${formId}-lastName-error`} className="contact-field__error">
                {errors.lastName}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-email`}>
              Work Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              className="contact-field__input"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => onBlurField("email")}
              aria-invalid={show("email") || undefined}
              aria-describedby={
                show("email") ? `${formId}-email-error` : undefined
              }
              required
            />
            {show("email") ? (
              <p id={`${formId}-email-error`} className="contact-field__error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-company`}>
              Company
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company name"
              className="contact-field__input"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
              onBlur={() => onBlurField("company")}
              aria-invalid={show("company") || undefined}
              aria-describedby={
                show("company") ? `${formId}-company-error` : undefined
              }
              required
            />
            {show("company") ? (
              <p id={`${formId}-company-error`} className="contact-field__error">
                {errors.company}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-role`}>
              Role / Title
            </label>
            <input
              id={`${formId}-role`}
              name="role"
              type="text"
              autoComplete="organization-title"
              placeholder="e.g., Head of Growth"
              className="contact-field__input"
              value={values.role}
              onChange={(e) => setField("role", e.target.value)}
            />
          </div>

          <div className="contact-field">
            <label className="contact-field__label" htmlFor={`${formId}-website`}>
              Website / Company URL
            </label>
            <input
              id={`${formId}-website`}
              name="website"
              type="url"
              autoComplete="url"
              inputMode="url"
              placeholder="https://company.com"
              className="contact-field__input"
              value={values.website}
              onChange={(e) => setField("website", e.target.value)}
            />
          </div>
        </div>

        <fieldset className="contact-fieldset">
          <legend className="contact-field__label" id={`${formId}-services-label`}>
            What do you need help with?
          </legend>
          <div
            id={`${formId}-services`}
            className="contact-chips"
            role="group"
            aria-labelledby={`${formId}-services-label`}
            aria-describedby={
              show("services") ? `${formId}-services-error` : undefined
            }
          >
            {SERVICE_OPTIONS.map((service) => {
              const selected = values.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  className={`contact-chip${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => toggleService(service)}
                  onKeyDown={(e) => onServiceKeyDown(e, service)}
                >
                  {selected ? <CheckIcon className="contact-chip__check" /> : null}
                  <span>{service}</span>
                </button>
              );
            })}
          </div>
          {show("services") ? (
            <p id={`${formId}-services-error`} className="contact-field__error">
              {errors.services}
            </p>
          ) : null}
        </fieldset>

        <div className="contact-field">
          <label
            className="contact-field__label"
            htmlFor={`${formId}-opportunity`}
          >
            Tell us about the opportunity
          </label>
          <textarea
            id={`${formId}-opportunity`}
            name="opportunity"
            className="contact-field__textarea"
            placeholder="What are you trying to solve, build, or improve?"
            rows={5}
            value={values.opportunity}
            onChange={(e) => setField("opportunity", e.target.value)}
            onBlur={() => onBlurField("opportunity")}
            aria-invalid={show("opportunity") || undefined}
            aria-describedby={
              show("opportunity") ? `${formId}-opportunity-error` : undefined
            }
            required
          />
          {show("opportunity") ? (
            <p
              id={`${formId}-opportunity-error`}
              className="contact-field__error"
            >
              {errors.opportunity}
            </p>
          ) : null}
        </div>

        <fieldset className="contact-fieldset">
          <legend className="contact-field__label" id={`${formId}-budget-label`}>
            Budget / Engagement range
          </legend>
          <div
            className="contact-budget"
            role="group"
            aria-labelledby={`${formId}-budget-label`}
          >
            {BUDGET_OPTIONS.map((budget) => {
              const selected = values.budget === budget;
              return (
                <button
                  key={budget}
                  type="button"
                  className={`contact-budget__chip${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => selectBudget(budget)}
                >
                  {budget}
                </button>
              );
            })}
          </div>
        </fieldset>

        {errors.form ? (
          <p
            id={`${formId}-form-error`}
            className="contact-field__error contact-field__error--form"
            role="alert"
          >
            {errors.form}
          </p>
        ) : null}

        <button
          type="submit"
          className="contact-form__submit"
          disabled={status === "loading"}
          aria-busy={status === "loading" || undefined}
        >
          <span className="contact-form__submit-label">{ctaLabel}</span>
        </button>

        <p className="contact-form__trust">
          <ShieldIcon className="contact-form__trust-icon" />
          <span>
            No spam. No sales sequence. Just a real response from the team.
          </span>
        </p>
      </form>
    </div>
  );
}
