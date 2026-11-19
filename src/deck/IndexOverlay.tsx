"use client";

import { motion, type Variants } from "framer-motion";
import type { SlideDef } from "@/slides";
import { cx } from "@/lib/cx";
import { EASE_OUT } from "./motion";

type Props = {
  slides: SlideDef[];
  current: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025, delayChildren: 0.08 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const pad = (n: number) => String(n).padStart(2, "0");

const HINTS = [
  ["← →", "이동"],
  ["G", "목차"],
  ["F", "전체 화면"],
  ["ESC", "닫기"],
];

export function IndexOverlay({ slides, current, onSelect, onClose }: Props) {
  const half = Math.ceil(slides.length / 2);
  const columns = [slides.slice(0, half), slides.slice(half)];

  return (
    <motion.div
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-label="목차"
      className="absolute inset-0 z-50 bg-bg text-fg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <header className="absolute left-[120px] right-[120px] top-14 flex h-10 items-center justify-between">
        <span className="trim text-eyebrow font-medium uppercase text-muted">Index</span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 items-center gap-3 text-[15px] font-medium text-fg-2 transition-colors hover:text-fg"
        >
          닫기
          <span className="flex size-10 items-center justify-center rounded-full border border-line">
            <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden>
              <path d="M3 3 L13 13 M13 3 L3 13" />
            </svg>
          </span>
        </button>
      </header>

      <div className="absolute left-[120px] right-[120px] top-[160px] bottom-[160px] grid grid-cols-2 gap-x-6">
        {columns.map((col, c) => (
          <motion.ol key={c} variants={list} initial="hidden" animate="show" className="flex flex-col border-b border-line">
            {col.map((slide) => {
              const i = slides.indexOf(slide);
              const active = i === current;
              return (
                <motion.li key={slide.id} variants={row} className="flex-1 border-t border-line">
                  <button
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "group grid h-full w-full grid-cols-[72px_1fr_auto] items-center text-left transition-colors duration-300",
                      active ? "text-fg" : "text-fg-2 hover:text-fg",
                    )}
                  >
                    <span className="font-serif text-[24px] leading-none lining-nums tabular-nums text-muted">{pad(i + 1)}</span>
                    <span className="flex items-center gap-4 text-[24px] font-medium tracking-[-0.025em]">
                      {slide.title}
                      {active ? <span className="size-1.5 rounded-full bg-fg" aria-hidden /> : null}
                    </span>
                    <span className="text-[14px] font-medium tracking-[-0.005em] text-muted">
                      {slide.section ? [slide.section.no, slide.section.label].filter(Boolean).join("  ") : "Cover"}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>
        ))}
      </div>

      <footer className="absolute bottom-14 left-[120px] right-[120px] flex h-10 items-center gap-10">
        {HINTS.map(([key, label]) => (
          <span key={key} className="flex items-center gap-3 text-[14px] text-muted">
            <kbd className="flex h-7 min-w-7 items-center justify-center rounded-[4px] border border-line px-2 font-sans text-[12px] font-medium text-fg-2">
              {key}
            </kbd>
            {label}
          </span>
        ))}
      </footer>
    </motion.div>
  );
}
