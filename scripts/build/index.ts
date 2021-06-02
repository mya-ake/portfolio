import { spawn } from '@mya-ake/command-line-utils';
import { getUseMockServer } from './env';
import type { ChildProcess } from 'child_process';

const singlePackageScriptArgs = ['lerna', 'run', '--stream', '--scope'];
const serverScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/server'];
const clientScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/client'];
const graphqlSchemaScriptsArgs = [
  ...singlePackageScriptArgs,
  '@mya-ake-com/graphql-schema',
];

const build = async () => {
  await spawn('yarn', [...graphqlSchemaScriptsArgs, 'build']);
  await spawn('yarn', [...serverScriptsArgs, 'build']);

  let serverPs: ChildProcess;
  if (getUseMockServer()) {
    serverPs = await spawn('yarn', [...clientScriptsArgs, 'mock:start'], {
      pararel: true,
    });
  } else {
    serverPs = await spawn('yarn', [...serverScriptsArgs, 'start'], {
      pararel: true,
    });
  }

  await spawn('yarn', [...clientScriptsArgs, 'build']);

  serverPs.kill();
};

build();
