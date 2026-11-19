"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { drawPath } from "@/deck/motion";

/** Line icons drawn with a single 1.25px stroke on a 120 grid. */
function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={136}
      height={136}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function PerfumeIcon() {
  return (
    <IconFrame>
      <motion.rect variants={drawPath} x="48" y="12" width="24" height="22" rx="2" />
      <motion.rect variants={drawPath} x="53" y="34" width="14" height="8" />
      <motion.rect variants={drawPath} x="30" y="42" width="60" height="66" rx="3" />
      <motion.rect variants={drawPath} x="42" y="62" width="36" height="26" rx="1" />
    </IconFrame>
  );
}

export function StripIcon() {
  const strip = "M54 14 H66 V90 L60 104 L54 90 Z";
  return (
    <IconFrame>
      <motion.path variants={drawPath} d={strip} transform="rotate(-18 60 104)" />
      <motion.path variants={drawPath} d={strip} />
      <motion.path variants={drawPath} d={strip} transform="rotate(18 60 104)" />
    </IconFrame>
  );
}

export function PhotocardIcon() {
  return (
    <IconFrame>
      <motion.rect variants={drawPath} x="32" y="12" width="56" height="96" rx="4" />
      <motion.rect variants={drawPath} x="39" y="19" width="42" height="62" rx="1" />
      <motion.circle variants={drawPath} cx="60" cy="42" r="9" />
      <motion.path variants={drawPath} d="M45 81 C47 64 73 64 75 81" />
      <motion.path variants={drawPath} d="M39 92 H68" />
      <motion.path variants={drawPath} d="M39 99 H58" />
    </IconFrame>
  );
}

export function PackageIcon() {
  return (
    <IconFrame>
      <motion.rect variants={drawPath} x="24" y="48" width="72" height="58" rx="1" />
      <motion.rect variants={drawPath} x="20" y="34" width="80" height="14" rx="1" />
      <motion.path variants={drawPath} d="M60 34 V106" />
      <motion.path variants={drawPath} d="M60 34 C54 22 42 22 46 30 C48 34 56 34 60 34 C64 34 72 34 74 30 C78 22 66 22 60 34 Z" />
    </IconFrame>
  );
}
