import { S3 } from 'aws-sdk';
import consola from 'consola';
import path from 'path';

import { putObject } from './../adapters/s3';
import { readFile } from './../utils/file';
import { FileContext } from './../type';

const buildKey = ({
  prefix = '',
  relativePathname,
}: {
  prefix?: string;
  relativePathname: string;
}) => {
  const key = path.join(prefix, relativePathname);
  return key.replace(/^\//, '');
};

const buildParams = async ({
  fileContext,
  bucketName,
}: {
  fileContext: FileContext;
  bucketName: string;
}): Promise<S3.PutObjectRequest> => {
  const body = await readFile(fileContext.absolutePathname);
  return {
    Bucket: bucketName,
    Key: buildKey({
      relativePathname: fileContext.s3Key,
    }),
    Body: body,
    ContentType: fileContext.contentType,
    CacheControl: fileContext.cacheControl,
  };
};

type deployAssets = (params: {
  fileContexts: FileContext[];
  bucketName: string;
}) => Promise<void>;

export const uploadAssetsTask: deployAssets = async ({
  fileContexts,
  bucketName,
}) => {
  for (const fileContext of fileContexts) {
    const params = await buildParams({
      fileContext,
      bucketName,
    });
    await putObject(params);
    consola.success(`Deployed: ${fileContext.s3Key}`);
  }
  return;
};
