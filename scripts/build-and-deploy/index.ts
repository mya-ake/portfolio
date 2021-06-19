import { spawn } from '@mya-ake/command-line-utils';
import { run } from '../shared/repository';
import { getAppEnv } from './env';

const buildAndDeploy = async () => {
  const appEnv = getAppEnv();
  if (!appEnv) {
    return Promise.reject(new Error('APP_ENV is not set'));
  }

  // schema
  await run('@mya-ake-com/graphql-schema', ['build']);

  // mock
  await run('@mya-ake-com/mock', ['build']);

  // parser
  await run('@mya-ake-com/parser', ['build']);

  // server
  await run('@mya-ake-com/server', ['build']);
  await spawn('yarn', [`deploy:server:${appEnv}`]);

  // client
  await run('@mya-ake-com/client', ['build']);
  await spawn('yarn', [`deploy:client:${appEnv}`]);
};

buildAndDeploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
