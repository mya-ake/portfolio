export function getUseMicroCMSCache() {
  return Deno.env.get("APP_ENV") !== "prod";
}

export function getUsePostsFilter() {
  return Deno.env.get("APP_ENV") === "prod";
}

export function getGATagId() {
  return Deno.env.get("GA_TAG_ID") ?? "";
}
