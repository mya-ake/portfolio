import { HttpError, page } from "fresh";
import type { FreshContext } from "fresh";
import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { isFetchError } from "@shared/fetch/error.ts";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import {
  DefaultAppShellWidgetMap,
  getDefaultAppShellWidgetMap,
} from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";
import { decidePublishedAt } from "@post/shared/decide_published_at.ts";
import { pageCacheHeaders } from "@shared/middleware/cache.ts";
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

export const handler = {
  async GET(ctx: FreshContext) {
    try {
      const id = ctx.params.id;
      const post = await getPost(id).then(decidePublishedAt);
      const widgetMap = await getDefaultAppShellWidgetMap();
      const data: Data = { post, widgetMap };
      return page(data, {
        headers: pageCacheHeaders({ time: 60 * 60 * 24 * 7 }),
      });
    } catch (error) {
      if (isFetchError(error)) {
        if (error.response.status === 404) {
          throw new HttpError(404);
        }
      }
      return Promise.reject(error);
    }
  },
};
