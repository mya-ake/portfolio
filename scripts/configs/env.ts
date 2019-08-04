import dotenv from 'dotenv';
import path from 'path';
import consola from 'consola';
import { writeFile } from './../utils/file';
import { truthyProperties } from './../utils/validators';
import { CONFIG_DIR } from './../constants';

const CONFIG_FILE_NAME = path.join(CONFIG_DIR, 'env.json');
dotenv.config();

export const task = async () => {
  const config = {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    STAGE: process.env.STAGE,
    APP_ENV: process.env.APP_ENV,
    SERVER_ENV: process.env.SERVER_ENV,
  };
  if (!truthyProperties(config)) {
    consola.error(
      `Require environment variables: ${[
        'AWS_S3_BUCKET_NAME',
        'STAGE',
        'APP_ENV',
        'SERVER_ENV',
      ].join(', ')}`,
    );
    process.exit(1);
  }

  const configString = JSON.stringify(config);
  await writeFile(CONFIG_FILE_NAME, configString);

  consola.info(`Created: ${CONFIG_FILE_NAME}`);
};
