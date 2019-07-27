import Express from 'express';

const buildPath = (originalPath: string) => {
  if (/\/dev\//.test(originalPath) === true) {
    return originalPath;
  }
  return `/dev${originalPath}`;
};

export const envMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const originalUrl = req.url;
  const envUrl = buildPath(originalUrl);
  req.url = envUrl;
  console.log(
    '[info]',
    'Overwrite URL',
    `'${originalUrl}'`,
    'to',
    `'${envUrl}'`,
  );
  next();
};
