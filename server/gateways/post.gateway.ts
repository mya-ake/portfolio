import path from 'path';
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

export const getPostContent: Gateway<string, Content, null> = async (
  slug: string,
) => {
  const key = path.join(CONTENTS_KEY_PREFIX, 'posts', `${slug}.json`);
  const response = await getObject({
    name: CONTENTS_BUCKET_NAME,
    key,
  });
  console.log('[info]', response.status, `${CONTENTS_BUCKET_NAME}/${key}`);

  if (response.status === 200 && !isNUll(response.data)) {
    return createOkResponse(buildContent(response.data));
  } else {
    return createErrorResponse(null, response.status);
  }
};
