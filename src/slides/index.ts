import type { ComponentType } from "react";
import { Closing, Cover, Overview } from "./Bookends";
import { CaseCompose, CaseDivider, CaseFinale, CasePhotoZone } from "./Case";
import { ProcessDivider, ScentIndex, StepCompose, StepKeep, StepRelive, StepSense } from "./Process";
import { GoodsExample, Proposal, ProposalDivider } from "./Proposal";

export type Theme = "light" | "dark";
export type Section = { no?: string; label: string };

export type SlideDef = {
  id: string;
  title: string;
  theme: Theme;
  section: Section | null;
  Component: ComponentType;
};

const OVERVIEW: Section = { label: "Overview" };
const PROCESS: Section = { no: "01", label: "행사 진행 과정" };
const PROPOSAL: Section = { no: "02", label: "악센트 아이디 진행 제안" };
const CASE: Section = { no: "03", label: "생일 이벤트 사례" };
const CLOSING: Section = { label: "Closing" };

export const SLIDES: SlideDef[] = [
  { id: "cover", title: "Scent of a Song", theme: "dark", section: null, Component: Cover },
  { id: "overview", title: "하현상 〈Elegy〉 향 팝업", theme: "light", section: OVERVIEW, Component: Overview },

  { id: "process", title: "행사 진행 과정", theme: "dark", section: PROCESS, Component: ProcessDivider },
  { id: "compose", title: "아티스트 사전 방문 및 커스텀 조향", theme: "light", section: PROCESS, Component: StepCompose },
  { id: "scents", title: "곡의 이름이 곧 향의 이름", theme: "dark", section: PROCESS, Component: ScentIndex },
  { id: "sense", title: "팬들의 방문 및 시향", theme: "light", section: PROCESS, Component: StepSense },
  { id: "keep", title: "굿즈 수령", theme: "light", section: PROCESS, Component: StepKeep },
  { id: "relive", title: "콘서트 향 조향", theme: "light", section: PROCESS, Component: StepRelive },

  { id: "proposal", title: "악센트 아이디에서 진행하는 경우", theme: "dark", section: PROPOSAL, Component: ProposalDivider },
  { id: "signature", title: "AI 시그니처 향 추천안", theme: "light", section: PROPOSAL, Component: Proposal },
  { id: "goods", title: "굿즈 구성 예시", theme: "light", section: PROPOSAL, Component: GoodsExample },

  { id: "case", title: "악센트 아이디 생일 이벤트 사례", theme: "dark", section: CASE, Component: CaseDivider },
  { id: "photo-zone", title: "팬들이 준비한 포토존과 향", theme: "light", section: CASE, Component: CasePhotoZone },
  { id: "session", title: "아티스트와 함께하는 소규모 조향", theme: "light", section: CASE, Component: CaseCompose },
  { id: "finale", title: "포토존에서 함께 마무리", theme: "light", section: CASE, Component: CaseFinale },

  { id: "closing", title: "Thank you", theme: "dark", section: CLOSING, Component: Closing },
];
