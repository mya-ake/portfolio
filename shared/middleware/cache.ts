type Config = {
  time?: number;
};

function buildCacheControlValue(config: Config): string | undefined {
  if (Deno.env.get("APP_ENV") === "prod" && config.time) {
    return `public, max-age=${config.time}`;
  }
  return undefined;
}

export function cacheMiddleware(resp: Response, config: Config) {
  if (resp.ok) {
    const value = buildCacheControlValue(config);
    if (value) resp.headers.set("cache-control", value);
  }
  return resp;
}

export function pageCacheHeaders(config: Config): HeadersInit | undefined {
  const value = buildCacheControlValue(config);
  return value ? { "cache-control": value } : undefined;
}
