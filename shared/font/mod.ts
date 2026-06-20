import { join } from "std/path/mod.ts";

export function getSchibstedGrotesk() {
  const path = join(
    Deno.cwd(),
    "shared/font/fonts/SchibstedGrotesk.woff",
  );
  return Deno.readFile(path);
}

export function getNotoSansJP() {
  const path = join(
    Deno.cwd(),
    "shared/font/fonts/NotoSansJP-Medium.otf",
  );
  return Deno.readFile(path);
}
