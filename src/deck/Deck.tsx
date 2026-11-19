"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { SLIDES } from "@/slides";
import { PRELOAD } from "@/slides/assets";
import { cx } from "@/lib/cx";
import { Chrome } from "./Chrome";
import { IndexOverlay } from "./IndexOverlay";
import { slideVariants } from "./motion";

export const STAGE_W = 1920;
export const STAGE_H = 1080;
const LAST = SLIDES.length - 1;

/* ───────────────────────── stage scale ───────────────────────── */

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
const readScale = () => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
const serverScale = () => null;

/* ───────────────────────── helpers ───────────────────────── */

const clamp = (n: number) => Math.max(0, Math.min(LAST, n));

function readHash() {
  const n = Number.parseInt(window.location.hash.slice(1), 10);
  return Number.isFinite(n) ? clamp(n - 1) : 0;
}

type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};
type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };

function toggleFullscreen() {
  const doc = document as FullscreenDoc;
  const el = document.documentElement as FullscreenEl;
  try {
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      void (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
    } else {
      void (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.());
    }
  } catch {
    /* fullscreen not available — ignore */
  }
}

/* ───────────────────────── deck ───────────────────────── */

export default function Deck() {
  // null during SSR / hydration → the presenter mounts only on the client, already sized.
  const scale = useSyncExternalStore(subscribeResize, readScale, serverScale);
  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0f0f10]">
      {scale !== null ? <Presenter scale={scale} /> : null}
    </main>
  );
}

type Nav = { index: number; dir: number };

function Presenter({ scale }: { scale: number }) {
  const [nav, setNav] = useState<Nav>(() => ({ index: readHash(), dir: 0 }));
  const [indexOpen, setIndexOpen] = useState(false);
  const [idle, setIdle] = useState(false);

  const { index, dir } = nav;
  const slide = SLIDES[index];

  const goTo = useCallback((to: number) => {
    setNav((prev) => {
      const next = clamp(to);
      return next === prev.index ? prev : { index: next, dir: next > prev.index ? 1 : -1 };
    });
  }, []);

  const step = useCallback((delta: number) => {
    setNav((prev) => {
      const next = clamp(prev.index + delta);
      return next === prev.index ? prev : { index: next, dir: delta > 0 ? 1 : -1 };
    });
  }, []);

  /* URL hash ↔ slide (refresh keeps your place; #7 opens slide 7) */
  useEffect(() => {
    const hash = `#${index + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [index]);

  useEffect(() => {
    const onHash = () => goTo(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [goTo]);

  /* warm every image so no slide ever pops in */
  useEffect(() => {
    for (const src of PRELOAD) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);

  /* keyboard — bound to document so it works without focusing anything */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;

      if (key === "f" || key === "F") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
      if (key === "g" || key === "G") {
        e.preventDefault();
        setIndexOpen((open) => !open);
        return;
      }
      if (indexOpen) {
        if (key === "Escape") {
          e.preventDefault();
          setIndexOpen(false);
        }
        return;
      }

      switch (key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case "Enter":
          e.preventDefault();
          step(1);
          break;
        case " ":
          e.preventDefault();
          step(e.shiftKey ? -1 : 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          step(-1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(LAST);
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [indexOpen, step, goTo]);

  /* wheel / trackpad — one slide per gesture (inertia is ignored) */
  useEffect(() => {
    let lastEvent = 0;
    let lastFire = 0;
    let fired = false;
    let acc = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      e.preventDefault();
      if (indexOpen) return;

      const now = performance.now();
      if (now - lastEvent > 180) {
        fired = false;
        acc = 0;
      }
      lastEvent = now;
      if (fired || now - lastFire < 500) return;

      acc += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(acc) >= 40) {
        fired = true;
        lastFire = now;
        step(acc > 0 ? 1 : -1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [indexOpen, step]);

  /* touch swipe */
  useEffect(() => {
    let sx = 0;
    let sy = 0;
    const onStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (indexOpen) return;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 50) return;
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      step(d < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [indexOpen, step]);

  /* hide the cursor while presenting; any mouse movement brings it back */
  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), 2600);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 2600);
    };
    window.addEventListener("mousemove", wake);
    window.addEventListener("mousedown", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("mousedown", wake);
    };
  }, []);

  const SlideView = slide.Component;

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-theme={slide.theme}
        className={cx(
          "absolute inset-0 bg-bg transition-[background-color] duration-700 ease-elegant",
          idle && !indexOpen && "cursor-none",
        )}
      >
        <div
          className="absolute left-1/2 top-1/2 select-none overflow-hidden"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.section
              key={slide.id}
              data-theme={slide.theme}
              custom={dir}
              variants={slideVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${SLIDES.length} — ${slide.title}`}
              className="absolute inset-0 text-fg"
            >
              <SlideView />
            </motion.section>
          </AnimatePresence>

          <Chrome
            index={index}
            total={SLIDES.length}
            section={slide.section}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            onOpenIndex={() => setIndexOpen(true)}
          />

          <AnimatePresence>
            {indexOpen ? (
              <IndexOverlay
                slides={SLIDES}
                current={index}
                onSelect={(i) => {
                  goTo(i);
                  setIndexOpen(false);
                }}
                onClose={() => setIndexOpen(false)}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
