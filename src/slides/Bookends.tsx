"use client";

import { BookendSlide } from "@/deck/layouts";
import { Body, Eyebrow, Figure, Grid, Reveal, SlideBox, Title } from "@/deck/primitives";
import { IMG } from "./assets";
import { TRACK_COUNT } from "./content";

export function Cover() {
  return (
    <BookendSlide
      eyebrow="Meeting Deck — Artist × Scent"
      display="Scent of a Song"
      title="곡의 서사를 향으로 담는 아티스트 팬 경험"
      body="행사 진행 과정과 굿즈, 그리고 악센트 아이디의 진행 방식을 소개합니다."
      items={[
        { no: "01", label: "Process", title: "하현상 〈Elegy〉 향 팝업" },
        { no: "02", label: "Proposal", title: "AI 시그니처 향 · 굿즈 구성" },
        { no: "03", label: "Case Study", title: "유다빈밴드 유명종 생일 이벤트" },
        { label: "Presented by", title: "AC’SCENT" },
      ]}
    />
  );
}

const FACTS = [
  { label: "Place", value: "AC’SCENT 신촌" },
  { label: "Date", value: "2024. 10. 24 — 10. 26" },
  { label: "Time", value: "13:00 — 22:00" },
  { label: "Ticket", value: "관람권 38,000원 · 향수 50ml와 손글씨 시향지 포함" },
];

export function Overview() {
  return (
    <SlideBox>
      <Grid className="h-full">
        <div className="col-span-5 flex flex-col justify-between">
          <Reveal>
            <Eyebrow>Overview — Ha Hyun Sang, Elegy</Eyebrow>
          </Reveal>
          <div>
            <Reveal>
              <Title>
                노래가 끝난 뒤에도,
                <br />
                향으로 남도록
              </Title>
            </Reveal>
            <Reveal className="mt-10">
              <Body>
                하현상님이 앨범 〈Elegy〉의 각 곡에 어울리는 향을 직접 담아냈습니다. 팬들은 음악과 미디어아트,
                그리고 {TRACK_COUNT}가지 향으로 채워진 공간에서 앨범을 경험하고, 마음에 남은 향을 굿즈로
                가져갔습니다.
              </Body>
            </Reveal>
          </div>
        </div>

        <div className="col-span-6 col-start-7 flex h-full flex-col">
          <div className="h-[440px]">
            <Figure src={IMG.elegyWall} alt="Elegy 팝업 전시 벽면" />
          </div>
          <Reveal className="mt-auto">
            <dl className="border-b border-line">
              {FACTS.map((f) => (
                <div key={f.label} className="grid h-[68px] grid-cols-[160px_1fr] items-center border-t border-line">
                  <dt className="trim text-eyebrow font-medium uppercase text-muted">{f.label}</dt>
                  <dd className="trim text-meta font-medium text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Grid>
    </SlideBox>
  );
}

export function Closing() {
  return (
    <BookendSlide
      eyebrow="Closing"
      display="Thank you"
      title="음악이 끝난 뒤에도, 향은 남습니다."
      body="곡의 서사를 향으로 옮겨, 팬이 음악을 더 오래 기억하는 경험을 함께 만들겠습니다."
      items={[
        { no: "01", label: "Compose", title: "곡의 서사로 향을 짓고" },
        { no: "02", label: "Sense", title: "음악과 함께 향을 맡고" },
        { no: "03", label: "Keep", title: "향을 굿즈로 간직하고" },
        { no: "04", label: "Relive", title: "무대에서 다시 만납니다" },
      ]}
    />
  );
}
