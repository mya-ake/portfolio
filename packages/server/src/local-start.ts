import express from 'express';
import { applyApolloServer } from './servers/express';

const main = async () => {
  const app = express();
  const server = await applyApolloServer(app);

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
