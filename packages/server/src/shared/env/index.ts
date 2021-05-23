import { config } from 'dotenv';

config();
export const getMicroCMSEndpoint = (): string =>
  process.env.MICRO_CMS_ENDPOINT ?? '';

export const getMicroCMSAPIKey = (): string =>
  process.env.MICRO_CMS_API_KEY ?? '';

export type AppEnv = 'dev' | 'prod';
export const getAppEnv = (): AppEnv => (process.env.APP_ENV as AppEnv) ?? 'dev';
