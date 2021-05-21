import { config } from 'dotenv';

config();
export const getMicroCMSEndpoint = (): string =>
  process.env.MICRO_CMS_ENDPOINT ?? '';

export const getMicroCMSAPIKey = (): string =>
  process.env.MICRO_CMS_API_KEY ?? '';
