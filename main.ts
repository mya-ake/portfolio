/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { getCssText, reset } from "@shared/stitches.ts";

function render(ctx: RenderContext, render: InnerRenderFunction) {
  ctx.lang = "ja";

  reset();
  render();
  ctx.styles.push(getCssText());
}

await start(manifest, { render });
