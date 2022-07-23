import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { detectLang, init } from "@shared/i18n/mod.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  // i18n
  const lang = detectLang({
    acceptLanguageHeader: req.headers.get("accept-language") ?? "",
  });
  await init({ lang });

  const resp = await ctx.next();
  return resp;
}
