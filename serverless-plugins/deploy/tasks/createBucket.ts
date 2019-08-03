import consola from 'consola';
import {
  existBucket,
  createBucket,
  setuPublicAccessBlock,
  setupBucketPolicy,
} from '../adapters/s3';
import {
  createOriginIdentity,
  getOriginIdentityData,
} from '../adapters/cloudfront';

export const createBucketTask = async ({
  bucketName,
  region,
}: {
  bucketName: string;
  region: string;
}) => {
  const bucketExists = await existBucket({ name: bucketName });
  if (bucketExists) {
    consola.info(`Bucket creation is skipped: ${bucketName}`);
    return;
  }

  await createOriginIdentity({
    bucketName,
  });
  const { s3CanonicalUserId } = await getOriginIdentityData({
    bucketName,
  });

  await createBucket({ name: bucketName, region });
  await setuPublicAccessBlock({ name: bucketName });
  await setupBucketPolicy({
    name: bucketName,
    canonicalUserId: s3CanonicalUserId,
  });
  consola.success(`Created bucket: ${bucketName}`);
};
