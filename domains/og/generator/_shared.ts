import { getNotoSansJP, getRedHatDisplay } from "@shared/font/mod.ts";
import type { SatoriOptions } from "satori";

export async function getFonts() {
  const fontData1 = await getRedHatDisplay();
  const fontData2 = await getNotoSansJP();
  const fonts: SatoriOptions["fonts"] = [
    {
      name: "Red_Hat_Display",
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

export const backgroundStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#1e293b",
  fontFamily: "Red_Hat_Display",
  color: "#f3f4f6",
};

export const textStyle = {
  fontFamily: "Noto_Sans_JP",
  wordBreak: "break-all",
  textAlign: "left",
};
