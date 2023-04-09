import { getPosts as getPostsFromCMS } from "@shared/post/list.ts";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";

export type { Posts } from "@shared/post/list.ts";
export const getPosts = getUseMicroCMSCache()
  ? createInstantCache("posts")(getPostsFromCMS)
  : getPostsFromCMS;
