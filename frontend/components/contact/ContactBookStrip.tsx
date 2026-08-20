"use client";

import CursorFillCta from "@/components/hero/CursorFillCta";

export default function ContactBookStrip() {
  return (
    <section
      className="contact-book-strip opacity-0"
      aria-labelledby="contact-book-heading"
      data-contact-animate="book-strip"
    >
      <div className="contact-book-strip__shell">
        <div className="contact-book-strip__panel">
          <div className="contact-book-strip__copy">
            <p className="contact-book-strip__eyebrow">Direct booking</p>
            <h2 id="contact-book-heading" className="contact-book-strip__heading">
              Prefer to skip the form?
            </h2>
            <p className="contact-book-strip__support">
              Book a focused 30-minute strategy call directly.
            </p>
            <p className="contact-book-strip__meta">30 minutes · Google Meet</p>
          </div>

          <div className="contact-book-strip__action">
            <CursorFillCta
              href="/book"
              className="contact-book-strip__cta h-14 min-w-[14.5rem] justify-center px-8 text-[0.95rem] sm:h-[3.75rem] sm:min-w-[15.5rem] sm:text-[1.02rem]"
            >
              Book a strategy call <span aria-hidden="true">↗</span>
            </CursorFillCta>
          </div>
        </div>
      </div>
    </section>
  );
}
