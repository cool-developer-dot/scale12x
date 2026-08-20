"use client";

type FrameworkStep = {
  step: string;
  title: string;
  body: string;
  cue: "discover" | "design" | "execute" | "scale";
};

const STEPS: FrameworkStep[] = [
  {
    step: "01",
    title: "Discover",
    body: "30-minute discovery. We define outcomes, constraints, and the fastest path to measurable growth.",
    cue: "discover",
  },
  {
    step: "02",
    title: "Design",
    body: "Custom proposal in 48 hours. Channels, creative, tech, and AI mapped to one system.",
    cue: "design",
  },
  {
    step: "03",
    title: "Execute",
    body: "Kickoff in 48 hours. Senior specialists ship, founder-led on premium engagements.",
    cue: "execute",
  },
  {
    step: "04",
    title: "Scale",
    body: "We double down on what works across channels, automation, and reporting you can trust.",
    cue: "scale",
  },
];

function Cue({ kind }: { kind: FrameworkStep["cue"] }) {
  if (kind === "discover") {
    return (
      <svg className="framework-card__cue" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "design") {
    return (
      <svg className="framework-card__cue" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 38 L38 10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M14 10 L38 34" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      </svg>
    );
  }
  if (kind === "execute") {
    return (
      <svg className="framework-card__cue" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 24 H34" stroke="currentColor" strokeWidth="1.4" />
        <path d="M28 16 L38 24 L28 32" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg className="framework-card__cue" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M8 34 A18 18 0 0 1 40 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M14 34 A12 12 0 0 1 34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.5"
      />
    </svg>
  );
}

export default function OperationalFramework() {
  return (
    <div className="framework-block">
      <header className="framework-header">
        <p
          data-work-animate="fw-eyebrow"
          className="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-[#3B82F6] uppercase opacity-0"
        >
          HOW WE WORK / 01–04
        </p>
        <h3
          id="framework-heading"
          data-work-animate="fw-headline"
          className="framework-header__headline opacity-0"
        >
          From ambition{" "}
          <span className="text-[#3B82F6]">to execution.</span>
        </h3>
        <p
          data-work-animate="fw-support"
          className="framework-header__support opacity-0"
        >
          Discovery to signed contract in 14–21 days. Then we ship, and compound
          what works.
        </p>
      </header>

      <div className="framework-grid">
        {STEPS.map((step, i) => (
          <article
            key={step.step}
            data-work-animate="fw-card"
            data-fw-delay={i}
            className={`framework-card framework-card--${step.cue} opacity-0`}
          >
            <p className="framework-card__step">STEP {step.step}</p>
            <h4 className="framework-card__title">{step.title}</h4>
            <p className="framework-card__body">{step.body}</p>
            <span className="framework-card__ghost" aria-hidden="true">
              {step.step}
            </span>
            <Cue kind={step.cue} />
            <span className="framework-card__signal" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}
