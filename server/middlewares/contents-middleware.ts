import Express from 'express';
import { hasExtension, isEmptyStringWithTrim } from './../validators';
import { isString } from './../../types/type-guards';
import { getPageContent } from './../gateways';

export const contentsMiddleware = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const { page } = req.params;
  if (!isString(page)) {
    next();
    return;
  }
  if (isEmptyStringWithTrim(page) || hasExtension(page)) {
    next();
    return;
  }

  const response = await getPageContent(page);

  if (response.ok) {
    const content = response.data;
    // @ts-ignore
    req.content = {
      title: content.title,
      description: content.description,
      thumbnailUrl: content.thumbnailUrl,
    };
  }
  next();
};
