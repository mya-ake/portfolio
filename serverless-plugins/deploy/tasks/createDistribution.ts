import consola from 'consola';
import {
  getTargetDistribution,
  createDistribution,
  getOriginIdentityData,
} from '../adapters/cloudfront';

export const createDistributinTask = async ({
  endpoint,
  bucketName,
  comment,
}: {
  endpoint: string;
  bucketName: string;
  comment: string;
}) => {
  const distribution = await getTargetDistribution({
    endpoint,
    bucketName,
  });
  if (distribution) {
    consola.info(`CloudFront distribution creation is skipped`);
    consola.success(`CloudFront: https://${distribution.DomainName}`);
    return;
  }

  const { id: originIdentityId } = await getOriginIdentityData({
    bucketName,
  });

  const { id: distributionId, domainName } = await createDistribution({
    comment,
    originIdentityId,
    bucketName,
    originUrl: endpoint,
  });
  consola.success(
    `Created cloudfront distribution\nhttps://${domainName}\nID: ${distributionId}`,
  );
};
