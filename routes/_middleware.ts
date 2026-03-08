import type { Context } from "fresh";
import { detectLang, init } from "@shared/i18n/mod.ts";

export async function handler(ctx: Context<unknown>) {
  const req = ctx.req;
  const log = `[${req.method}] ${req.url}`;
  console.log(log);

  // i18n
  const lang = detectLang({
    acceptLanguageHeader: req.headers.get("accept-language") ?? "",
  });
  await init({ lang });

  const resp = await ctx.next();
  return resp;
}
