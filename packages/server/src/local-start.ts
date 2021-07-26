import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createApolloConfig } from './apollo-config';
import { setupMocks } from './mocks';
import { getUseMock } from './shared/env';

const main = async () => {
  const app = express();
  const config = createApolloConfig();
  const server = new ApolloServer({
    ...config,
    schema: getUseMock()
      ? addMocksToSchema({
          schema: makeExecutableSchema({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            typeDefs: config.typeDefs as any,
            resolvers: config.resolvers,
          }),
          resolvers: setupMocks(),
        })
      : undefined,
  });
  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
