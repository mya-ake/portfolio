import Express from 'express';
import { hasExtension, isEmptyStringWithTrim } from '../validators';
import { isString, isUndefined } from '../../types/type-guards';
import { createNotFoundError } from './../error';
import { getPostContent } from '../gateways/post.gateway';
import { postCache } from './../adapters/cache';

export const postController = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const { slug } = req.params;
  if (!isString(slug)) {
    next(createNotFoundError());
    return;
  }
  if (isEmptyStringWithTrim(slug) || hasExtension(slug)) {
    next(createNotFoundError());
    return;
  }

  const cachedContent = postCache.get(slug);
  if (!isUndefined(cachedContent)) {
    console.log('[info]', 'from cache', `posts/${slug}`);
    res.json(cachedContent);
    return;
  }

  const response = await getPostContent(slug);

  if (response.ok) {
    postCache.set(slug, response.data);
    res.json(response.data);
  } else {
    next(createNotFoundError());
  }
};
