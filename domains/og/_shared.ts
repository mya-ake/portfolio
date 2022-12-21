import { getRedHatDisplay } from "@shared/font/mod.ts";
import type { SatoriOptions } from "satori";

export async function getFonts() {
  const fontData = await getRedHatDisplay();
  const fonts: SatoriOptions["fonts"] = [
    {
      name: "Red_Hat_Display",
      data: fontData.buffer,
      weight: 400,
      style: "normal",
    },
  ];
  return fonts;
}

export const backgroundStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#1e293b",
  fontFamily: "Red_Hat_Display",
  color: "#f3f4f6",
};
