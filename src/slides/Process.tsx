"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";
import { DividerSlide, SectionHead, SplitSlide } from "@/deck/layouts";
import { EASE_OUT, rise } from "@/deck/motion";
import { Eyebrow, Figure, Grid, Index, Reveal, Rule, SlideBox } from "@/deck/primitives";
import { IMG } from "./assets";
import { TRACK_COUNT, TRACKS } from "./content";

/* ───────────────────────── Part 01 ───────────────────────── */

export function ProcessDivider() {
  return (
    <DividerSlide
      part="Part 01"
      numeral="01"
      display="Process"
      title="행사 진행 과정"
      lead="하현상 〈Elegy〉 향 팝업 — 아티스트의 조향에서 콘서트까지"
      items={[
        { no: "01", label: "Compose", title: "아티스트 사전 방문 및 커스텀 조향" },
        { no: "02", label: "Sense", title: "팬들의 방문 및 시향" },
        { no: "03", label: "Keep", title: "굿즈 수령" },
        { no: "04", label: "Relive", title: "콘서트 향 조향" },
      ]}
    />
  );
}

/* ───────────────────────── Step 01 ───────────────────────── */

export function StepCompose() {
  return (
    <SplitSlide
      eyebrow="Step 01 — Compose"
      numeral="01"
      title={
        <>
          아티스트 사전 방문 및
          <br />
          커스텀 조향
        </>
      }
      body={
        <>
          가수 하현상님은 사전에 매장을 방문해 곡의 서사와 감정을 바탕으로 향을 조향했습니다. 〈Elegy〉 수록곡{" "}
          {TRACK_COUNT}곡에 대응하는 향을 각각 선택·조향하고, 곡 이름으로 향의 이름을 지었습니다.
        </>
      }
      meta={[
        { label: "Artist", value: "하현상" },
        { label: "Output", value: `곡명으로 이름 붙인 향 ${TRACK_COUNT}종` },
      ]}
      media={
        <Figure
          src={IMG.elegyCompose}
          alt="곡별 향을 기록하는 하현상"
          caption="곡의 서사와 감정을 향으로 옮기는 사전 조향"
          position="50% 32%"
        />
      }
    />
  );
}

/* ───────────────────────── Scent index ───────────────────────── */

const soak: Variants = {
  hidden: { y: 340 },
  show: { y: 140, transition: { duration: 2.4, ease: EASE_OUT, delay: 0.35 } },
};

