import { spawn } from '@mya-ake/command-line-utils';
import { getUseMockServer } from './env';

const singlePackageScriptArgs = ['lerna', 'run', '--stream', '--scope'];
const serverScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/server'];
const clientScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/client'];
const graphqlSchemaScriptsArgs = [
  ...singlePackageScriptArgs,
  '@mya-ake-com/graphql-schema',
];
const mockScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/mock'];

const build = async () => {
  await spawn('yarn', [...graphqlSchemaScriptsArgs, 'build']);
  await spawn('yarn', [...mockScriptsArgs, 'build']);
  await spawn('yarn', [...serverScriptsArgs, 'build']);

  const startCommand = getUseMockServer() ? 'start:mock' : 'start';
  const serverPs = await spawn('yarn', [...serverScriptsArgs, startCommand], {
    pararel: true,
  });

  await spawn('yarn', [...clientScriptsArgs, 'build']);

  serverPs.kill();
};

build();
