# Scent of a Song — 미팅용 슬라이드 웹사이트

Next.js 16 · Tailwind CSS 4 · Framer Motion

## 실행

```bash
npm install
npm run build && npm start   # http://localhost:3000  (미팅 때는 이 방식 권장)
npm run dev                  # 수정하면서 볼 때
```

## 조작

| 키 | 동작 |
| --- | --- |
| → ↓ Space Enter / ← ↑ | 다음 / 이전 |
| G | 목차 (좌측 하단 숫자 클릭도 가능) |
| F | 전체 화면 |
| Home / End | 처음 / 끝 |

트랙패드·휠은 한 번 스크롤에 한 장, 터치는 스와이프. 주소 `#7` 은 7번 슬라이드로 바로 열립니다.
마우스를 2.6초 움직이지 않으면 커서가 숨겨집니다.

## 구조

- `src/slides/` — 슬라이드별 문구·이미지 (`index.ts` 가 순서)
- `src/slides/content.ts` — 수록곡 목록·곡 수 (한 곳에서 수정)
- `src/deck/` — 1920×1080 스테이지, 그리드, 애니메이션, 네비게이션
- `src/assets/` — 원본 사진 복사본 (`IMG_2383` → `elegy-poster.jpg` 등, `slides/assets.ts` 주석 참고)

모든 슬라이드는 1920×1080 고정 캔버스에 그린 뒤 화면 크기에 맞춰 통째로 확대·축소합니다.
노트북·외부 모니터·프로젝터 어디서든 간격과 줄바꿈이 같습니다.
