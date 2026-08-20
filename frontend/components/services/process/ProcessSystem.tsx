"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS, type ProcessStep } from "./data";
import {
  ArchitectMotif,
  DiagnoseMotif,
  ExecuteMotif,
  ScaleMotif,
} from "./ProcessMotifs";
import ProcessSpine from "./ProcessSpine";
import type { SignalLeg } from "./useProcessSequence";

type ProcessSystemProps = {
  activeIndex: number;
  illuminateTo: number;
  signal: SignalLeg | null;
  reduceMotion: boolean;
  vertical: boolean;
  drawn: boolean;
  allowHover: boolean;
  onEnter: (index: number) => void;
  onLeave: () => void;
};

const MOTIFS = [DiagnoseMotif, ArchitectMotif, ExecuteMotif, ScaleMotif] as const;

function StageMarks() {
  return (
    <div className="services-process__marks" aria-hidden="true">
      <span />
      <span />
      <span />
      <i />
      <i />
    </div>
  );
}

function StageItem({
  step,
  index,
  active,
  reduceMotion,
  allowHover,
  onEnter,
  onLeave,
  Motif,
}: {
  step: ProcessStep;
  index: number;
  active: boolean;
  reduceMotion: boolean;
  allowHover: boolean;
  onEnter: (index: number) => void;
  onLeave: () => void;
  Motif: (typeof MOTIFS)[number];
}) {
  return (
    <li
      className={`services-process__stage${active ? " is-active" : ""}`}
      onMouseEnter={allowHover ? () => onEnter(index) : undefined}
      onMouseLeave={allowHover ? onLeave : undefined}
      onFocus={allowHover ? () => onEnter(index) : undefined}
      onBlur={allowHover ? onLeave : undefined}
    >
      <div className="services-process__motif-wrap" aria-hidden="true">
        <Motif active={active || reduceMotion} reduceMotion={reduceMotion} />
      </div>

      <div className="services-process__node-slot" aria-hidden="true" />

      <div className="services-process__stage-copy">
        <p className="services-process__stage-id">{step.id}</p>
        <h3 className="services-process__stage-title">{step.title}</h3>
        <p className="services-process__stage-desc">{step.description}</p>
        <StageMarks />
      </div>
    </li>
  );
}

export default function ProcessSystem({
  activeIndex,
  illuminateTo,
  signal,
  reduceMotion,
  vertical,
  drawn,
  allowHover,
  onEnter,
  onLeave,
}: ProcessSystemProps) {
  return (
    <div
      className={`services-process__system${vertical ? " is-vertical" : ""}${drawn ? " is-drawn" : ""}`}
    >
      <ol className="services-process__stages">
        {PROCESS_STEPS.map((step, i) => (
          <StageItem
            key={step.id}
            step={step}
            index={i}
            active={activeIndex === i}
            reduceMotion={reduceMotion}
            allowHover={allowHover}
            onEnter={onEnter}
            onLeave={onLeave}
            Motif={MOTIFS[i]}
          />
        ))}
      </ol>

      {!vertical && (
        <ProcessSpine
          activeIndex={activeIndex}
          illuminateTo={illuminateTo}
          signal={signal}
          vertical={false}
          reduceMotion={reduceMotion}
          drawn={drawn}
        />
      )}

      {vertical && !reduceMotion && drawn && (
        <div
          className="services-process__mobile-signal"
          style={{
            top: `${6 + activeIndex * 24.5}%`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/** Entrance phase driver — runs once. */
export function useProcessEntrance(visible: boolean, reduceMotion: boolean) {
  const [phase, setPhase] = useState(reduceMotion ? 4 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4);
      return;
    }
    if (!visible) return;

    const timers = [
      window.setTimeout(() => setPhase(1), 0),
      window.setTimeout(() => setPhase(2), 280),
      window.setTimeout(() => setPhase(3), 620),
      window.setTimeout(() => setPhase(4), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible, reduceMotion]);

  return phase;
}

type HeaderProps = {
  reduceMotion: boolean;
  phase: number;
};

export function ProcessHeader({ reduceMotion, phase }: HeaderProps) {
  const showEyebrow = phase >= 1 || reduceMotion;
  const showHeadline = phase >= 1 || reduceMotion;
  const showSupport = phase >= 2 || reduceMotion;

  return (
    <header className="services-process__header">
      <div className="services-process__header-main">
        <motion.p
          className="services-process__eyebrow"
          initial={false}
          animate={{ opacity: showEyebrow ? 1 : 0, y: showEyebrow ? 0 : 10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          HOW WE WORK / 01–04
        </motion.p>
        <motion.h2
          id="how-we-work-heading"
          className="services-process__headline"
          initial={false}
          animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : 14 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
        >
          From signal to{" "}
          <em className="services-process__headline-em">scale</em>
          <span className="services-process__headline-dot">.</span>
        </motion.h2>
      </div>

      <motion.p
        className="services-process__support"
        initial={false}
        animate={{ opacity: showSupport ? 1 : 0, y: showSupport ? 0 : 12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        A focused operating model that moves from clarity to execution, without
        the handoff chaos.
      </motion.p>
    </header>
  );
}
