import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { FetchError, isFetchError } from "./error.ts";

describe("isFetchError", () => {
  it(`return 'true' when input is FetchError`, () => {
    const input = new FetchError("test", new Response());
    const result = isFetchError(input);
    assertEquals(result, true);
  });

  it(`return 'false' when input is Error`, () => {
    const input = new Error("test");
    const result = isFetchError(input);
    assertEquals(result, false);
  });
});
