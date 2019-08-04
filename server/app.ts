import express from 'express';
import helmet from 'helmet';
import { nuxt } from './core/nuxt';
import { cacheMiddleware, loggerMiddleware } from './middlewares';
import { APP_ENV } from './env/config';

export const app = express();

/** middleware */
app.use(helmet());

switch (APP_ENV) {
  case 'production':
    app.use(cacheMiddleware);
    app.use(loggerMiddleware);
    break;
  case 'test':
    app.use(cacheMiddleware);
    break;
}

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
