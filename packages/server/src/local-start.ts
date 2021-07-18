import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createApolloConfig } from './apollo-config';
import { setupMocks } from './mocks';
import { getUseMock } from './shared/env';

const main = async () => {
  const app = express();
  const server = new ApolloServer({
    ...createApolloConfig(),
    mocks: getUseMock() ? setupMocks() : false,
  });
  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
