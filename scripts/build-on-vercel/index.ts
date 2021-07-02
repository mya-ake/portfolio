import { run } from '../shared/repository';

const build = async () => {
  // schema
  await run('@mya-ake-com/graphql-schema', ['build']);

  // mock
  await run('@mya-ake-com/mock', ['build']);

  // parser
  await run('@mya-ake-com/parser', ['build']);

  // error
  await run('@mya-ake-com/error', ['build']);

  // client
  await run('@mya-ake-com/client', ['build']);
};

build();
