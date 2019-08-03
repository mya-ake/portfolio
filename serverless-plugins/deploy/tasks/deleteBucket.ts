import consola from 'consola';

import { deleteBucket } from './../adapters/s3';
import {
  getOriginIdentityData,
  getOriginIdentityEtag,
  deleteOriginIdentity,
} from './../adapters/cloudfront';

export const deleteBucketTask = async ({
  bucketName,
}: {
  bucketName: string;
}) => {
  await deleteBucket({ name: bucketName });
  consola.info(`Deleted bucket: ${bucketName}`);

  const { id: identityId } = await getOriginIdentityData({
    bucketName,
  });
  const identityEtag = await getOriginIdentityEtag({ id: identityId });
  await deleteOriginIdentity({ id: identityId, etag: identityEtag });
  consola.info(`Deleted Origin Access Identity`);
};
