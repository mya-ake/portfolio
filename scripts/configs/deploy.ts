import path from 'path';
import consola from 'consola';
// import nuxtConfig from '../../nuxt.config';
import { writeFile } from '../utils/file';
import { CONFIG_DIR } from '../constants';
import {
  AssetsDirContext,
  Config,
} from './../../serverless-plugins/deploy/type';

const CONFIG_FILE_NAME = path.join(CONFIG_DIR, 'deploy.config.json');

export const task = async () => {
  const ROOT_DIR = process.cwd();
  // const SRC_DIR = path.join(ROOT_DIR, nuxtConfig.srcDir || '');
  const NUXT_DIR = path.join(ROOT_DIR, '.nuxt');
  const NUXT_CLIENT_DIR = path.join(NUXT_DIR, 'dist', 'client');
  // const NUXT_STATIC_DIR = path.join(SRC_DIR, 'static');

  const CACHE_TIME = 60 * 60 * 24 * 7 * 4;
  const CACHE_CONTROL = `public, max-age=${CACHE_TIME}, stale-while-revalidat=${CACHE_TIME}, must-revalidate`;
  const ASSETS_DIRS: AssetsDirContext[] = [
    {
      pathname: NUXT_CLIENT_DIR,
      options: {
        prefix: '_nuxt',
        cacheControl: CACHE_CONTROL,
      },
    },
    // {
    //   pathname: NUXT_STATIC_DIR,
    //   options: {
    //     cacheControl: CACHE_CONTROL,
    //   },
    // },
  ];
  const deleteFileIgnore = [];

  const config: Config = {
    assetsDirs: ASSETS_DIRS,
    deleteFileAge: CACHE_TIME,
    deleteFileIgnore,
  };

  const deployConfigString = JSON.stringify(config);

  await writeFile(CONFIG_FILE_NAME, deployConfigString);

  consola.info(`Created: ${CONFIG_FILE_NAME}`);
};
