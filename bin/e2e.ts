import { e2eTest, getRoutes } from './../scripts/e2e';

(async () => {
  await getRoutes();
  await e2eTest();
})();
