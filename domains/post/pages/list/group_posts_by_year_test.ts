import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { groupPostsByYear, type PostListItem } from "./group_posts_by_year.ts";

const post = (id: string, publishedAt: string): PostListItem => ({
  id,
  title: `title-${id}`,
  publishedAt,
  updatedAt: publishedAt,
  tags: [],
});

describe("groupPostsByYear", () => {
  it("returns an empty array for no posts", () => {
    assertEquals(groupPostsByYear([]), []);
  });

  it("groups a single post under its publishedAt year", () => {
    const p = post("a", "2024-05-12T00:00:00.000Z");
    assertEquals(groupPostsByYear([p]), [{ year: "2024", posts: [p] }]);
  });

  it("orders groups newest-year first", () => {
    const older = post("a", "2022-01-01T00:00:00.000Z");
    const newer = post("b", "2024-03-01T00:00:00.000Z");
    assertEquals(
      groupPostsByYear([older, newer]).map((group) => group.year),
      ["2024", "2022"],
    );
  });

  it("orders posts within a year newest first, regardless of input order", () => {
    const jan = post("jan", "2024-01-10T00:00:00.000Z");
    const dec = post("dec", "2024-12-20T00:00:00.000Z");
    const jun = post("jun", "2024-06-15T00:00:00.000Z");
    const [group] = groupPostsByYear([jan, dec, jun]);
    assertEquals(group.posts.map((p) => p.id), ["dec", "jun", "jan"]);
  });

  it("buckets posts of interleaved years into the correct groups", () => {
    const y2024a = post("2024a", "2024-02-01T00:00:00.000Z");
    const y2023 = post("2023", "2023-08-01T00:00:00.000Z");
    const y2024b = post("2024b", "2024-09-01T00:00:00.000Z");
    assertEquals(groupPostsByYear([y2024a, y2023, y2024b]), [
      { year: "2024", posts: [y2024b, y2024a] },
      { year: "2023", posts: [y2023] },
    ]);
  });
});
