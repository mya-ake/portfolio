import { Handlers } from "$fresh/server.ts";
import { createSitemap } from "@sitemap/mod.ts";

export const handler: Handlers = {
  async GET() {
    const sitemap = await createSitemap();
    return new Response(sitemap, {
      status: 200,
      headers: {
        "content-type": "application/xml",
      },
    });
  },
};
