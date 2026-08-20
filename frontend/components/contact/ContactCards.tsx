import type { ComponentType, ReactNode } from "react";
import {
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  MailIcon,
} from "./icons";
import { CONTACT_EMAIL, OPERATING_CITIES } from "./data";

type CardIcon = ComponentType<{ className?: string }>;

type ContactCardItem = {
  id: string;
  title: string;
  icon: CardIcon;
  body: ReactNode;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
};

const CARDS: ContactCardItem[] = [
  {
    id: "new-business",
    title: "New Business",
    icon: MailIcon,
    href: `mailto:${CONTACT_EMAIL}`,
    ariaLabel: `Email ${CONTACT_EMAIL}`,
    body: <span className="contact-card__meta">{CONTACT_EMAIL}</span>,
  },
  {
    id: "book",
    title: "Book Directly",
    icon: CalendarIcon,
    href: "/book",
    ariaLabel: "Book a strategy call",
    body: (
      <span className="contact-card__meta contact-card__meta--accent">
        Book a strategy call ↗
      </span>
    ),
  },
  {
    id: "operating",
    title: "Operating Across",
    icon: GlobeIcon,
    body: <span className="contact-card__meta">{OPERATING_CITIES}</span>,
  },
  {
    id: "response",
    title: "Response Time",
    icon: ClockIcon,
    body: (
      <span className="contact-card__meta">Usually within 1 business day</span>
    ),
  },
];

function CardInner({
  title,
  icon: Icon,
  body,
}: {
  title: string;
  icon: CardIcon;
  body: ReactNode;
}) {
  return (
    <>
      <span className="contact-card__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="contact-card__body">
        <p className="contact-card__title">{title}</p>
        {body}
      </div>
    </>
  );
}

export default function ContactCards() {
  return (
    <ul className="contact-cards" aria-label="Contact options">
      {CARDS.map((card) => {
        const className =
          "contact-card opacity-0" +
          (card.href ? " contact-card--action" : "");

        return (
          <li key={card.id} data-contact-animate="card" className={className}>
            {card.href ? (
              <a
                href={card.href}
                className="contact-card__hit"
                aria-label={card.ariaLabel}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <CardInner
                  title={card.title}
                  icon={card.icon}
                  body={card.body}
                />
              </a>
            ) : (
              <CardInner title={card.title} icon={card.icon} body={card.body} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
