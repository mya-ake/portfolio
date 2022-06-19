import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginCacheControl,
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
  {
    // Playground
    const playgroundPlugin = enablePlayground
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled();
    plugins.push(playgroundPlugin);
  }
  {
    // Cache
    plugins.push(
      ApolloServerPluginCacheControl({
        defaultMaxAge: 60,
      }),
    );
  }

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
    introspection: enablePlayground,
    plugins,
  };
};
