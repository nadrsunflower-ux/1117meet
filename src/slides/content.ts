/**
 * Facts used across slides — edit here once.
 *
 * Track list and count follow the official pop-up poster (IMG_2383):
 * "비행 / 향기 / 계절비 / 나도 모르게 / 송가 / 이유 — 6가지의 향기".
 */
export const TRACKS = [
  { no: "01", name: "비행", tint: "159, 180, 199" },
  { no: "02", name: "향기", tint: "215, 181, 174" },
  { no: "03", name: "계절비", tint: "143, 169, 163" },
  { no: "04", name: "나도 모르게", tint: "179, 166, 201" },
  { no: "05", name: "송가", tint: "216, 194, 154" },
  { no: "06", name: "이유", tint: "167, 162, 155" },
] as const;

export const TRACK_COUNT = TRACKS.length;
