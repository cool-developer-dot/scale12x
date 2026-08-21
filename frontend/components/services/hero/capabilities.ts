export type Capability = {
  id: "01" | "02" | "03" | "04" | "05" | "06" | "07";
  label: string;
  href: string;
};

export const CAPABILITIES: Capability[] = [
  { id: "01", label: "Strategy", href: "#capability-01" },
  { id: "02", label: "AI", href: "#capability-02" },
  { id: "03", label: "Technology", href: "#capability-03" },
  { id: "04", label: "Cloud", href: "#capability-04" },
  { id: "05", label: "Security", href: "#capability-05" },
  { id: "06", label: "Digital", href: "#capability-06" },
  { id: "07", label: "Search", href: "#capability-07" },
];
