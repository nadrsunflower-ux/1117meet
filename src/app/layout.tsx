import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scent of a Song — AC’SCENT Artist Scent Experience",
  description: "아티스트 커스텀 향 팬 이벤트 — 행사 진행 과정과 굿즈 소개",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0f10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={cormorant.variable}>
      <body>{children}</body>
    </html>
  );
}
