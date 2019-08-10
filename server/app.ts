import express from 'express';
import helmet from 'helmet';
import { nuxt } from './core/nuxt';
import {
  cacheMiddleware,
  loggerMiddleware,
  contentsMiddleware,
} from './middlewares';
import { apiRouter } from './routers';
import { SERVER_ENV } from './env/config';

export const app = express();

/** middleware */
app.use(helmet());

switch (SERVER_ENV) {
  case 'lambda':
    app.use(cacheMiddleware);
    app.use(loggerMiddleware);
    break;
  case 'test':
    app.use(cacheMiddleware);
    break;
}

app.get('/:page', contentsMiddleware);

app.use('/api', apiRouter);

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
