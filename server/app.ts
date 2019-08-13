import express from 'express';
import helmet from 'helmet';
import proxy from 'express-http-proxy';
import { nuxt } from './core/nuxt';
import {
  cacheMiddleware,
  loggerMiddleware,
  pageContentsMiddleware,
  postContentsMiddleware,
} from './middlewares';
import { apiRouter } from './routers';
import { SERVER_ENV, CONTENTS_DOMAIN } from './env/config';

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

if (CONTENTS_DOMAIN.length > 0) {
  app.use(
    '/contents',
    proxy(CONTENTS_DOMAIN, {
      https: true,
      proxyReqPathResolver(req) {
        return `/contents${req.url}`;
      },
    }),
  );
}

app.get('/:slug', pageContentsMiddleware);
app.get('/posts/:slug', postContentsMiddleware);

app.use('/api', apiRouter);

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
