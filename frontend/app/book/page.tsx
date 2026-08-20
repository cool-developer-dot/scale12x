import type { Metadata } from "next";
import BookMinimalHeader from "@/components/book/BookMinimalHeader";
import BookSection from "@/components/book/BookSection";

export const metadata: Metadata = {
  title: "Book a Strategy Call: Scale12x",
  description:
    "Schedule a focused 30-minute strategy call with Scale12x. Choose a time and receive your meeting link automatically.",
  openGraph: {
    title: "Book a Strategy Call: Scale12x",
    description:
      "Schedule a focused 30-minute strategy call with Scale12x. Choose a time and receive your meeting link automatically.",
    type: "website",
    url: "https://scale12x.com/book",
  },
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <div className="book-route">
      <BookMinimalHeader />
      <main className="book-main">
        <BookSection />
      </main>
    </div>
  );
}
