import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { getSquareOgImage } from "./square.ts";

describe("getSquareOgImage", () => {
  it("no error", async () => {
    const svg = await getSquareOgImage({ size: 100 });
    assertEquals(typeof svg === "string", true);
  });
});
