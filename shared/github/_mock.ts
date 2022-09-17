import type { OctokitInstance } from "./core.ts";

export type MockOption = {
  request?: () => Promise<unknown>;
};

export function createOctokitMock(option: MockOption): OctokitInstance {
  return {
    request: option.request,
  } as OctokitInstance;
}
