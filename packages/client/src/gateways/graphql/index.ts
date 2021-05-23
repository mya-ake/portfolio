import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../generated/graphql-request';
import { getAPIEndpoint, getAPIKey } from '../../shared/env';

const createHeaders = () => {
  const headers: Record<string, string> = {};

  const apiKey = getAPIKey();
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  return headers;
};

const client = new GraphQLClient(getAPIEndpoint(), {
  headers: createHeaders(),
});
export const graphQLSdk = getSdk(client);
