#!/usr/bin/env node
import { e2eTest, getRoutes } from './../scripts/e2e';
import consola from 'consola';

(async () => {
  await getRoutes();
  await e2eTest();
})().catch(err => {
  consola.error(err);
  process.exit(1);
});
