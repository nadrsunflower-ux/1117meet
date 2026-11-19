import type { Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Slide container — direction-aware drift, staggers every variant child in DOM order. */
export const slideVariants: Variants = {
  hidden: (dir: number) => ({ x: dir * 36 }),
  show: {
    x: 0,
    transition: { duration: 1, ease: EASE_OUT, staggerChildren: 0.07, delayChildren: 0.08 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -36,
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  }),
};

/** Text and blocks rise out of a soft blur, like scent settling. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_OUT },
    transitionEnd: { filter: "none" },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.6, ease: EASE_OUT } },
};

/** Image frame wipes open from the bottom edge. */
export const wipe: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.15, ease: EASE_IN_OUT },
  },
};

/** Image inside a wiping frame settles from a slight zoom. */
export const settle: Variants = {
  hidden: { scale: 1.12 },
  show: { scale: 1, transition: { duration: 1.7, ease: EASE_OUT } },
};

/** Hairlines draw from the left. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_IN_OUT } },
};

/** SVG strokes draw themselves. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.8, ease: EASE_IN_OUT },
      opacity: { duration: 0.2 },
    },
  },
};
