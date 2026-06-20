import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { getSocialItems } from "./social.ts";

describe("getSocialItems", () => {
  it("returns the three profile social links in order, with their URIs", () => {
    assertEquals(
      getSocialItems().map((item) => item.uri),
      [
        "https://github.com/mya-ake",
        "https://twitter.com/mya_ake",
        "https://zenn.dev/mya_ake",
      ],
    );
  });

  it("shapes every item with label, name, and uri fields", () => {
    for (const item of getSocialItems()) {
      assertEquals(Object.keys(item).sort(), ["label", "name", "uri"]);
    }
  });
});
