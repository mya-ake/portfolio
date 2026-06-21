import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertObjectMatch } from "std/assert/mod.ts";
import { decidePublishedAt } from "./decide_published_at.ts";

describe("decidePublishedAt", () => {
  it("replaces publishedAt to publicationDate", () => {
    const publishedAt = new Date().toDateString();
    const manualPublishedAt = new Date().toDateString();
    const post = decidePublishedAt({ publishedAt, manualPublishedAt });
    assertObjectMatch(post, { publishedAt: manualPublishedAt });
  });

  it("publishedAt is not changed", () => {
    const publishedAt = new Date().toDateString();
    const post = decidePublishedAt({ publishedAt });
    assertEquals(post, { publishedAt });
  });
});
