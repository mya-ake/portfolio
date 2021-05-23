export type AppEnv = 'dev' | 'prod';
export const getAppEnv = (): AppEnv => (process.env.APP_ENV as AppEnv) ?? 'dev';

export const getAPIEndpoint = (): string =>
  process.env[`API_ENDPOINT_${getAppEnv().toUpperCase()}`] ??
  'http://localhost:4000/graphql';

export const getAPIKey = (): string =>
  process.env[`API_KEY_${getAppEnv().toUpperCase()}`] ?? '';
