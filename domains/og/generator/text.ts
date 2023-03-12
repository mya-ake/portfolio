import satori from "satori";
import { backgroundStyle, getFonts, textStyle } from "./_shared.ts";

type Parameters = {
  text: string;
  size: number;
};

export async function getTextOgImage({ text, size }: Parameters) {
  const fonts = await getFonts();
  const width = size;
  const height = width * 9 / 16;
  const textFontSize = size * 0.05;
  const siteFontSize = size * 0.05;
  const siteRightPosition = size * 0.02;
  const siteBottomPosition = size * 0.01;

  return satori({
    type: "div",
    props: {
      children: [{
        type: "div",
        props: {
          children: {
            type: "span",
            props: {
              children: text,
              style: {
                ...textStyle,
                fontSize: `${textFontSize}px`,
                width: "80%",
              },
            },
          },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          },
        },
      }, {
        type: "span",
        props: {
          children: "neko-note′",
          style: {
            fontSize: `${siteFontSize}px`,
            position: "absolute",
            right: `${siteRightPosition}px`,
            bottom: `${siteBottomPosition}px`,
          },
        },
      }],
      style: backgroundStyle,
    },
  }, {
    width,
    height,
    fonts,
  });
}
