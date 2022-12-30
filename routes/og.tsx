import { render } from "resvg/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getIconImage, getSquareOgImage } from "@og/generator/mod.ts";
import { Parameter, parseParameter } from "@og/paser/parse_parameter.ts";

function getSvg(parameter: Parameter) {
  switch (parameter.type) {
    case "square":
      return getSquareOgImage({ size: parameter.size });
    case "icon":
      return getIconImage({ size: parameter.size });
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
      switch (parameter.ext) {
        case "svg":
          return createSvgResponse(svg);
        case "png":
          return createPngResponse(svg);
      }
    } catch (error) {
      console.log(error);
      return new Response("Bad Request", { status: 400 });
    }
  },
};
