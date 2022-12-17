import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { Handlers } from "$fresh/server.ts";
import { getRedHatDisplay } from "@shared/font/mod.ts";

export const handler: Handlers = {
  async GET() {
    const fontData = await getRedHatDisplay();
    const svg = await satori(
      {
        type: "div",
        props: {
          children: {
            type: "span",
            props: {
              children: "neko-note′",
              style: {
                fontSize: "80px",
              },
            },
          },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1e293b",
            fontFamily: "Red_Hat_Display",
            color: "#f3f4f6",
          },
        },
      },
      {
        width: 600,
        height: 600,
        fonts: [
          {
            name: "Red_Hat_Display",
            data: fontData.buffer,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const res = new Response(pngBuffer, { status: 200 });
    res.headers.set("content-type", "image/png");
    return res;
  },
};
