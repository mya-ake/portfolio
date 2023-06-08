import { Handlers } from "$fresh/server.ts";
import { createSitemap } from "@sitemap/mod.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";

export const handler: Handlers = {
  async GET() {
    const sitemap = await createSitemap();

    const resp = new Response(sitemap, {
      status: 200,
      headers: {
        "content-type": "application/xml",
      },
    });
    cacheMiddleware(resp, { time: 60 * 60 * 12 });
    return resp;
  },
};
