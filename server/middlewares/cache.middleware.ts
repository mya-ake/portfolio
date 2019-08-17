import Express from 'express';

export const cacheMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  res.header(
    'Cache-Control',
    `public, max-age=${30}, stale-while-revalidat=360, must-revalidate`,
  );
  next();
};
