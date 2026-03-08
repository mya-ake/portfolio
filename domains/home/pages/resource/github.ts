import {
  getMyRepositories,
  getOctokit,
  type Repository,
} from "@shared/github/mod.ts";

export function getRepositories(): Promise<Repository[]> {
  const oktkit = getOctokit();
  return getMyRepositories(oktkit, { perPage: 5 }).catch(() => []);
}
