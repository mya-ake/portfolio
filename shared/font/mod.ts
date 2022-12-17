import { join } from "std/path/mod.ts";

export function getRedHatDisplay() {
  const path = join(
    Deno.cwd(),
    "shared/font/fonts/RedHatDisplay-Regular.ttf",
  );
  return Deno.readFile(path);
}

export function getRoboto() {
  const path = join(
    Deno.cwd(),
    "shared/font/fonts/Roboto-Regular.ttf",
  );
  return Deno.readFile(path);
}
