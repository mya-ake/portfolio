import type { Handlers } from "$fresh/server.ts";
import {
  getMyRepositories,
  getOctokit,
  Repository,
} from "@shared/github/mod.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";
import { getWidgets, WidgetMap } from "@shared/widget/mod.ts";

const widgetIds = ["home_about", "home_recent_activities"] as const;
type WidgetId = typeof widgetIds[number];
export type Data = {
  repositories: Repository[];
  widgetMap: WidgetMap<WidgetId>;
};

function getRepositories() {
  const oktkit = getOctokit();
  return getMyRepositories(oktkit, { perPage: 5 }).catch(() => []);
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repositories = await getRepositories();
    const widgetMap = await getWidgets<WidgetId>(widgetIds);
    const data: Data = {
      repositories,
      widgetMap,
    };

    const resp = await ctx.render(data);
    cacheMiddleware(resp, { time: 60 * 60 * 24 * 7 });
    return resp;
  },
};
