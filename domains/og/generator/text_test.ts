import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { getTextOgImage } from "./text.ts";

describe("getTextOrImage", () => {
  it("no error", async () => {
    const svg = await getTextOgImage({ text: "日本語のテキスト", size: 100 });
    assertEquals(typeof svg === "string", true);
  });
});
