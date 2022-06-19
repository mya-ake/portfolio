export type AppEnv = 'dev' | 'prod' | 'local';
export const getAppEnv = (): AppEnv =>
  (process.env.APP_ENV as AppEnv) ?? 'local';

export const getApiEndpoint = (): string => {
  return typeof window !== 'undefined'
    ? '/graphql'
    : process.env.API_ENDPOINT ?? '';
};

export const getApiKey = (): string => {
  switch (getAppEnv()) {
    case 'prod':
      return process.env.NEXT_PUBLIC_API_KEY_PROD ?? '';
    case 'dev':
      return process.env.NEXT_PUBLIC_API_KEY_DEV ?? '';
    default:
      return '';
  }
};
