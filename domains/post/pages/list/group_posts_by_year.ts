import { formatDate } from "@shared/date/format.ts";
import type { Posts } from "@shared/post/list.ts";

export type PostListItem = Posts["contents"][number];

export type PostYearGroup = {
  year: string;
  posts: PostListItem[];
};

// Groups posts into year buckets keyed by the year of `publishedAt`. The result
// does not depend on the input order: groups are ordered newest-year-first and,
// within each year, posts are ordered newest first.
export function groupPostsByYear(posts: PostListItem[]): PostYearGroup[] {
  const byYear = new Map<string, PostListItem[]>();
  for (const post of posts) {
    const year = formatDate(post.publishedAt, "YYYY");
    const bucket = byYear.get(year);
    if (bucket) {
      bucket.push(post);
    } else {
      byYear.set(year, [post]);
    }
  }
  return [...byYear.entries()]
    .map(([year, items]) => ({
      year,
      posts: [...items].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt)
      ),
    }))
    .sort((a, b) => b.year.localeCompare(a.year));
}
