import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../generated/graphql-request';

const client = new GraphQLClient('http://localhost:4000/graphql');
export const graphQLSdk = getSdk(client);
