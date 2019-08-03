import express from 'express';
import helmet from 'helmet';
import { nuxt } from './core/nuxt';
import { cacheMiddleware, loggerMiddleware } from './middlewares';
import { NODE_ENV } from './env/config';

export const app = express();

/** middleware */
app.use(helmet());

if (NODE_ENV === 'production') {
  app.use(cacheMiddleware);
  app.use(loggerMiddleware);
}

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
