import {
  CacheAdapter,
  createInstantCacheFactory,
} from "../_create_instant_cache.ts";
import { join } from "std/path/mod.ts";
import { readFile, writeFile } from "@shared/fs/mod.ts";

function adapter(keyPrefix: string): CacheAdapter {
  const tmpDir = join(Deno.cwd(), ".tmp/cache");

  const createCachePath = (key: string): string => {
    const name = key ? key : "_";
    return join(tmpDir, `${keyPrefix}:${name}.json`);
  };

  return {
    async get<Data>(key: string) {
      try {
        const data = await readFile(createCachePath(key));
        return JSON.parse(data) as Data;
      } catch {
        return undefined;
      }
    },

    async put<Data>(key: string, value: Data) {
      await writeFile(createCachePath(key), JSON.stringify(value));
    },
  };
}

export function createInstantCache(keyPrefix: string) {
  const _adapter = () => adapter(keyPrefix);
  return createInstantCacheFactory(_adapter);
}
