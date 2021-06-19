import { spawn } from '@mya-ake/command-line-utils';
import type { ChildProcess } from 'child_process';

type RepositoryName =
  | '@mya-ake-com/server'
  | '@mya-ake-com/client'
  | '@mya-ake-com/graphql-schema'
  | '@mya-ake-com/parser'
  | '@mya-ake-com/mock';

const singlePackageScriptArgs = ['lerna', 'run', '--stream', '--scope'];

export const run = (
  name: RepositoryName,
  args: string[],
): Promise<ChildProcess> => {
  return spawn('yarn', [...singlePackageScriptArgs, name, ...args]);
};
