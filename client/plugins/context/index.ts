import ky from 'ky-universal';
import { Plugin } from '@nuxt/types';
import { Http } from '@/lib/http';
import { API_URL } from '@/conifg/env';
import { AppContext } from './type';
export * from './type';

const plugin: Plugin = (_, inject) => {
  const client = ky.create({
    prefixUrl: API_URL,
    throwHttpErrors: false,
  });

  const http = new Http<undefined>(client);

  const context: AppContext = {
    http,
  };

  inject('_context', context);
};

export default plugin;
