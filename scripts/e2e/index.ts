import path from 'path';
import { spawn } from './../utils/commands';
import { ChildProcess } from 'child_process';
import { getFilePathnames, writeFile } from './../utils/file';
import { TEST_FIXTURES_DIR } from './../constants';

export const e2eTest = async () => {
  const isCI = !!process.env.CI;

  let nuxtPs: ChildProcess | undefined;
  let error: any;

  const testCommand = isCI ? 'test:e2e:test:ci' : 'test:e2e:test';
  try {
    nuxtPs = await spawn('yarn', ['start'], { pararel: true });
    await spawn('yarn', [testCommand]);
  } catch (err) {
    error = err;
  } finally {
    if (nuxtPs) {
      nuxtPs.kill();
    }
    if (error) {
      process.exit(1);
    }
  }
};

const getReplacement = (pageName: string) => {
  switch (pageName) {
    case 'index':
      return '';
    default:
      return null;
  }
};

const replaceToRoute = (page: string) => {
  const pageName = page.split('/').pop() || '';
  const replacement = getReplacement(pageName);
  return replacement === null ? page : page.replace(pageName, replacement);
};

export const getRoutes = async () => {
  const rootDir = process.cwd();
  const appDir = path.join(rootDir, 'app');
  const pagesDir = path.join(appDir, 'pages');
  const testsDir = path.join(rootDir, TEST_FIXTURES_DIR);
  const testRoutesFilePathname = path.join(testsDir, 'routes.json');

  const pathnames = await getFilePathnames(pagesDir);

  const routes = pathnames
    .map(pathname => pathname.replace(pagesDir, '').replace('.vue', ''))
    .map(replaceToRoute);
  const routesString = JSON.stringify(routes);
  await writeFile(testRoutesFilePathname, routesString);
};
