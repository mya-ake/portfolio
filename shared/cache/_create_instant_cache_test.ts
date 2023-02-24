import { testBasicSpec } from "./_instant_cache_test_cast.ts";
import {
  CacheAdapter,
  createInstantCacheFactory,
} from "./_create_instant_cache.ts";

class TestAdapter implements CacheAdapter {
  #key = "__undefined__";
  #data: unknown = undefined;

  get<Data>(key: string) {
    return this.#key === key
      ? Promise.resolve(this.#data as Data)
      : Promise.resolve(undefined);
  }

  put<Data>(key: string, value: Data) {
    this.#key = key;
    this.#data = value;
    return Promise.resolve();
  }
}

const createInstantCache = createInstantCacheFactory(() => new TestAdapter());

testBasicSpec(createInstantCache);
