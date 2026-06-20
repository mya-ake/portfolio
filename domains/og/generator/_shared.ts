import { getNotoSansJP, getSchibstedGrotesk } from "@shared/font/mod.ts";
import type { SatoriOptions } from "satori";

export async function getFonts() {
  const fontData1 = await getSchibstedGrotesk();
  const fontData2 = await getNotoSansJP();
  const fonts: SatoriOptions["fonts"] = [
    {
      name: "Schibsted_Grotesk",
      data: fontData1.buffer,
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto_Sans_JP",
      data: fontData2.buffer,
      weight: 400,
      style: "normal",
    },
  ];
  return fonts;
}

// Editorial palette (S01 tokens): deep neutral background, soft off-white text.
export const backgroundStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#141416",
  fontFamily: "Schibsted_Grotesk",
  color: "#ededee",
};

export const textStyle = {
  fontFamily: "Noto_Sans_JP",
  wordBreak: "break-all",
  textAlign: "left",
};
