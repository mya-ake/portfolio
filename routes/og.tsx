import { render } from "resvg/mod.ts";
import { Handlers } from "$fresh/server.ts";
import {
  getIconImage,
  getSquareOgImage,
  getTextOgImage,
} from "@og/generator/mod.ts";
import { Parameter, parseParameter } from "@og/paser/parse_parameter.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";

function getSvg(parameter: Parameter) {
  switch (parameter.type) {
    case "square":
      return getSquareOgImage({ size: parameter.size });
    case "icon":
      return getIconImage({ size: parameter.size });
    case "text":
      return getTextOgImage({ size: parameter.size, text: parameter.text });
    default:
      throw new Error("");
  }
}

function createSvgResponse(svg: string) {
  return new Response(svg, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml",
    },
  });
}

async function createPngResponse(svg: string) {
  const data = await render(svg);
  return new Response(data, {
    status: 200,
    headers: {
      "content-type": "image/png",
    },
  });
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    try {
      const parameter = parseParameter(url);
      const svg = await getSvg(parameter);
      let response: Response;
      switch (parameter.ext) {
        case "svg":
          response = createSvgResponse(svg);
          break;
        case "png":
          response = await createPngResponse(svg);
          break;
      }
      cacheMiddleware(response, { time: 60 * 60 * 24 * 7 * 4 });
      return response;
    } catch (error) {
      console.log(error);
      return new Response("Bad Request", { status: 400 });
    }
  },
};
