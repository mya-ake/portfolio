export class MemoryCache<Cache extends { [Key in keyof Cache]: Cache[Key] }> {
  #cache = new Map<keyof Cache, Cache[keyof Cache]>();

  put<Key extends keyof Cache>(key: Key, value: Cache[Key]): void {
    this.#cache.set(key, value);
  }

  get<Key extends keyof Cache>(key: Key): Cache[Key] | undefined {
    return this.#cache.get(key);
  }
}
