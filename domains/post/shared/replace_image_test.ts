import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { replaceToOriginalUrl, replaceToReplacedUrl } from "./replace_image.ts";

describe("replaceToOriginalUrl/replaceToReplacedUrl", () => {
  it("can be replaced, and the replacement is restored", () => {
    const originalUrl = new URL("https://example.com/test?w=500");
    const replacedUrlString = replaceToReplacedUrl(originalUrl);
    assertEquals(replacedUrlString, "/posts/images/test?w=500");

    const originalUrlString = replaceToOriginalUrl(
      new URL(replacedUrlString, "https://example.net"),
    );
    assertEquals(originalUrlString, "https://example.com/test?w=500");
  });
});
