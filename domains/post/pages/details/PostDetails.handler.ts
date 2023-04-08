import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { isFetchError } from "@shared/fetch/error.ts";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";
import type { Handlers } from "$fresh/server.ts";
import type { Post } from "@shared/micro_cms/type.ts";

export type Data = {
  post: Omit<Post, "manualPublishedAt">;
  widgetMap: DefaultAppShellWidgetMap;
};

function getPostFromCMS(id: string) {
  const client = getMicroCmsClient();
  return client.get<Post>({
    resource: "posts",
    id,
    richEditorFormat: "html",
  });
}

const getPost = getUseMicroCMSCache()
  ? createInstantCache("post_details")(getPostFromCMS)
  : getPostFromCMS;

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    try {
      const id = ctx.params.id;
      const post = await getPost(id).then(decidePublishedAt);
      const widgetMap = await getDefaultAppShellWidgetMap();
      const data: Data = { post, widgetMap };
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
