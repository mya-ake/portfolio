import consola from 'consola';
import {
  existsDistribution,
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
  const distributionExists = await existsDistribution({
    endpoint,
    bucketName,
  });
  if (distributionExists) {
    consola.info(`CloudFront distribution creation is skipped`);
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
  consola.info(
    `Created cloudfront distribution\nID: ${distributionId} DomainName: ${domainName}`,
  );
};
