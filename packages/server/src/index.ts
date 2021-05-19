import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { getSchema } from '@mya-ake-com/graphql-schema';

async function startApolloServer() {
  const typeDefs = getSchema();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
