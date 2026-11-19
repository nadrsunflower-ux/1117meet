"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Mist } from "./Mist";
import { fade } from "./motion";
import {
  Body,
  ColumnList,
  Display,
  Eyebrow,
  Grid,
  MetaRow,
  Numeral,
  Reveal,
  SlideBox,
  Title,
  type ColumnItem,
  type MetaItem,
} from "./primitives";

/* ─────────────────────────────────────────────────────────────
 * Split — text in columns 1–5, media in columns 7–12.
 * Eyebrow + numeral anchor the top edge; title + body sit on the
 * bottom edge of the image frame (pb-12 = the 48px caption row).
 * ──────────────────────────────────────────────────────────── */

type SplitProps = {
  eyebrow: ReactNode;
  numeral?: string;
  title: ReactNode;
  body: ReactNode;
  meta?: MetaItem[];
  /** Content for columns 7–12 (full content-box height). */
  media: ReactNode;
};

export function SplitSlide({ eyebrow, numeral, title, body, meta, media }: SplitProps) {
  return (
    <SlideBox>
      <Grid className="h-full">
        <div className="col-span-5 flex flex-col justify-between pb-12">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            {numeral ? (
              <Reveal className="mt-12">
                <Numeral>{numeral}</Numeral>
              </Reveal>
            ) : null}
          </div>
          <div>
            <Reveal>
              <Title>{title}</Title>
            </Reveal>
            <Reveal className="mt-10">
              <Body>{body}</Body>
            </Reveal>
            {meta ? (
              <div className="mt-14">
                <MetaRow items={meta} />
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 col-start-7 h-full">{media}</div>
      </Grid>
    </SlideBox>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Head — title left (cols 1–7), supporting copy right (cols 8–12),
 * both resting on the same bottom line.
 * ──────────────────────────────────────────────────────────── */

export function SectionHead({ eyebrow, title, body }: { eyebrow: ReactNode; title: ReactNode; body: ReactNode }) {
  return (
    <Grid>
      <div className="col-span-7">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal className="mt-12">
          <Title>{title}</Title>
        </Reveal>
      </div>
      <div className="col-span-5 col-start-8 flex items-end">
        <Reveal>
          <Body>{body}</Body>
        </Reveal>
      </div>
    </Grid>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Divider — opens each part. Giant ghost numeral on the right.
 * ──────────────────────────────────────────────────────────── */

type DividerProps = {
  part: string;
  numeral: string;
  display: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  items: ColumnItem[];
};

export function DividerSlide({ part, numeral, display, title, lead, items }: DividerProps) {
  return (
    <SlideBox className="flex flex-col justify-between">
      <motion.span
        variants={fade}
        aria-hidden
        className="trim pointer-events-none absolute right-0 top-0 font-serif text-[500px] font-light leading-none lining-nums tracking-[-0.04em] text-line"
      >
        {numeral}
      </motion.span>
      <div className="relative">
        <Reveal>
          <Eyebrow>{part}</Eyebrow>
        </Reveal>
        <Reveal className="mt-16">
          <Display>{display}</Display>
        </Reveal>
        <Reveal className="mt-24">
          <Title>{title}</Title>
        </Reveal>
        <Reveal className="mt-8">
          <Body className="text-muted">{lead}</Body>
        </Reveal>
      </div>
      <ColumnList items={items} />
    </SlideBox>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Bookend — cover and closing.
 * ──────────────────────────────────────────────────────────── */

type BookendProps = {
  eyebrow: ReactNode;
  display: ReactNode;
  title: ReactNode;
  body: ReactNode;
  items: ColumnItem[];
};

export function BookendSlide({ eyebrow, display, title, body, items }: BookendProps) {
  return (
    <>
      <Mist />
      <SlideBox className="flex flex-col justify-between">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <div>
          <Reveal>
            <Display>{display}</Display>
          </Reveal>
          <Reveal className="mt-24">
            <Title>{title}</Title>
          </Reveal>
          <Reveal className="mt-8">
            <Body>{body}</Body>
          </Reveal>
        </div>
        <ColumnList items={items} />
      </SlideBox>
    </>
  );
}
