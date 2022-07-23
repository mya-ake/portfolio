/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { readNormalizeCss } from "./core/css/mod.ts";
import { getCssText, reset } from "@shared/stitches.ts";
import { globalStyles } from "@shared/styles/global_style.ts";
import { detectLang } from "@shared/i18n/mod.ts";

async function render(ctx: RenderContext, render: InnerRenderFunction) {
  // lang
  ctx.lang = detectLang();

  // normalize
  const normalizeCss = await readNormalizeCss(Deno.cwd());
  ctx.styles.push(normalizeCss);

  // stitches
  reset();
  render();
  globalStyles();
  ctx.styles.push(getCssText());
}

await start(manifest, { render });
