"use client";

import { motion } from "framer-motion";
import { Fragment, type ComponentType } from "react";
import { DividerSlide, SectionHead } from "@/deck/layouts";
import { fade, rise, wipe } from "@/deck/motion";
import { Eyebrow, Grid, Index, Reveal, Rule, SlideBox } from "@/deck/primitives";
import { cx } from "@/lib/cx";
import { PackageIcon, PerfumeIcon, PhotocardIcon, StripIcon } from "./icons";

/* ───────────────────────── Part 02 ───────────────────────── */

export function ProposalDivider() {
  return (
    <DividerSlide
      part="Part 02"
      numeral="02"
      display="Proposal"
      title="악센트 아이디에서 진행하는 경우"
      lead="곡과 아티스트를 향으로 옮기는 방식, 그리고 굿즈 구성"
      items={[
        { no: "01", label: "Signature Scent", title: "AI 시그니처 향 추천안" },
        { no: "02", label: "Goods", title: "굿즈 구성 예시" },
      ]}
    />
  );
}

/* ───────────────────────── Proposal ───────────────────────── */

const OPTIONS = [
  {
    no: "01",
    tag: "Song × Image",
    title: "곡 이미지 기반 시그니처 향",
    body: "곡에 대응하는 이미지를 분석하여, AI로 분석된 향을 시그니처 향으로 설정합니다.",
    flow: ["곡 대응 이미지", "AI 향 분석", "시그니처 향"],
  },
  {
    no: "02",
    tag: "Artist × Expression",
    title: "아티스트 표현 기반 시그니처 향",
    body: "아티스트가 곡을 생각하며 몸과 표정으로 표현한 이미지를 분석하여, AI로 분석된 향을 시그니처 향으로 설정합니다.",
    flow: ["몸 · 표정 이미지", "AI 향 분석", "시그니처 향"],
  },
];

function Connector() {
  return (
    <div className="relative mx-4 flex-1">
      <Rule className="bg-muted" />
      <motion.svg
        variants={fade}
        viewBox="0 0 8 12"
        width={8}
        height={12}
        className="absolute -right-px top-1/2 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        aria-hidden
      >
        <path d="M1 1 L7 6 L1 11" />
      </motion.svg>
    </div>
  );
}

function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex items-center">
      {nodes.map((node, i) => {
        const last = i === nodes.length - 1;
        return (
          <Fragment key={node}>
            {i > 0 ? <Connector /> : null}
            <motion.span
              variants={rise}
              className={cx(
                "flex h-12 shrink-0 items-center border px-5 text-[18px] font-medium tracking-[-0.02em]",
                last ? "border-fg bg-fg text-bg" : "border-line text-fg",
              )}
            >
              {node}
            </motion.span>
          </Fragment>
        );
      })}
    </div>
  );
}

export function Proposal() {
  return (
    <SlideBox className="flex flex-col justify-between">
      <SectionHead
        eyebrow="Proposal — AI Signature Scent"
        title={
          <>
            AI가 분석한 향을
            <br />
            시그니처 향으로
          </>
        }
        body="악센트 아이디에서 진행할 경우, 곡과 아티스트를 담은 이미지를 AI로 분석해 그 결과를 시그니처 향으로 설정하는 두 가지 방식을 제안합니다."
      />
      <Grid>
        {OPTIONS.map((o) => (
          <motion.article key={o.no} variants={rise} className="col-span-6 flex h-[440px] flex-col border border-line p-12">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <Index>{o.no}</Index>
                <Eyebrow>Option</Eyebrow>
              </div>
              <Eyebrow>{o.tag}</Eyebrow>
            </div>
            <h3 className="trim mt-14 text-[36px] font-semibold leading-[1.3] tracking-[-0.03em] text-fg">{o.title}</h3>
            <p className="trim mt-7 text-[21px] leading-[1.75] tracking-[-0.015em] text-pretty text-fg-2">{o.body}</p>
            <div className="mt-auto">
              <Flow nodes={o.flow} />
            </div>
          </motion.article>
        ))}
      </Grid>
    </SlideBox>
  );
}

/* ───────────────────────── Goods example ───────────────────────── */

const GOODS: { no: string; name: string; desc: string; Icon: ComponentType }[] = [
  { no: "01", name: "향수", desc: "곡의 서사를 담은 시그니처 향", Icon: PerfumeIcon },
  { no: "02", name: "시향지", desc: "아티스트 손글씨를 더한 시향 카드", Icon: StripIcon },
  { no: "03", name: "포토카드", desc: "곡의 무드를 담은 아티스트 포토카드", Icon: PhotocardIcon },
  { no: "04", name: "패키지", desc: "앨범 아이덴티티를 담은 전용 패키지", Icon: PackageIcon },
];

function Plus() {
  return <span className="mx-[0.08em] font-extralight text-muted">+</span>;
}

export function GoodsExample() {
  return (
    <SlideBox className="flex flex-col justify-between">
      <SectionHead
        eyebrow="Goods — Composition"
        title={
          <>
            향수 <Plus /> 시향지 <Plus />
            <br />
            포토카드 <Plus /> 패키지
          </>
        }
        body="곡의 시그니처 향을 중심으로, 팬이 오래 소장하고 다시 꺼내 볼 수 있는 구성을 제안합니다."
      />
      <Grid>
        {GOODS.map(({ no, name, desc, Icon }) => (
          <div key={no} className="col-span-3">
            <motion.div variants={wipe} className="flex h-[300px] items-center justify-center bg-mat text-fg-2">
              <Icon />
            </motion.div>
            <Reveal className="mt-9">
              <div className="flex items-baseline gap-3">
                <Index>{no}</Index>
                <p className="trim text-[26px] font-semibold tracking-[-0.03em] text-fg">{name}</p>
              </div>
              <p className="trim mt-5 text-[18px] leading-[1.6] text-muted">{desc}</p>
            </Reveal>
          </div>
        ))}
      </Grid>
    </SlideBox>
  );
}