/** A perfumer's blotter strip; the dipped tip soaks up colour on entry. */
function Blotter({ tint }: { tint: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const W = 56;
  const H = 340;
  const TIP = 40;
  const shape = `M0 0 H${W} V${H - TIP} L${W / 2} ${H} L0 ${H - TIP} Z`;

  return (
    <motion.svg variants={rise} width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" aria-hidden>
      <defs>
        <clipPath id={`clip-${id}`}>
          <path d={shape} />
        </clipPath>
        <linearGradient id={`soak-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={`rgb(${tint})`} stopOpacity="1" />
          <stop offset="0.5" stopColor={`rgb(${tint})`} stopOpacity="0.6" />
          <stop offset="1" stopColor={`rgb(${tint})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={shape} fill="#ebe6dd" />
      <g clipPath={`url(#clip-${id})`}>
        <motion.rect x="0" y="0" width={W} height={H} fill={`url(#soak-${id})`} variants={soak} />
      </g>
    </motion.svg>
  );
}

export function ScentIndex() {
  return (
    <SlideBox className="flex flex-col justify-between">
      <SectionHead
        eyebrow="Scent Index — Elegy"
        title={
          <>
            곡의 이름이 곧
            <br />
            향의 이름이 되었습니다
          </>
        }
        body={`하현상님이 곡마다 선택하고 조향한 ${TRACK_COUNT}가지 향. 팬들은 곡을 들으며 같은 이름의 향을 시향했습니다.`}
      />
      <Grid>
        {TRACKS.map((t) => (
          <div key={t.no} className="col-span-2">
            <Blotter tint={t.tint} />
            <Reveal className="mt-10">
              <Index className="block">{t.no}</Index>
              <p className="trim mt-6 text-[28px] font-semibold tracking-[-0.03em] text-fg">{t.name}</p>
            </Reveal>
          </div>
        ))}
      </Grid>
    </SlideBox>
  );
}

/* ───────────────────────── Step 02 ───────────────────────── */

export function StepSense() {
  return (
    <SplitSlide
      eyebrow="Step 02 — Sense"
      numeral="02"
      title="팬들의 방문 및 시향"
      body="팬들은 매장을 방문해 미디어아트와 함께 곡을 감상하고, 하현상님이 조향한 향을 시향할 수 있습니다. 곡을 들으며 자신이 느낀 감상대로 직접 향을 조향할 수도 있습니다."
      meta={[
        { label: "Audience", value: "팬" },
        { label: "Experience", value: "음악 · 미디어아트 · 시향 · 조향" },
      ]}
      media={
        <Figure
          src={IMG.elegyMediaart}
          alt="미디어아트 공간과 시향 오브제"
          caption="미디어아트 공간과 곡별 시향 오브제"
          position="50% 45%"
        />
      }
    />
  );
}

/* ───────────────────────── Step 03 ───────────────────────── */

const IN_THE_BOX = [
  { no: "01", name: "아티스트 손글씨 시향지", desc: "아티스트가 직접 쓴 손글씨 카드" },
  { no: "02", name: "향수 50ml", desc: "곡명으로 이름 붙인 시그니처 향" },
  { no: "03", name: "패키지", desc: "향수와 시향지를 담는 전용 패키지" },
];

export function StepKeep() {
  return (
    <SplitSlide
      eyebrow="Step 03 — Keep"
      numeral="03"
      title="굿즈 수령"
      body="감상이 끝난 뒤, 자신이 희망하는 향을 바탕으로 굿즈를 수령합니다."
      meta={[
        { label: "Audience", value: "팬" },
        { label: "Choice", value: "감상 후 원하는 향을 선택" },
      ]}
      media={
        <div className="grid h-full grid-cols-6 gap-x-6">
          <div className="col-span-3 flex flex-col justify-between pb-12">
            <Reveal>
              <Eyebrow>In the Box</Eyebrow>
            </Reveal>
            <ul>
              {IN_THE_BOX.map((item, i) => (
                <li key={item.no} className={i > 0 ? "mt-12" : undefined}>
                  <Rule />
                  <Reveal className="pt-8">
                    <div className="flex items-baseline gap-3">
                      <Index>{item.no}</Index>
                      <p className="trim text-[26px] font-semibold tracking-[-0.03em] text-fg">{item.name}</p>
                    </div>
                    <p className="trim mt-5 text-[18px] leading-[1.6] text-muted">{item.desc}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3 h-full">
            <Figure src={IMG.elegyGoods} alt="Elegy 향수와 손글씨 시향지" caption="〈Elegy〉 향수와 손글씨 시향지" />
          </div>
        </div>
      }
    />
  );
}

/* ───────────────────────── Step 04 ───────────────────────── */

export function StepRelive() {
  return (
    <SplitSlide
      eyebrow="Step 04 — Relive"
      numeral="04"
      title="콘서트 향 조향"
      body="이후 콘서트에서도 같은 향을 컨페티와 공간에 뿌려, 관객이 곡에 몰입하는 경험을 제공했습니다."
      meta={[
        { label: "Stage", value: "콘서트" },
        { label: "Method", value: "컨페티 · 공간 분사" },
      ]}
      media={<Figure src={IMG.elegyPoster} alt="Elegy 향 팝업 안내 포스터" caption="〈Elegy〉 향 팝업 안내" mat />}
    />
  );
}
