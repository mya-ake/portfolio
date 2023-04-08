import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache, getUsePostsFilter } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";
import type { Handlers } from "$fresh/server.ts";
import type {
  MicroCMSList,
  Post as OriginalPost,
  Tag as OriginalTag,
} from "@shared/micro_cms/type.ts";

const postFields = [
  "id",
  "title",
  "publicationDate",
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
type DisplayPost = Omit<Post, "publicationDate">;
type Posts = MicroCMSList<Post>;

export type Data = {
  posts: MicroCMSList<DisplayPost>;
  widgetMap: DefaultAppShellWidgetMap;
};

function getPostsFromCMS() {
  const client = getMicroCmsClient();
  return client.get<Posts>({
    resource: "posts",
    fields,
    orders: "-publishedAt",
    limit: 10,
    filters: getUsePostsFilter() ? "tags[contains]post" : "",
  });
}

const getPosts = getUseMicroCMSCache()
  ? createInstantCache("posts")(getPostsFromCMS)
  : getPostsFromCMS;

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const postsData = await getPosts().then((posts) => ({
      ...posts,
      contents: posts.contents.map(decidePublishedAt),
    }));
    const widgetMap = await getDefaultAppShellWidgetMap();
    const data: Data = {
      posts: postsData,
      widgetMap,
    };
    const resp = await ctx.render(data);
    return resp;
  },
};
