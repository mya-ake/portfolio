import { ApolloServer } from 'apollo-server-lambda';
import { createApolloConfig } from './apollo-config';

export const graphql = new ApolloServer(createApolloConfig()).createHandler();
