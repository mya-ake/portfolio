import { dirname } from "std/path/mod.ts";

export async function readFile(path: string) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);
  return decoder.decode(data);
}

function createDir(pathname: string) {
  return Deno.mkdir(pathname, { recursive: true });
}

function existPathname(pathname: string) {
  return Deno.stat(pathname).then(() => true).catch(() => false);
}

async function ensureWriteProcess(pathname: string) {
  const fileDirname = dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await createDir(fileDirname);
}

export async function writeFile(pathname: string, data: string) {
  await ensureWriteProcess(pathname);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  return Deno.writeFile(pathname, encodedData, { create: true });
}
