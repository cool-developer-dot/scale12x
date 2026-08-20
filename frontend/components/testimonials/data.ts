/**
 * Testimonial data for the Client Voices section.
 *
 * IMPORTANT: Entries marked `isPlaceholder: true` are layout/motion fixtures only.
 * Replace with verified client feedback before treating this as production social proof.
 * Do not invent ratings, platforms, or verification labels for placeholders.
 */

export type TestimonialSize = "short" | "medium" | "featured";

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Initials for avatar fallback — derived from name when omitted */
  initials?: string;
  /** Optional avatar / logo path under /public */
  avatarSrc?: string;
  size: TestimonialSize;
  featured?: boolean;
  /**
   * Only set when the source is real and verified.
   * Leave undefined for placeholders.
   */
  source?: string;
  /** Only set when a real rating exists */
  rating?: number;
  /** Layout fixture — not production client proof */
  isPlaceholder: boolean;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "ph-01",
    quote:
      "Clear strategy, calm execution, and measurable lift across the funnel within the first sprint cycle.",
    name: "M. Chen",
    role: "Head of Growth",
    company: "Placeholder Brand",
    avatarSrc: "/testimonials/ph-01.jpg",
    size: "medium",
    isPlaceholder: true,
  },
  {
    id: "ph-02",
    quote:
      "They treated the engagement like an operating partnership, not a ticket queue.",
    name: "J. Alvarez",
    role: "Founder",
    company: "Placeholder Studio",
    avatarSrc: "/testimonials/ph-02.jpg",
    size: "short",
    isPlaceholder: true,
  },
  {
    id: "ph-03",
    quote:
      "The product, growth, and technology work moved as one system. Decisions were sharp, delivery was transparent, and the outcomes compounded.",
    name: "S. Okonkwo",
    role: "VP Product",
    company: "Placeholder Platform",
    avatarSrc: "/testimonials/ph-03.jpg",
    size: "featured",
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "ph-04",
    quote:
      "Rare combination of senior craft and commercial discipline. Communication stayed precise the entire way through.",
    name: "A. Brooks",
    role: "Marketing Director",
    company: "Placeholder Commerce",
    avatarSrc: "/testimonials/ph-04.jpg",
    size: "medium",
    isPlaceholder: true,
  },
  {
    id: "ph-05",
    quote:
      "From discovery to ship, the team kept momentum without sacrificing quality.",
    name: "R. Patel",
    role: "COO",
    company: "Placeholder Ops",
    avatarSrc: "/testimonials/ph-05.jpg",
    size: "short",
    isPlaceholder: true,
  },
  {
    id: "ph-06",
    quote:
      "We finally had one partner who could connect brand, acquisition, and the product surface without handoff friction.",
    name: "L. Nguyen",
    role: "CEO",
    company: "Placeholder Collective",
    avatarSrc: "/testimonials/ph-06.jpg",
    size: "medium",
    isPlaceholder: true,
  },
];

export function getTestimonialInitials(item: TestimonialItem): string {
  return item.initials ?? initialsFromName(item.name);
}
