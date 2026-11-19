"use client";

import { DividerSlide, SectionHead, SplitSlide } from "@/deck/layouts";
import { Figure, Grid, SlideBox } from "@/deck/primitives";
import { IMG } from "./assets";

/* ───────────────────────── Part 03 ───────────────────────── */

export function CaseDivider() {
  return (
    <DividerSlide
      part="Part 03"
      numeral="03"
      display="Case Study"
      title="악센트 아이디 생일 이벤트 사례"
      lead="유다빈밴드 유명종님"
      items={[
        { no: "01", label: "Photo Zone", title: "팬들이 준비한 포토존과 향" },
        { no: "02", label: "Compose", title: "아티스트와 함께하는 소규모 조향" },
        { no: "03", label: "Finale", title: "포토존에서 함께 마무리" },
      ]}
    />
  );
}

/* ───────────────────────── Case 01 — two images, band layout ───────────────────────── */

export function CasePhotoZone() {
  return (
    <SlideBox className="flex flex-col justify-between">
      <SectionHead
        eyebrow="Case 01 — Photo Zone"
        title="팬들이 준비한 포토존과 향"
        body="팬분들이 유명종님을 생각하며 포토존을 꾸미고, 향을 함께 구비하였습니다."
      />
      <Grid className="h-[548px]">
        <div className="col-span-7 h-full">
          <Figure src={IMG.ymj1} alt="팬들이 꾸민 포토존" caption="팬들이 꾸민 포토존과 향 오브제" position="50% 40%" />
        </div>
        <div className="col-span-5 col-start-8 h-full">
          <Figure src={IMG.ymj2} alt="생일 메시지와 사진으로 채운 테이블" caption="생일 메시지와 사진으로 채운 공간" />
        </div>
      </Grid>
    </SlideBox>
  );
}

/* ───────────────────────── Case 02 / 03 ───────────────────────── */

export function CaseCompose() {
  return (
    <SplitSlide
      eyebrow="Case 02 — Small Session"
      title={
        <>
          아티스트와 함께하는
          <br />
          소규모 조향
        </>
      }
      body="아티스트가 소규모로 팬과 함께 곡에 대해 이야기를 나누며 향을 조향하였습니다."
      media={
        <Figure src={IMG.ymj4} alt="향을 조향하는 유명종" caption="곡 이야기를 나누며 향을 조향하는 유명종님" position="50% 45%" />
      }
    />
  );
}

export function CaseFinale() {
  return (
    <SplitSlide
      eyebrow="Case 03 — Finale"
      title={
        <>
          포토존에서
          <br />
          함께 마무리
        </>
      }
      body="포토존에서 사진을 찍으며 팬들과 함께 이벤트를 마무리하였습니다."
      media={<Figure src={IMG.ymj3} alt="포토존 앞의 유명종" caption="팬들이 준비한 포토존 앞에서" position="50% 40%" />}
    />
  );
}
