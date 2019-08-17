import LRU from 'lru-cache';
import { ICache } from './type';

export class Cache<K, V> implements ICache<K, V> {
  private client: LRU<K, V>;

  constructor(client: LRU<K, V>) {
    this.client = client;
  }

  set(key: K, value: V) {
    this.client.set(key, value);
  }

  get(key: K) {
    return this.client.get(key);
  }
}
