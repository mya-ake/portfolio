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

const requestTimeoutMs = 5000;

export async function getMyRepositories(
  octokit: OctokitInstance,
  option?: GetMyRepositoriesInput,
): Promise<Repository[]> {
  const { perPage = 3 } = option ?? {};
  const res = await octokit.request<Repository[]>(
    "GET /users/{username}/repos",
    {
      username: "mya-ake",
      sort: "pushed",
      per_page: perPage,
      request: { signal: AbortSignal.timeout(requestTimeoutMs) },
    },
  );
  return res.data;
}
