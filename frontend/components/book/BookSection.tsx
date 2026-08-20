import BookInfoPanel from "./BookInfoPanel";
import CalendlyEmbed from "./CalendlyEmbed";

export default function BookSection() {
  return (
    <section className="book-page" aria-label="Schedule a strategy call">
      <div className="book-page__shell">
        <article className="book-shell">
          <BookInfoPanel />
          <div className="book-scheduler">
            <CalendlyEmbed />
          </div>
        </article>
      </div>
    </section>
  );
}
