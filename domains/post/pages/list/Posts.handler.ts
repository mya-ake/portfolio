import { page } from "fresh";
import type { FreshContext } from "fresh";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { getPosts as getPostsFromCMS, Posts } from "@shared/post/list.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";
import { pageCacheHeaders } from "@shared/middleware/cache.ts";

export type Data = {
  posts: Posts;
  widgetMap: DefaultAppShellWidgetMap;
};

const getPosts = getUseMicroCMSCache()
  ? createInstantCache("posts")(getPostsFromCMS)
  : getPostsFromCMS;

export const handler = {
  async GET(_ctx: FreshContext) {
    const postsData = await getPosts().then((posts) => ({
      ...posts,
      contents: posts.contents.map(decidePublishedAt),
    }));
    const widgetMap = await getDefaultAppShellWidgetMap();
    const data: Data = {
      posts: postsData,
      widgetMap,
    };
    return page(data, {
      headers: pageCacheHeaders({ time: 60 * 60 * 24 * 7 }),
    });
  },
};
