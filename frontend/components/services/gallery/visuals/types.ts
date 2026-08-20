export type CapabilityVisualProps = {
  /** Primary animation should run (hover desktop / inView mobile once) */
  isActive?: boolean;
  /** Explicit hover state for fine-pointer devices */
  isHovered?: boolean;
  /** Card reached in-view threshold once */
  inView?: boolean;
  reduceMotion?: boolean;
};
