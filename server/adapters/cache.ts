import LRU from 'lru-cache';
import { Cache } from './../lib/cache';
import { Content } from './../../types/content.type';

const createPostCache = () => {
  const client = new LRU<string, Content>({
    max: 10,
    maxAge: 1000 * 60 * 60 * 24,
  });
  return new Cache<string, Content>(client);
};

export const postCache = createPostCache();
