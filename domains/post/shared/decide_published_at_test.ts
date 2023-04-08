import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertObjectMatch } from "std/testing/asserts.ts";
import { decidePublishedAt } from "./decide_published_at.ts";

describe("decidePublishedAt", () => {
  it("replaces publishedAt to publicationDate", () => {
    const publishedAt = new Date().toDateString();
    const publicationDate = new Date().toDateString();
    const post = decidePublishedAt({ publishedAt, publicationDate });
    assertObjectMatch(post, { publishedAt: publicationDate });
  });

  it("publishedAt is not changed", () => {
    const publishedAt = new Date().toDateString();
    const post = decidePublishedAt({ publishedAt });
    assertEquals(post, { publishedAt });
  });
});
