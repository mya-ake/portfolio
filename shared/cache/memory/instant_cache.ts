import {
  CacheAdapter,
  createInstantCacheFactory,
} from "../_create_instant_cache.ts";

type Cache = {
  data: unknown;
  key: string;
};

const adapter = (): CacheAdapter => {
  const _cache: Cache = { key: "__undefined__", data: undefined };

  return {
    get: <Data>(key: string) => {
      return _cache.key === key
        ? Promise.resolve(_cache.data as Data)
        : Promise.resolve(undefined);
    },
    put: (key, value) => {
      _cache.key = key;
      _cache.data = value;
      return Promise.resolve();
    },
  };
};

export const createInstantCache = createInstantCacheFactory(adapter);
