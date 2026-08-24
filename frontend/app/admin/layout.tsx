import type { Metadata } from "next";
import "./admin.css";

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

/** Shared admin root — no public navbar/footer. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
