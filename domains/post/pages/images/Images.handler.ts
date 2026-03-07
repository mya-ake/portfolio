import { replaceToOriginalUrl } from "@post/shared/replace_image.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";
import type { Context } from "fresh";

export const handler = {
  async GET(ctx: Context<unknown>) {
    try {
      const req = ctx.req;
      const originalUrl = replaceToOriginalUrl(new URL(req.url));
      const response = await fetch(originalUrl);
      cacheMiddleware(response, { time: 60 * 60 * 24 * 365 });
      return response;
    } catch (error) {
      console.log(error);
      return new Response("Bad Request", { status: 400 });
    }
  },
};
