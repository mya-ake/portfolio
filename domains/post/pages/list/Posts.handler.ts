import { getMicroCmsClient } from "@shared/micro_cms/core.ts";
import type { Handlers } from "$fresh/server.ts";
import type { Posts as OriginalPosts } from "@shared/micro_cms/type.ts";

const fields = ["id", "title", "publishedAt", "updatedAt"] as const;
type Posts = OriginalPosts<(typeof fields)[number]>;

export type Data = {
  posts: Posts;
};

function getPosts() {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields: fields.join(","),
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
