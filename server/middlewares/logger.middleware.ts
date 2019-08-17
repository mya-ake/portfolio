import Express from 'express';

export const loggerMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  console.log('[info]', 'Request URL: ', req.url);
  next();
};
