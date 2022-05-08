import { run } from '../shared/repository';
import { getUseMockServer } from './env';
import type { ChildProcess } from 'child_process';

const build = async () => {
  let serverPs: ChildProcess | undefined = undefined;
  try {
    // schema
    await run('@mya-ake-com/graphql-schema', ['build']);

    // mock
    await run('@mya-ake-com/mock', ['build']);

    // parser
    await run('@mya-ake-com/parser', ['build']);

    // error
    await run('@mya-ake-com/error', ['build']);

    // server
    await run('@mya-ake-com/server', ['build']);

    const startTarget = getUseMockServer() ? 'start-mock' : 'start';
    serverPs = await run('@mya-ake-com/server', [startTarget], {
      pararel: true,
    });

    await run('@mya-ake-com/client', ['build']);
  } finally {
    if (serverPs) {
      serverPs.kill();
    }
  }
};

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
