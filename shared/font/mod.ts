import { join } from "std/path/mod.ts";

export function getRedHatDisplay() {
  const path = join(
    Deno.cwd(),
    "shared/font/fonts/RedHatDisplay-Regular.ttf",
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
