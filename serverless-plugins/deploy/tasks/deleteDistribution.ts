import consola from 'consola';

import {
  getTargetDistribution,
  disableDistribution,
  getDistributionEtag,
  waitForDeployed,
  deleteDistribution,
} from '../adapters/cloudfront';

export const deleteDistributionTask = async ({
  endpoint,
  bucketName,
}: {
  endpoint: string;
  bucketName: string;
}) => {
  const distribution = await getTargetDistribution({
    endpoint,
    bucketName,
  });
  if (!distribution) {
    return;
  }
  await disableDistribution({ id: distribution.Id });
  consola.info(`Disable CloudFront distribution: ${distribution.Id}`);
  await waitForDeployed({ id: distribution.Id });

  const distributionEtag = await getDistributionEtag({ id: distribution.Id });
  await deleteDistribution({ id: distribution.Id, etag: distributionEtag });
  consola.info(`Deleted CloudFront distribution: ${distribution.Id}`);
};
