import type { Handlers } from "$fresh/server.ts";
import {
  getMyRepositories,
  getOctokit,
  Repository,
} from "@shared/github/mod.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";

export type Data = {
  repositories: Repository[];
};

function getRepositories() {
  const oktkit = getOctokit();
  return getMyRepositories(oktkit, { perPage: 5 }).catch(() => []);
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repositories = await getRepositories();
    const data: Data = { repositories };

    const resp = await ctx.render(data);
    cacheMiddleware(resp, { time: 60 * 60 * 24 * 7 });
    return resp;
  },
};
