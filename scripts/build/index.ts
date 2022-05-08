import { run } from '../shared/repository';
import { getUseMockServer } from './env';

const build = async () => {
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

  const startCommand = getUseMockServer() ? 'start:mock' : 'start';
  const serverPs = await run('@mya-ake-com/server', [startCommand], {
    pararel: true,
  });

  await run('@mya-ake-com/client', ['build']);

  serverPs.kill();
};

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
