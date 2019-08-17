import Express from 'express';
import { hasExtension, isEmptyStringWithTrim } from '../validators';
import { isString } from '../../types/type-guards';
import { Gateway } from './../gateways/type';
import { Content } from './../../types/content.type';

export const createContentsMiddleware = (
  gateway: Gateway<string, Content, null>,
) => {
  return async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
  ) => {
    const { slug } = req.params;
    if (!isString(slug)) {
      next();
      return;
    }
    if (isEmptyStringWithTrim(slug) || hasExtension(slug)) {
      next();
      return;
    }

    const response = await gateway(slug);

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
};
