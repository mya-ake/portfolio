export type AppEnv = 'dev' | 'prod' | 'local';
export const getAppEnv = (): AppEnv =>
  (process.env.APP_ENV as AppEnv) ?? 'local';

console.log(process.env);

export const getAPIEndpoint = (): string =>
  process.env[`NEXT_PUBLIC_API_ENDPOINT_${getAppEnv().toUpperCase()}`] ??
  'http://localhost:4000/graphql';

export const getAPIKey = (): string =>
  process.env[`NEXT_PUBLIC_API_KEY_${getAppEnv().toUpperCase()}`] ?? '';
