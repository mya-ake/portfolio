import type { Handlers } from "$fresh/server.ts";
import {
  getMyRepositories,
  getOctokit,
  Repository,
} from "@shared/github/mod.ts";

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
    return ctx.render(data);
  },
};
