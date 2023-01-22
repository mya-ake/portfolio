import type { Handlers } from "$fresh/server.ts";
import type { Posts } from "@shared/micro_cms/type.ts";

export type Data = {
  posts: Posts;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const data: Data = {
      posts: { contents: [], totalCount: 0, limit: 0, offset: 0 },
    };
    const resp = await ctx.render(data);
    return resp;
  },
};
