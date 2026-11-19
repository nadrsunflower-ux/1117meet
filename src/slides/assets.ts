import elegyCompose from "@/assets/elegy-compose.jpg"; // IMG_2384
import elegyGoods from "@/assets/elegy-goods.jpg"; // IMG_2386
import elegyMediaart from "@/assets/elegy-mediaart.jpg"; // IMG_2385
import elegyPoster from "@/assets/elegy-poster.jpg"; // IMG_2383
import elegyWall from "@/assets/elegy-wall.jpg"; // IMG_2387
import ymj1 from "@/assets/ymj-1.jpg"; // 유명종1
import ymj2 from "@/assets/ymj-2.jpg"; // 유명종2
import ymj3 from "@/assets/ymj-3.jpg"; // 유명종3
import ymj4 from "@/assets/ymj-4.jpg"; // 유명종4

export const IMG = {
  elegyCompose,
  elegyGoods,
  elegyMediaart,
  elegyPoster,
  elegyWall,
  ymj1,
  ymj2,
  ymj3,
  ymj4,
};

/** Every image URL, warmed into the cache on load so slides never pop in. */
export const PRELOAD = Object.values(IMG).map((img) => img.src);
