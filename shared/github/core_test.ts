import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { getOctokit } from "./core.ts";

describe("getOctokit", () => {
  it("the same instance is returned even ef it is retrived multiple times", () => {
    const firstOctokit = getOctokit();
    const secondOctokit = getOctokit();
    assertEquals(firstOctokit, secondOctokit);
  });
});
