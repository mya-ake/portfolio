import { getMyRepositories, getOctokit } from "@shared/github/mod.ts";

export function getRepositories() {
  const oktkit = getOctokit();
  return getMyRepositories(oktkit, { perPage: 5 }).catch(() => []);
}
