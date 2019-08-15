import Express from 'express';
import { hasExtension, isEmptyStringWithTrim } from '../validators';
import { isString } from '../../types/type-guards';
import { createNotFoundError } from './../error';
import { getPostContent } from '../gateways/post.gateway';

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
  const response = await getPostContent(slug);

  if (response.ok) {
    res.json(response.data);
  } else {
    next(createNotFoundError());
  }
};
