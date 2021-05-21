import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../resolvers';
import { getSchema } from '@mya-ake-com/graphql-schema';

export const applyApolloServer = async (
  app: Express,
): Promise<ApolloServer> => {
  const typeDefs = getSchema();

  const server = new ApolloServer({
    typeDefs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: resolvers as any,
  });
  await server.start();

  server.applyMiddleware({ app });
  return server;
};
