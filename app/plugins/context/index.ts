import ky from 'ky-universal';
import { Plugin } from '@nuxt/types';
import { Http } from '@/lib/http';
import { API_ORIGIN } from '@/conifg/env';
import { Context } from './type';

const plugin: Plugin = (_, inject) => {
  const client = ky.create({
    prefixUrl: API_ORIGIN,
    throwHttpErrors: false,
  });

  const http = new Http<undefined>(client);

  const context: Context = {
    http,
  };

  inject('_context', context);
};

export default plugin;
