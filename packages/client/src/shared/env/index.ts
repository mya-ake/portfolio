export type AppEnv = 'dev' | 'prod' | 'local';
export const getAppEnv = (): AppEnv =>
  (process.env.APP_ENV as AppEnv) ?? 'local';

export const getAPIEndpoint = (): string => {
  switch (getAppEnv()) {
    case 'prod':
      return process.env.NEXT_PUBLIC_API_ENDPOINT_PROD ?? '';
    case 'dev':
      return process.env.NEXT_PUBLIC_API_ENDPOINT_DEV ?? '';
    default:
      return 'http://localhost:4000/graphql';
  }
};

export const getAPIKey = (): string => {
  switch (getAppEnv()) {
    case 'prod':
      return process.env.NEXT_PUBLIC_API_KEY_PROD ?? '';
    case 'dev':
      return process.env.NEXT_PUBLIC_API_KEY_DEV ?? '';
    default:
      return '';
  }
};
