import express from 'express';
import { nuxt } from './core/nuxt';
import { envMiddleware } from './middlewares';

export const app = express();

/** middleware */
app.use(envMiddleware);
app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
