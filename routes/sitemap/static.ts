import { Handlers } from "$fresh/server.ts";
import { createStaticSitemap } from "@sitemap/static.ts";

export const handler: Handlers = {
  async GET() {
    const sitemap = await createStaticSitemap();
    return new Response(sitemap, {
      status: 200,
      headers: {
        "content-type": "application/xml",
      },
    });
  },
};
