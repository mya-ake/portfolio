import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import type { Handlers } from "$fresh/server.ts";
import type {
  MicroCMSList,
  Post as OriginalPost,
  Tag as OriginalTag,
} from "@shared/micro_cms/type.ts";

const postFields = [
  "id",
  "title",
  "publishedAt",
  "updatedAt",
] as const;
const tagFields = ["id", "title"] as const;
const fields = createFields<OriginalPost>(postFields, {
  tags: tagFields,
});

type Tag = Pick<OriginalTag, typeof tagFields[number]>;
type Post = Pick<OriginalPost, typeof postFields[number]> & {
  tags: Tag[];
};
type Posts = MicroCMSList<Post>;

export type Data = {
  posts: Posts;
};

function getPosts() {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields,
    orders: "-publishedAt",
    limit: 10,
  });
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const postsData = await getPosts();
    const data: Data = {
      posts: postsData,
    };
    const resp = await ctx.render(data);
    return resp;
  },
};
