import { APP_ORIGIN } from './../fixtures/env';
// @ts-ignore
import routes from '@@/.test-fixtures/routes.json';

describe('Accessible pages', () => {
  for (const route of routes) {
    it(route, async () => {
      const url = `${APP_ORIGIN}${route}`;
      const response = await page.goto(url, {
        waitUntil: 'networkidle0',
      });
      if (response === null) {
        return;
      }
      expect(response.status()).toBe(200);
    });
  }
});
