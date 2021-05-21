import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from '../resolvers';
import { getSchema } from '@mya-ake-com/graphql-schema';

type Handler = ReturnType<ApolloServer['createHandler']>;

export const createApolloServerHandler = (): Handler => {
  const typeDefs = getSchema();

  const server = new ApolloServer({
    typeDefs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: resolvers as any,
  });

  return server.createHandler();
};
