import { createLoc, formatDate } from "./_utils.ts";
import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import type { Item } from "./type.ts";
import type {
  MicroCMSList,
  Post as OriginalPost,
} from "@shared/micro_cms/type.ts";

const postFields = ["id", "updatedAt"] as const;
const fields = createFields(postFields);
type Post = Pick<OriginalPost, typeof postFields[number]>;
export type Posts = MicroCMSList<Post>;

function _getPosts() {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields,
    orders: "-updatedAt",
    limit: 100,
    filters: "tags[contains]post",
  });
}

export async function createPostsItems() {
  const posts = await _getPosts();

  const postsItems = posts.contents.map<Item>(({ id, updatedAt }) => ({
    loc: createLoc(`/posts/${id}`),
    lastmod: formatDate(updatedAt),
  }));

  const lastUpadtedAt = posts.contents.at(0)?.updatedAt;

  const items: Item[] = [
    {
      loc: createLoc("/posts"),
      lastmod: lastUpadtedAt && formatDate(lastUpadtedAt),
    },
    ...postsItems,
  ];

  return items;
}
