import express from 'express';
import { nuxt } from './core/nuxt';

export const app = express();

/** middleware */
app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});
