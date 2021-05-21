import got from 'got';
import { getMicroCMSEndpoint, getMicroCMSAPIKey } from '../../../shared/env';

export const http = got.extend({
  prefixUrl: getMicroCMSEndpoint(),
  responseType: 'json',
  headers: {
    'x-api-key': getMicroCMSAPIKey(),
  },
});
