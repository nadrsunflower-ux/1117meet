"use client";

import { motion } from "framer-motion";
import { fade } from "./motion";

/** Slowly drifting soft light — a visual stand-in for scent in the air. */
const BLOBS = [
  { left: 1020, top: -180, size: 1100, color: "146, 160, 205", alpha: 0.26, duration: 28, path: { x: [0, -90, 40, 0], y: [0, 70, -40, 0] } },
  { left: 1320, top: 360, size: 900, color: "120, 156, 168", alpha: 0.2, duration: 34, path: { x: [0, 60, -70, 0], y: [0, -60, 30, 0] } },
  { left: 760, top: 420, size: 820, color: "206, 176, 166", alpha: 0.13, duration: 40, path: { x: [0, 80, 20, 0], y: [0, -30, 50, 0] } },
];

export function Mist() {
  return (
    <motion.div variants={fade} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((b) => (
        <motion.div
          key={b.left}
          className="absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            background: `radial-gradient(closest-side, rgba(${b.color}, ${b.alpha}), rgba(${b.color}, 0))`,
          }}
          animate={{ ...b.path, scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}
