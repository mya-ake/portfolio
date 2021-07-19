import { GraphQLClient } from 'graphql-request';
import { getSdk } from '~/generated/graphql-request';
import { getApiEndpoint, getApiKey } from '~/shared/env';

const createHeaders = () => {
  const headers: Record<string, string> = {};

  const apiKey = getApiKey();
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  return headers;
};

const client = new GraphQLClient(getApiEndpoint(), {
  headers: createHeaders(),
});
export const graphQLSdk = getSdk(client);
