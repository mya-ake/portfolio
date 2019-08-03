import dotenv from 'dotenv';
import path from 'path';
import consola from 'consola';
import { readFile, writeFile } from './../utils/file';
import { CONFIG_DIR } from './../constants';

const CONFIG_FILE_NAME = path.join(CONFIG_DIR, 'env.json');

export const task = async () => {
  const ROOT_PATHNAME = process.cwd();
  const ENV_FILE_PATHNAME = path.join(ROOT_PATHNAME, '.env');

  const env = await readFile(ENV_FILE_PATHNAME);
  const config = dotenv.parse(env);

  const configString = JSON.stringify(config);
  await writeFile(CONFIG_FILE_NAME, configString);

  consola.info(`Created: ${CONFIG_FILE_NAME}`);
};
