import path from 'path';
import consola from 'consola';
import { getObject } from './../adapters/s3';
import { CONTENTS_BUCKET_NAME, CONTENTS_KEY_PREFIX } from './../env/config';
import {
  buildContent,
  createOkResponse,
  createErrorResponse,
} from './../heplers/gateway.helper';
import { Gateway } from './type';
import { isNUll } from './../../types/type-guards';
import { Content } from './../../types/content.type';

export const getPageContent: Gateway<string, Content, null> = async (
  page: string,
) => {
  const key = path.join(CONTENTS_KEY_PREFIX, 'pages', `${page}.json`);
  const response = await getObject({
    name: CONTENTS_BUCKET_NAME,
    key,
  });
  consola.info(response.status, key);

  if (response.status === 200 && !isNUll(response.data)) {
    return createOkResponse(buildContent(response.data));
  } else {
    return createErrorResponse(null, response.status);
  }
};
