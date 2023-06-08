import { stringify } from "xml";
import { createStaticItems } from "./_static.ts";
import { createPostsItems } from "./_posts.ts";

export async function createSitemap() {
  const staticItems = await createStaticItems();
  const postsItems = await createPostsItems();

  return stringify({
    urlset: {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      url: [...staticItems, ...postsItems],
    },
  });
}
