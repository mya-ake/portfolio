import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { getPosts as getPostsFromCMS, Posts } from "@shared/post/list.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";
import type { Handlers } from "$fresh/server.ts";

export type Data = {
  posts: Posts;
  widgetMap: DefaultAppShellWidgetMap;
};

const getPosts = getUseMicroCMSCache()
  ? createInstantCache("posts")(getPostsFromCMS)
  : getPostsFromCMS;

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const postsData = await getPosts().then((posts) => ({
      ...posts,
      contents: posts.contents.map(decidePublishedAt),
    }));
    const widgetMap = await getDefaultAppShellWidgetMap();
    const data: Data = {
      posts: postsData,
      widgetMap,
    };
    const resp = await ctx.render(data);
    return resp;
  },
};
