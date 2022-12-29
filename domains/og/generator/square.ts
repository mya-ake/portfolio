import satori from "satori";
import { backgroundStyle, getFonts } from "./_shared.ts";

type Parameters = {
  size: number;
};

export async function getSquareOgImage({ size }: Parameters) {
  const fonts = await getFonts();
  const fontSize = size * 0.15;
  return satori({
    type: "div",
    props: {
      children: {
        type: "span",
        props: {
          children: "neko-note′",
          style: {
            fontSize: `${fontSize}px`,
          },
        },
      },
      style: backgroundStyle,
    },
  }, {
    width: size,
    height: size,
    fonts,
  });
}
