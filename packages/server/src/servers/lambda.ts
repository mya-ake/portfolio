import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from '../resolvers';
import { getSchema } from '@mya-ake-com/graphql-schema';

type Handler = ReturnType<ApolloServer['createHandler']>;

export const createApolloServerHandler = (): Handler => {
  const typeDefs = getSchema();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const server = new ApolloServer({ typeDefs, resolvers: resolvers as any });

  return server.createHandler();
};
