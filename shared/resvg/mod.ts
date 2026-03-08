import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { join } from "std/path/mod.ts";

let initialized = false;

async function ensureInit() {
  if (initialized) return;
  const wasmPath = join(
    Deno.cwd(),
    "node_modules",
    "@resvg",
    "resvg-wasm",
    "index_bg.wasm",
  );
  const wasmData = await Deno.readFile(wasmPath);
  await initWasm(wasmData);
  initialized = true;
}

/** Render an SVG string to a PNG encoded as a Uint8Array. */
export async function render(svg: string): Promise<Uint8Array> {
  await ensureInit();
  const resvg = new Resvg(svg);
  return resvg.render().asPng();
}
