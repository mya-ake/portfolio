import { render } from "resvg/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getIconImage, getSquareOgImage } from "@og/generator/mod.ts";
import { parseParameter } from "@og/paser/parse_parameter.ts";

function getSvg(url: URL) {
  const parameter = parseParameter(url);
  switch (parameter.type) {
    case "square":
      return getSquareOgImage({ size: parameter.size });
    case "icon":
      return getIconImage({ size: parameter.size });
    default:
      throw new Error("");
  }
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    try {
      const svg = await getSvg(url);
      const data = await render(svg);
      const res = new Response(data, { status: 200 });
      res.headers.set("content-type", "image/png");
      return res;
    } catch (error) {
      console.log(error);
      return new Response("Bad Request", { status: 400 });
    }
  },
};
