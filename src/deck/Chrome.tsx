"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Section } from "@/slides";
import { cx } from "@/lib/cx";
import { EASE_OUT } from "./motion";

type ChromeProps = {
  index: number;
  total: number;
  section: Section | null;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ dir }: { dir: -1 | 1 }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden>
      {dir === 1 ? <path d="M2 8 H13 M9 4 L13 8 L9 12" /> : <path d="M14 8 H3 M7 4 L3 8 L7 12" />}
    </svg>
  );
}

function NavButton({ dir, disabled, onClick }: { dir: -1 | 1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "다음 슬라이드" : "이전 슬라이드"}
      className="flex size-10 items-center justify-center rounded-full border border-line text-fg transition-[color,border-color,opacity] duration-500 hover:border-fg disabled:pointer-events-none disabled:opacity-25"
    >
      <Arrow dir={dir} />
    </button>
  );
}

/** Persistent header + footer. Lives outside the slide transition so it never flickers. */
export function Chrome({ index, total, section, onPrev, onNext, onOpenIndex }: ChromeProps) {
  return (
    <>
      <header className="pointer-events-none absolute left-[120px] right-[120px] top-14 flex h-10 items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="font-serif text-[21px] font-medium leading-none tracking-[0.14em] text-fg transition-colors duration-700">
            AC’SCENT
          </span>
          <span className="h-3.5 w-px bg-line transition-colors duration-700" />
          <span className="trim text-eyebrow font-medium uppercase text-muted transition-colors duration-700">
            Artist Scent Experience
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {section ? (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
              className="flex items-baseline gap-3"
            >
              {section.no ? (
                <span className="font-serif text-[20px] leading-none lining-nums text-muted transition-colors duration-700">
                  {section.no}
                </span>
              ) : null}
              <span className="text-[15px] font-medium tracking-[-0.01em] text-fg-2 transition-colors duration-700">
                {section.label}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <footer className="absolute bottom-14 left-[120px] right-[120px] flex h-10 items-center justify-between">
        <button
          type="button"
          onClick={onOpenIndex}
          aria-label="목차 열기"
          className="group flex h-10 items-center gap-4 text-fg"
        >
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-muted transition-colors duration-500 group-hover:text-fg" aria-hidden>
            {[2, 7, 12].flatMap((y) =>
              [2, 7, 12].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={2} height={2} fill="currentColor" />),
            )}
          </svg>
          <span className="flex items-baseline gap-2 text-[15px] font-medium tabular-nums">
            <span className="text-fg transition-colors duration-700">{pad(index + 1)}</span>
            <span className="text-muted transition-colors duration-700">/ {pad(total)}</span>
          </span>
        </button>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={cx(
                  "h-[2px] transition-[width,background-color] duration-500 ease-elegant",
                  i === index ? "w-8 bg-fg" : i < index ? "w-3 bg-muted" : "w-3 bg-line",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <NavButton dir={-1} disabled={index === 0} onClick={onPrev} />
            <NavButton dir={1} disabled={index === total - 1} onClick={onNext} />
          </div>
        </div>
      </footer>
    </>
  );
}
