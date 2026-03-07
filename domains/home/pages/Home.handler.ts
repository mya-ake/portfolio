import { page } from "fresh";
import type { Context } from "fresh";
import type { Repository } from "@shared/github/mod.ts";
import { pageCacheHeaders } from "@shared/middleware/cache.ts";
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

export const handler = {
  async GET(_ctx: Context<unknown>) {
    const [repositories, widgetMap, posts] = await Promise.all([
      getRepositories(),
      getHomeWidgets(),
      getPosts({ limit: 5 }),
    ]);
    const data: Data = {
      repositories,
      widgetMap,
      posts,
    };
    return page(data, {
      headers: pageCacheHeaders({ time: 60 * 60 * 24 * 7 }),
    });
  },
};
