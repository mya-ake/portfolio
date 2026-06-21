import { page } from "fresh";
import type { Context } from "fresh";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { getAllPosts as getPostsFromCMS, Posts } from "@shared/post/list.ts";
import { pageCacheHeaders } from "@shared/middleware/cache.ts";

export type Data = {
  posts: Posts;
  widgetMap: DefaultAppShellWidgetMap;
};

// The archive renders every published post grouped by year, so fetch the whole
// list (offset pagination handles counts beyond MicroCMS's 100/request cap).
const getPosts = getUseMicroCMSCache()
  ? createInstantCache("posts")(getPostsFromCMS)
  : getPostsFromCMS;

export const handler = {
  async GET(_ctx: Context<unknown>) {
    const postsData = await getPosts();
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
