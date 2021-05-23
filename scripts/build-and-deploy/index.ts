import { spawn } from '@mya-ake/command-line-utils';

const singlePackageScriptArgs = ['lerna', 'run', '--stream', '--scope'];
const serverScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/server'];
const clientScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/client'];
const graphqlSchemaScriptsArgs = [
  ...singlePackageScriptArgs,
  '@mya-ake-com/graphql-schema',
];

const APP_ENV = process.env.APP_ENV;

const buildAndDeploy = async () => {
  if (!APP_ENV) {
    return Promise.reject(new Error('APP_ENV is not set'));
  }

  // schema
  await spawn('yarn', [...graphqlSchemaScriptsArgs, 'build']);

  // server
  await spawn('yarn', [...serverScriptsArgs, 'build']);
  await spawn('yarn', [`deploy:server:${APP_ENV}`]);

  // client
  await spawn('yarn', [...clientScriptsArgs, 'build']);
  await spawn('yarn', [`deploy:client:${APP_ENV}`]);
};

buildAndDeploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
