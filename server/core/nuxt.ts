// @ts-ignore
import { Nuxt } from 'nuxt';
import config from './../../nuxt.config';
import { NODE_ENV } from '../env/config';

config.dev = !(NODE_ENV === 'production');

export const nuxt = new Nuxt(config);
export { config };
