import { render } from "resvg/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getSquareOgImage } from "@og/mod.ts";

export const handler: Handlers = {
  async GET() {
    const svg = await getSquareOgImage({ size: 600 });
    const data = await render(svg);
    const res = new Response(data, { status: 200 });
    res.headers.set("content-type", "image/png");
    return res;
  },
};
