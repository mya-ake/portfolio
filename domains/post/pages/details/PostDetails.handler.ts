import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { isFetchError } from "@shared/fetch/error.ts";
import type { Handlers } from "$fresh/server.ts";
import type { Post } from "@shared/micro_cms/type.ts";

export type Data = {
  post: Post;
};

function getPost(id: string) {
  const client = getMicroCmsClient();
  return client.get<Post>({
    resource: "posts",
    id,
    richEditorFormat: "html",
  });
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    try {
      const id = ctx.params.id;
      const post = await getPost(id);
      const data: Data = { post };
      const resp = await ctx.render(data);
      return resp;
    } catch (error) {
      if (isFetchError(error)) {
        if (error.response.status === 404) {
          return ctx.renderNotFound();
        }
      }
      return Promise.reject(error);
    }
  },
};
