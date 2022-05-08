import { spawn, SpawnOption } from '@mya-ake/command-line-utils';
import type { ChildProcess } from 'child_process';

type RepositoryName =
  | '@mya-ake-com/server'
  | '@mya-ake-com/client'
  | '@mya-ake-com/graphql-schema'
  | '@mya-ake-com/parser'
  | '@mya-ake-com/mock'
  | '@mya-ake-com/error';

export const run = (
  name: RepositoryName,
  args: string[],
  option?: SpawnOption,
): Promise<ChildProcess> => {
  return spawn('yarn', ['nx', 'run', `--project=${name}`, ...args], option);
};
