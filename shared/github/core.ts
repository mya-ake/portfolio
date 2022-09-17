import { Octokit } from "octokit";

// The Octokit type is "any", so I define the minimum myself.
type RequestInput = Record<string, unknown>;
type RequestResponse<D> = {
  data: D;
};
export type OctokitInstance = {
  request: <D>(
    resource: string,
    input?: RequestInput,
  ) => Promise<RequestResponse<D>>;
};

let octokit: Octokit;
export function getOctokit(): OctokitInstance {
  if (!octokit) {
    octokit = new Octokit({
      throttle: { enabled: false },
    });
  }
  return octokit;
}
