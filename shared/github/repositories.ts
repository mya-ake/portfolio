import type { OctokitInstance } from "./core.ts";

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
};

type GetMyRepositoriesInput = {
  perPage?: number;
};

export function getMyRepositories(
  octokit: OctokitInstance,
  option?: GetMyRepositoriesInput,
): Promise<Repository[]> {
  const { perPage = 3 } = option ?? {};
  return Promise.race([
    octokit.request<Repository[]>(
      "GET /users/{username}/repos",
      {
        username: "mya-ake",
        sort: "pushed",
        per_page: perPage,
      },
    ).then((res) => res.data),
  ]).catch((err: unknown) => {
    return Promise.reject(err);
  });
}
