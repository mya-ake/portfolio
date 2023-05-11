/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import {
  InnerRenderFunction,
  RenderContext,
  ServerContext,
  StartOptions,
} from "$fresh/server.ts";
import { serve, Status } from "$fresh/src/server/deps.ts";
import manifest from "./fresh.gen.ts";
import { readNormalizeCss } from "./core/css/mod.ts";
import { getCssText, reset } from "@shared/styles/core.ts";
import { globalStyles } from "@shared/styles/global_styles.ts";
import { getCurrentLang } from "@shared/i18n/mod.ts";
import type { Handler } from "std/http/server.ts";

async function render(ctx: RenderContext, render: InnerRenderFunction) {
  // lang
  ctx.lang = getCurrentLang();

  // normalize
  const normalizeCss = await readNormalizeCss(Deno.cwd());
  ctx.styles.push(normalizeCss);

  // stitches
  reset();
  render();
  globalStyles();
  ctx.styles.push(getCssText());
}

async function start() {
  const options: StartOptions = { render, port: 8000 };
  const ctx = await ServerContext.fromManifest(manifest, options);

  const handler: Handler = (req, connInfo) => {
    // Emergency response to redirect to a different host.
    const url = new URL(req.url);
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
      return new Response(undefined, {
        status: Status.TemporaryRedirect,
        headers: {
          location: url.pathname,
        },
      });
    }

    return ctx.handler()(req, connInfo);
  };

  await serve(handler, options);
}

await start();
