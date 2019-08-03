import puppeteer from 'puppeteer';
import { APP_ORIGIN } from './../fixtures/env';
// @ts-ignore
import routes from '@@/.test-fixtures/routes.json';

let browser: puppeteer.Browser;
let context: puppeteer.BrowserContext;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

beforeEach(async () => {
  context = await browser.createIncognitoBrowserContext();
  page = await context.newPage();
});

afterEach(async () => {
  if (context) await context.close();
});

afterAll(async () => {
  if (browser) await browser.close();
});

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
