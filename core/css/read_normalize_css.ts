import { join } from "std/path/mod.ts";

export const readNormalizeCss = async (rootDir: string): Promise<string> => {
  const path = join(rootDir, "core/css/modern-normalize.css");
  const css = await Deno.readTextFile(path).catch((err) => {
    console.error(err);
    return "";
  });
  return css;
};
