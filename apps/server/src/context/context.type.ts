import type { Context as ApolloContext } from 'apollo-server-core';
import type { MicroCMSDataSource } from '../data-srouces';

export type Context = ApolloContext<{
  dataSources: {
    microCMS: MicroCMSDataSource;
  };
}>;
