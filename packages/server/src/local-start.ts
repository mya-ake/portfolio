import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createApolloConfig } from './apollo-config';

const main = async () => {
  const app = express();
  const server = new ApolloServer(createApolloConfig());
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();