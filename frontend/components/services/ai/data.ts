export type WorkflowNodeId =
  | "emails"
  | "spreadsheets"
  | "chat"
  | "reports"
  | "approvals"
  | "data";

export type WorkflowOutputId =
  | "workflows"
  | "responses"
  | "insights"
  | "sync"
  | "approvals-out"
  | "pipelines";

export type WorkflowIcon =
  | "mail"
  | "sheet"
  | "chat"
  | "report"
  | "approval"
  | "database"
  | "workflow"
  | "response"
  | "insight"
  | "sync"
  | "check-route"
  | "pipeline";

export type WorkflowInput = {
  id: WorkflowNodeId;
  title: string;
  subtitle: string;
  icon: WorkflowIcon;
  outputId: WorkflowOutputId;
  /** Slight horizontal stagger for fragmented feel (px in viewBox space) */
  stagger: number;
};

export type WorkflowOutput = {
  id: WorkflowOutputId;
  title: string;
  subtitle: string;
  icon: WorkflowIcon;
};

export type ProcessStage = {
  id: "understand" | "reason" | "decide" | "act" | "learn";
  label: string;
};

export const AI_INPUTS: WorkflowInput[] = [
  {
    id: "emails",
    title: "Emails",
    subtitle: "Manual triage",
    icon: "mail",
    outputId: "responses",
    stagger: 0,
  },
  {
    id: "spreadsheets",
    title: "Spreadsheets",
    subtitle: "Copy / paste",
    icon: "sheet",
    outputId: "pipelines",
    stagger: 10,
  },
  {
    id: "chat",
    title: "Chat Requests",
    subtitle: "Context switching",
    icon: "chat",
    outputId: "workflows",
    stagger: -4,
  },
  {
    id: "reports",
    title: "Reports",
    subtitle: "Manual updates",
    icon: "report",
    outputId: "insights",
    stagger: 12,
  },
  {
    id: "approvals",
    title: "Approvals",
    subtitle: "Delays & follow-ups",
    icon: "approval",
    outputId: "approvals-out",
    stagger: 2,
  },
  {
    id: "data",
    title: "Data Sources",
    subtitle: "Siloed systems",
    icon: "database",
    outputId: "sync",
    stagger: 8,
  },
];

export const AI_OUTPUTS: WorkflowOutput[] = [
  {
    id: "workflows",
    title: "Automated Workflows",
    subtitle: "End-to-end execution",
    icon: "workflow",
  },
  {
    id: "responses",
    title: "Smart Responses",
    subtitle: "AI-powered replies",
    icon: "response",
  },
  {
    id: "insights",
    title: "Real-Time Insights",
    subtitle: "Signals & summaries",
    icon: "insight",
  },
  {
    id: "sync",
    title: "Synchronized Systems",
    subtitle: "Two-way updates",
    icon: "sync",
  },
  {
    id: "approvals-out",
    title: "Approvals Automated",
    subtitle: "Rules & routing",
    icon: "check-route",
  },
  {
    id: "pipelines",
    title: "Clean Data Pipelines",
    subtitle: "Validated & connected",
    icon: "pipeline",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  { id: "understand", label: "Understand" },
  { id: "reason", label: "Reason" },
  { id: "decide", label: "Decide" },
  { id: "act", label: "Act" },
  { id: "learn", label: "Learn" },
];

/** Mobile uses a focused subset that still tells the story. */
export const MOBILE_INPUT_IDS: WorkflowNodeId[] = [
  "emails",
  "chat",
  "approvals",
];

export const MOBILE_OUTPUT_IDS: WorkflowOutputId[] = [
  "responses",
  "workflows",
  "approvals-out",
];

export const TABLET_INPUT_IDS: WorkflowNodeId[] = [
  "emails",
  "spreadsheets",
  "chat",
  "approvals",
  "data",
];

export const TABLET_OUTPUT_IDS: WorkflowOutputId[] = [
  "workflows",
  "responses",
  "insights",
  "approvals-out",
  "pipelines",
];
