import type { OctokitInstance } from "./core.ts";

export type MockOption = {
  request?: (
    resource: string,
    input?: Record<string, unknown>,
  ) => Promise<unknown>;
};

export function createOctokitMock(option: MockOption): OctokitInstance {
  return {
    request: option.request,
  } as OctokitInstance;
}
