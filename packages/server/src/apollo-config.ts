import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
  PluginDefinition,
} from 'apollo-server-core';
import { getSchema } from '@mya-ake-com/graphql-schema';
import { resolvers } from './resolvers';
import { MicroCMSDataSource } from './data-srouces';
import {
  getMicroCMSEndpoint,
  getMicroCMSAPIKey,
  getAppEnv,
} from './shared/env';

export const createApolloConfig = (): Config => {
  const enablePlayground = getAppEnv() !== 'prod';

  const plugins: PluginDefinition[] = [];
  const playgroundPlugin = enablePlayground
    ? ApolloServerPluginLandingPageGraphQLPlayground()
    : ApolloServerPluginLandingPageDisabled();
  plugins.push(playgroundPlugin);

  return {
    typeDefs: getSchema(),
    resolvers: resolvers,
    dataSources: () => ({
      microCMS: new MicroCMSDataSource({
        baseURL: getMicroCMSEndpoint(),
        apiKey: getMicroCMSAPIKey(),
      }),
    }),
    introspection: enablePlayground,
    plugins,
  };
};
