import { join } from "std/path/mod.ts";

let cssString = "";
let cssStringPromise: Promise<string> | undefined;

export const readNormalizeCss = async (rootDir: string): Promise<string> => {
  const path = join(rootDir, "core/css/modern-normalize.css");
  if (!cssStringPromise) {
    cssStringPromise = Deno.readTextFile(path).then((css) => {
      cssString = css;
      return css;
    }).catch((err) => {
      console.error(err);
      return "";
    });
  }
  return await cssStringPromise;
};

export const getNormalizeCss = (): string => cssString;
