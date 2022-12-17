type Config = {
  time?: number;
};

export function cacheMiddleware(resp: Response, config: Config) {
  if (resp.ok && Deno.env.get("APP_ENV") === "prod") {
    if (config.time) {
      resp.headers.set("cache-control", `max-age=${config.time}`);
    }
  }
  return resp;
}
