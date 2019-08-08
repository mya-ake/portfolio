import Express from 'express';

export const contentsMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  // @ts-ignore
  req.content = {
    title: req.params.page,
    description: '',
    thumbnailUrl: '',
  };
  next();
};
