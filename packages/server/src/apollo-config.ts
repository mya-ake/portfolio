import { getSchema } from '@mya-ake-com/graphql-schema';
import { resolvers } from './resolvers';
import { MicroCMSDataSource } from './data-srouces';
import {
  getMicroCMSEndpoint,
  getMicroCMSAPIKey,
  getAppEnv,
} from './shared/env';
import type { Config } from 'apollo-server-core';

export const createApolloConfig = (): Config => {
  const enablePlayground = getAppEnv() !== 'prod';

  return {
    typeDefs: getSchema(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: resolvers as any,
    dataSources: () => ({
      microCMS: new MicroCMSDataSource({
        baseURL: getMicroCMSEndpoint(),
        apiKey: getMicroCMSAPIKey(),
      }),
    }),
    playground: enablePlayground,
    introspection: enablePlayground,
  };
};
