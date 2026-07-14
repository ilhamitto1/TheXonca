import type { Variants, Transition } from "motion/react";

export const luxEase: Transition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
};

export const luxEaseFast: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxEase,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: luxEase,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: luxEase,
  },
};

export const revealClip: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.25, ease: [0.65, 0, 0.35, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const charReveal: Variants = {
  hidden: { y: "110%", rotate: 4, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const menuOverlay: Variants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const menuItem: Variants = {
  closed: { opacity: 0, x: -40, filter: "blur(8px)" },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
