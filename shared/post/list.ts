import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import { getUsePostsFilter } from "@shared/env/mod.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";

import type {
  Content,
  MicroCMSList,
  Post as OriginalPost,
  Tag as OriginalTag,
} from "@shared/micro_cms/type.ts";

const postFields = [
  "id",
  "title",
  "manualPublishedAt",
  "publishedAt",
  "updatedAt",
] as const;
const tagFields = ["id", "title", "status"] as const;
const fields = createFields<OriginalPost>(postFields, {
  tags: tagFields,
});

type Tag = Pick<OriginalTag, typeof tagFields[number]>;
type Post = Pick<OriginalPost, typeof postFields[number]> & {
  tags: Tag[];
};
type DisplayPost = Omit<Post, "manualPublishedAt">;
export type Posts = MicroCMSList<DisplayPost>;

export type GetPostOption = {
  limit?: number;
};

// MicroCMS caps `limit` at 100 items per request.
const PAGE_SIZE = 100;

/**
 * Fetches every item of a MicroCMS list by offset pagination — page 0, then the
 * running count, and so on, until `contents.length === totalCount`. Pure and
 * injectable: the caller supplies the per-offset page fetcher, so this has no
 * dependency on the client or env (and is unit-testable without either). Stops
 * defensively if a page comes back empty while more were expected, so a
 * malformed response cannot loop forever.
 */
export async function paginateAll<
  // deno-lint-ignore no-explicit-any
  C extends Content<any>,
>(
  fetchPage: (offset: number) => Promise<MicroCMSList<C>>,
): Promise<MicroCMSList<C>> {
  const first = await fetchPage(0);
  const contents: C[] = [...first.contents];
  while (contents.length < first.totalCount) {
    const page = await fetchPage(contents.length);
    if (page.contents.length === 0) break;
    contents.push(...page.contents);
  }
  return { ...first, contents, offset: 0, limit: first.totalCount };
}

function fetchPostsPage(
  params: { limit: number; offset?: number },
): Promise<Posts> {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields,
    orders: "-publishedAt",
    limit: params.limit,
    // Only send `offset` when set, so `getPosts` keeps its original request URL
    // (the client serializes every key, including an explicit `undefined`).
    ...(params.offset === undefined ? {} : { offset: params.offset }),
    filters: getUsePostsFilter() ? "tags[contains]post" : "",
  }).then((data) => {
    return {
      ...data,
      contents: data.contents.map(decidePublishedAt),
    };
  });
}

export function getPosts(option?: GetPostOption): Promise<Posts> {
  return fetchPostsPage({ limit: option?.limit ?? 10 });
}

export function getAllPosts(): Promise<Posts> {
  return paginateAll<DisplayPost>((offset) =>
    fetchPostsPage({ limit: PAGE_SIZE, offset })
  );
}
