import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { getSchema } from '@mya-ake-com/graphql-schema';

const main = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: getSchema(),
    mocks: true,
  });
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
