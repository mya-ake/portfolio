import type { Handlers } from "$fresh/server.ts";
import type { Repository } from "@shared/github/mod.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";
import {
  getHomeWidgets,
  getPosts,
  getRepositories,
  HomeWidgetMap,
  Posts,
} from "./resource/mod.ts";

export type Data = {
  repositories: Repository[];
  widgetMap: HomeWidgetMap;
  posts: Posts;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repositories = await getRepositories();
    const widgetMap = await getHomeWidgets();
    const posts = await getPosts({ limit: 5 });
    const data: Data = {
      repositories,
      widgetMap,
      posts,
    };

    const resp = await ctx.render(data);
    cacheMiddleware(resp, { time: 60 * 60 * 24 * 7 });
    return resp;
  },
};
