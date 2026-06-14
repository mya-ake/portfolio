import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { replaceToOriginalUrl, replaceToReplacedUrl } from "./replace_image.ts";

const ASSETS = "https://images.microcms-assets.io";
const SITE = "https://mya-ake.com";

describe("replaceToReplacedUrl", () => {
  it("rewrites a MicroCMS assets URL to the same-origin proxy path", () => {
    const url = new URL(`${ASSETS}/assets/svc/file/neko.png?w=500`);
    assertEquals(
      replaceToReplacedUrl(url),
      "/posts/images/assets/svc/file/neko.png?w=500",
    );
  });

  it("leaves a non-MicroCMS image URL untouched (not proxied)", () => {
    const url = new URL("https://example.com/img.png?w=1");
    assertEquals(replaceToReplacedUrl(url), "https://example.com/img.png?w=1");
  });
});

describe("replaceToOriginalUrl", () => {
  it("reconstructs the MicroCMS URL from the proxy request with no prior render call (stateless)", () => {
    // Deliberately does NOT call replaceToReplacedUrl first: proves the module
    // keeps no shared state, so a cold instance / concurrent request is correct.
    const req = new URL("/posts/images/assets/svc/file/neko.png?w=500", SITE);
    assertEquals(
      replaceToOriginalUrl(req),
      `${ASSETS}/assets/svc/file/neko.png?w=500`,
    );
  });

  it("drops the Fresh __frsh_c cache-busting query param", () => {
    const req = new URL(
      "/posts/images/assets/x/y/z.png?w=500&__frsh_c=abc",
      SITE,
    );
    assertEquals(replaceToOriginalUrl(req), `${ASSETS}/assets/x/y/z.png?w=500`);
  });
});

describe("round trip", () => {
  it("restores the original MicroCMS URL", () => {
    const original = new URL(`${ASSETS}/assets/x/y/z.png?w=500`);
    const replaced = replaceToReplacedUrl(original);
    assertEquals(
      replaceToOriginalUrl(new URL(replaced, SITE)),
      original.toString(),
    );
  });
});
