import satori from "satori";
import { backgroundStyle, getFonts } from "./_shared.ts";

type Parameters = {
  size: number;
};

export async function getIconImage({ size }: Parameters) {
  const fonts = await getFonts();
  const fontSize = size * 1;
  const adjustedPosition = size * 0.05;
  return satori({
    type: "div",
    props: {
      children: {
        type: "span",
        props: {
          children: "n′",
          style: {
            position: "relative",
            bottom: `${adjustedPosition}px`,
            left: `${adjustedPosition}px`,
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
