import { render } from "resvg/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getIconImage, getSquareOgImage } from "@og/mod.ts";

function getSvg(url: URL) {
  const type = url.searchParams.get("type") ?? "square";
  switch (type) {
    case "square":
      return getSquareOgImage({ size: 600 });
    case "icon":
      return getIconImage({ size: 200 });
    default:
      return "";
  }
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const svg = await getSvg(url);
    if (svg.length === 0) {
      return new Response("Bad Reuest", { status: 400 });
    }
    const data = await render(svg);
    const res = new Response(data, { status: 200 });
    res.headers.set("content-type", "image/png");
    return res;
  },
};
