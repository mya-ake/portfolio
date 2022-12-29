import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { getIconImage } from "./icon.ts";

describe("getIconImage", () => {
  it("no error", async () => {
    const svg = await getIconImage({ size: 100 });
    assertEquals(typeof svg === "string", true);
  });
});
