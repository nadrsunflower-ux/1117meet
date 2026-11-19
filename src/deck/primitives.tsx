"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { drawLine, rise, settle, wipe } from "./motion";

/* ───────────────────────── layout ───────────────────────── */

/** The 1680 × 760 content box shared by every slide. */
export function SlideBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("absolute left-[120px] right-[120px] top-[160px] bottom-[160px]", className)}>
      {children}
    </div>
  );
}

/** 12-column grid, 24px gutter. */
export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("grid grid-cols-12 gap-x-6", className)}>{children}</div>;
}

/* ───────────────────────── motion wrappers ───────────────────────── */

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={rise} className={className}>
      {children}
    </motion.div>
  );
}

/** 1px hairline that draws in from the left. Pass a `bg-*` class to change its tone. */
export function Rule({ className }: { className?: string }) {
  return <motion.div variants={drawLine} className={cx("h-px origin-left", className ?? "bg-line")} />;
}

/* ───────────────────────── typography ───────────────────────── */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("trim text-eyebrow font-medium uppercase text-muted", className)}>{children}</p>
  );
}

export function Display({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cx("trim font-serif text-display font-light italic text-fg", className)}>
      {children}
    </h1>
  );
}

export function Numeral({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "trim block font-serif text-numeral font-light lining-nums tabular-nums text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cx("trim text-title font-semibold text-fg", className)}>{children}</h2>;
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("trim text-body text-balance text-fg-2", className)}>{children}</p>;
}

/** Small serif index number, e.g. "01". */
export function Index({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("font-serif text-[24px] leading-none lining-nums tabular-nums text-muted", className)}>
      {children}
    </span>
  );
}

/* ───────────────────────── figure ───────────────────────── */

type FigureProps = {
  src: StaticImageData;
  alt: string;
  caption?: ReactNode;
  /** CSS object-position for the crop. */
  position?: string;
  /** Present the image as a matted print (documents, posters). */
  mat?: boolean;
  className?: string;
};

/**
 * Image frame that fills its parent. With a caption, the caption row is
 * exactly 48px (24 gap + 24 line), so frames align with neighbouring text
 * columns that use `pb-12`.
 */
export function Figure({ src, alt, caption, position = "50% 50%", mat, className }: FigureProps) {
  const ratio: CSSProperties = { aspectRatio: `${src.width} / ${src.height}` };

  return (
    <figure className={cx("flex h-full flex-col", className)}>
      <motion.div variants={wipe} className="relative min-h-0 flex-1 overflow-hidden bg-mat">
        <motion.div variants={settle} className="absolute inset-0">
          {mat ? (
            <div className="flex h-full w-full items-center justify-center p-14">
              <div
                className="relative h-full max-w-full shadow-[0_32px_64px_-28px_rgba(20,20,19,0.38)]"
                style={ratio}
              >
                <Image src={src} alt={alt} fill unoptimized sizes="40vw" className="object-cover" draggable={false} />
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              sizes="45vw"
              className="object-cover"
              style={{ objectPosition: position }}
              draggable={false}
            />
          )}
        </motion.div>
      </motion.div>
      {caption ? (
        <Reveal className="mt-6">
          <figcaption className="flex h-6 items-center text-caption text-muted">{caption}</figcaption>
        </Reveal>
      ) : null}
    </figure>
  );
}

/* ───────────────────────── composites ───────────────────────── */

export type ColumnItem = { no?: string; label: string; title: ReactNode; desc?: ReactNode };

/** Row of 3-column-wide items under a drawn hairline. Used on cover, dividers, closing. */
export function ColumnList({ items }: { items: ColumnItem[] }) {
  return (
    <Grid>
      {items.map((item) => (
        <div key={item.label + String(item.no)} className="col-span-3">
          <Rule />
          <Reveal className="pt-9">
            <div className="flex items-baseline">
              {item.no ? (
                <Index className="mr-3 text-[20px]">{item.no}</Index>
              ) : (
                <Index className="invisible w-0 text-[20px]">0</Index>
              )}
              <Eyebrow>{item.label}</Eyebrow>
            </div>
            <p className="trim mt-6 text-item font-semibold text-fg">{item.title}</p>
            {item.desc ? <p className="trim mt-4 text-[18px] leading-[1.6] text-muted">{item.desc}</p> : null}
          </Reveal>
        </div>
      ))}
    </Grid>
  );
}

export type MetaItem = { label: string; value: ReactNode };

/** Two-column key / value strip under a hairline. */
export function MetaRow({ items }: { items: MetaItem[] }) {
  return (
    <div>
      <Rule />
      <Reveal className="grid grid-cols-[1fr_2fr] gap-x-6 pt-8">
        {items.map((item) => (
          <div key={item.label}>
            <Eyebrow>{item.label}</Eyebrow>
            <p className="trim mt-4 text-meta font-medium text-fg">{item.value}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
