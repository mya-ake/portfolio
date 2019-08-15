import Express from 'express';
import { ResponseError } from './../models';

export const errorMiddleware = (
  err: ResponseError,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  if (!(err instanceof ResponseError)) {
    res.status(500).json({ message: 'Internal Server Error.' });
    return;
  }

  const { status, message } = err;
  res.status(status).json({
    message,
  });
};
