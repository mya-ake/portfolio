/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { readNormalizeCss } from "./core/css/mod.ts";
import { getCssText, reset } from "@shared/stitches.ts";

async function render(ctx: RenderContext, render: InnerRenderFunction) {
  ctx.lang = "ja";

  // normalize
  const normalizeCss = await readNormalizeCss(Deno.cwd());
  ctx.styles.push(normalizeCss);

  // stitches
  reset();
  render();
  ctx.styles.push(getCssText());
}

await start(manifest, { render });
