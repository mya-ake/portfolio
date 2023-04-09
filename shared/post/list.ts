import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import { getUsePostsFilter } from "@shared/env/mod.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";

import type {
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

export function getPosts(option?: GetPostOption): Promise<Posts> {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields,
    orders: "-publishedAt",
    limit: option?.limit ?? 10,
    filters: getUsePostsFilter() ? "tags[contains]post" : "",
  }).then((data) => {
    return {
      ...data,
      contents: data.contents.map(decidePublishedAt),
    };
  });
}
