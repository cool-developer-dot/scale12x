import BrandLogo from "@/components/brand/BrandLogo";
import { MEETING_DETAILS } from "@/lib/booking";
import { ClockIcon, VideoIcon } from "./icons";

export default function BookInfoPanel() {
  return (
    <aside className="book-info" aria-label="Meeting information">
      <BrandLogo className="book-info__logo" priority />

      <p className="book-info__eyebrow">Strategy call</p>

      <h1 className="book-info__title">30 Minute Strategy Call</h1>

      <ul className="book-info__meta">
        <li>
          <ClockIcon className="book-info__meta-icon" />
          <span>{MEETING_DETAILS.duration}</span>
        </li>
        <li>
          <VideoIcon className="book-info__meta-icon" />
          <span>{MEETING_DETAILS.platform}</span>
        </li>
      </ul>

      <p className="book-info__note">
        A focused conversation to identify the right next move.
      </p>
    </aside>
  );
}
