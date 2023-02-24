import { beforeEach, describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { MemoryCache } from "./memory_cache.ts";

type TestCache = {
  key1: string;
};

describe("MemoryCache", () => {
  let cache: MemoryCache<TestCache>;
  beforeEach(() => {
    cache = new MemoryCache();
  });

  it("returns undefined if value is not set", () => {
    const value = cache.get("key1");
    assertEquals(value, undefined);
  });

  it("returns set value if value is set", () => {
    cache.put("key1", "test");
    const value = cache.get("key1");
    assertEquals(value, "test");
  });
});
