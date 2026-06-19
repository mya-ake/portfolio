import { page } from "fresh";
import type { Context } from "fresh";
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

// The archive renders every published post grouped by year, so fetch the whole
// list in one request. MicroCMS caps `limit` at 100/request; the post count is
// well under that, so a single raised-limit request is enough (paginate-all is
// deferred until the count approaches 100 — see stack Follow-ups).
const POSTS_ARCHIVE_LIMIT = 100;

export const handler = {
  async GET(_ctx: Context<unknown>) {
    const postsData = await getPosts({ limit: POSTS_ARCHIVE_LIMIT }).then(
      (posts) => ({
        ...posts,
        contents: posts.contents.map(decidePublishedAt),
      }),
    );
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
