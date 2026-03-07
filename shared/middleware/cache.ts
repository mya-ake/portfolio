type Config = {
  time?: number;
};

export function cacheMiddleware(resp: Response, config: Config) {
  if (resp.ok && Deno.env.get("APP_ENV") === "prod") {
    if (config.time) {
      resp.headers.set("cache-control", `public, max-age=${config.time}`);
    }
  }
  return resp;
}

export function pageCacheHeaders(config: Config): HeadersInit | undefined {
  if (Deno.env.get("APP_ENV") === "prod" && config.time) {
    return { "cache-control": `public, max-age=${config.time}` };
  }
  return undefined;
}
