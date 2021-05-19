import { spawn } from '@mya-ake/command-line-utils';

const singlePackageScriptArgs = ['lerna', 'run', '--stream', '--scope'];
const serverScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/server'];
const clientScriptsArgs = [...singlePackageScriptArgs, '@mya-ake-com/client'];

const build = async () => {
  await spawn('yarn', [...serverScriptsArgs, 'build']);
  const serverPs = await spawn('yarn', [...serverScriptsArgs, 'start'], {
    pararel: true,
  });

  await spawn('yarn', [...clientScriptsArgs, 'build']);

  serverPs.kill();
};

build();
