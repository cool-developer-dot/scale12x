import {
  statusLabel,
  type ContactStatus,
} from "@/lib/contact/types";

type StatusBadgeProps = {
  status: ContactStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`admin-badge admin-badge--${status}`}>
      {statusLabel(status)}
    </span>
  );
}
