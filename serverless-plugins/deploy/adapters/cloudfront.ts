import { CloudFront, AWSError } from 'aws-sdk';
import URL from 'url';

const cf = new CloudFront({});

const buildOriginIdentityComment = (bucketName: string) => {
  return `access-identity-${bucketName}.s3.amazonaws.com`;
};

const buildS3OriginId = ({ bucketName }: { bucketName: string }) => {
  return `S3-${bucketName}`;
};

const buildCustomOriginId = ({
  host,
  pathname,
}: {
  host?: string;
  pathname?: string;
}) => {
  return `Custom-${host}${pathname}`;
};

export const createOriginIdentity = ({
  bucketName,
}: {
  bucketName: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    cf.createCloudFrontOriginAccessIdentity(
      {
        CloudFrontOriginAccessIdentityConfig: {
          CallerReference: new Date().getTime().toString(),
          Comment: buildOriginIdentityComment(bucketName),
        },
      },
      (
        err: AWSError,
        data: CloudFront.Types.CreateCloudFrontOriginAccessIdentityResult,
      ) => {
        if (err) {
          reject(err);
          return;
        }
        const identity = data.CloudFrontOriginAccessIdentity;
        if (!identity) {
          reject('No identity');
          return;
        }
        resolve(identity.Id);
      },
    );
  });
};

export const getOriginIdentityData = ({
  bucketName,
}: {
  bucketName: string;
}): Promise<{ id: string; s3CanonicalUserId: string; comment: string }> => {
  return new Promise((resolve, reject) => {
    cf.listCloudFrontOriginAccessIdentities((err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const list = data.CloudFrontOriginAccessIdentityList;
      if (!list) {
        reject('No list');
        return;
      }
      const items = list.Items;
      if (!items) {
        reject('No items');
        return;
      }
      const expectComment = buildOriginIdentityComment(bucketName);
      const item = items.find(item => item.Comment === expectComment);
      if (!item) {
        reject('No item');
        return;
      }
      resolve({
        id: item.Id,
        s3CanonicalUserId: item.S3CanonicalUserId,
        comment: item.Comment,
      });
    });
  });
};

export const getOriginIdentityEtag = ({
  id,
}: {
  id: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    cf.getCloudFrontOriginAccessIdentity(
      {
        Id: id,
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const etag = data.ETag;
        if (!etag) {
          reject('No etag');
          return;
        }
        resolve(etag);
      },
    );
  });
};

export const deleteOriginIdentity = ({
  id,
  etag,
}: {
  id: string;
  etag: string;
}) => {
  return new Promise((resolve, reject) => {
    cf.deleteCloudFrontOriginAccessIdentity(
      {
        Id: id,
        IfMatch: etag,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
};

type CustomOriginParams = {
  originUrl: string;
};

type S3OriginParams = {
  bucketName: string;
  originIdentityId: string;
};

const createS3Origin = ({
  bucketName,
  originIdentityId,
}: S3OriginParams): CloudFront.Types.Origin => {
  const domainName = `${bucketName}.s3.amazonaws.com`;
  const id = buildS3OriginId({ bucketName });

  return {
    DomainName: domainName,
    Id: id,
    S3OriginConfig: {
      OriginAccessIdentity: `origin-access-identity/cloudfront/${originIdentityId}`,
    },
  };
};

const craeteLambdaOrigin = ({
  originUrl,
}: CustomOriginParams): CloudFront.Types.Origin => {
  const url = URL.parse(originUrl);
  const domainName = `${url.host}`;
  const id = buildCustomOriginId(url);

  return {
    DomainName: domainName,
    OriginPath: url.pathname,
    Id: id,
    CustomOriginConfig: {
      HTTPPort: 80,
      HTTPSPort: 443,
      OriginProtocolPolicy: 'https-only',
      OriginKeepaliveTimeout: 5,
      OriginReadTimeout: 30,
      OriginSslProtocols: {
        Quantity: 3,
        Items: ['TLSv1', 'TLSv1.1', 'TLSv1.2'],
      },
    },
  };
};

type CreateDistributionParams = {
  comment: string;
  originIdentityId: string;
  bucketName: string;
  originUrl: string;
};

const createDefaultBehavior = () => {
  return {
    ForwardedValues: {
      Cookies: {
        Forward: 'none',
      },
      QueryString: false,
    },
    TrustedSigners: {
      Enabled: false,
      Quantity: 0,
    },
    ViewerProtocolPolicy: 'redirect-to-https',
    AllowedMethods: {
      Quantity: 2,
      Items: ['GET', 'HEAD'],
      CachedMethods: {
        Quantity: 2,
        Items: ['HEAD', 'GET'],
      },
    },
    SmoothStreaming: false,
    Compress: true,
    MinTTL: 0,
    DefaultTTL: 86400,
    MaxTTL: 31536000,
  };
};

const createCacheBehavior = ({
  pathPattern,
  originId,
}: {
  pathPattern: string;
  originId: string;
}): CloudFront.Types.CacheBehavior => {
  return {
    PathPattern: pathPattern,
    TargetOriginId: originId,
    ...createDefaultBehavior(),
  };
};

const createDistributionRequestParams = ({
  comment,
  originIdentityId,
  bucketName,
  originUrl,
}: CreateDistributionParams): CloudFront.Types.CreateDistributionRequest => {
  const s3Origin = createS3Origin({ originIdentityId, bucketName });
  const lambdaOrigin = craeteLambdaOrigin({ originUrl });
  const origins: CloudFront.Types.Origins = {
    Quantity: 2,
    Items: [lambdaOrigin, s3Origin],
  };

  return {
    DistributionConfig: {
      CallerReference: new Date().getTime().toString(),
      Comment: comment,
      HttpVersion: 'http2',
      IsIPV6Enabled: true,
      PriceClass: 'PriceClass_200',
      DefaultCacheBehavior: {
        TargetOriginId: lambdaOrigin.Id,
        ...createDefaultBehavior(),
        ForwardedValues: {
          Cookies: {
            Forward: 'all',
          },
          QueryString: true,
        },
      },
      Enabled: true,
      Origins: origins,
      CacheBehaviors: {
        Quantity: 2,
        Items: [
          createCacheBehavior({
            pathPattern: '_nuxt/*',
            originId: s3Origin.Id,
          }),
          createCacheBehavior({
            pathPattern: 'assets/*',
            originId: s3Origin.Id,
          }),
        ],
      },
    },
  };
};

export const createDistribution = (
  params: CreateDistributionParams,
): Promise<{ id: string; domainName: string }> => {
  return new Promise((resolve, reject) => {
    const requestParams = createDistributionRequestParams(params);

    cf.createDistribution(
      requestParams,
      (err: AWSError, data: CloudFront.Types.CreateDistributionResult) => {
        if (err) {
          reject(err);
          return;
        }
        const distribution = data.Distribution;
        if (!distribution) {
          reject('No distribution');
          return;
        }
        const id = distribution.Id;
        const domainName = distribution.DomainName;
        resolve({
          id,
          domainName,
        });
      },
    );
  });
};

export const getDistributions = (): Promise<
  CloudFront.Types.ListDistributionsResult
> => {
  return new Promise((resolve, reject) => {
    cf.listDistributions((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getDistribution = ({
  id,
}: {
  id: string;
}): Promise<CloudFront.Types.GetDistributionResult> => {
  return new Promise((resolve, reject) => {
    cf.getDistribution({ Id: id }, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(data);
      }
    });
  });
};

export const getTargetDistribution = async ({
  endpoint,
  bucketName,
}: {
  endpoint: string;
  bucketName: string;
}) => {
  const url = URL.parse(endpoint);
  const s3OriginId = buildS3OriginId({ bucketName });
  const customOriginId = buildCustomOriginId(url);

  const distributions = await getDistributions();
  const distributionList = distributions.DistributionList;
  if (!distributionList) {
    throw new Error('No distributions');
  }
  const items = distributionList.Items || [];
  const targetDistribution = items.find(distribution => {
    const { Origins: origins } = distribution;
    const hasS3Origin = origins.Items.some(origin => origin.Id === s3OriginId);
    const hasCustomOrigin = origins.Items.some(
      origin => origin.Id === customOriginId,
    );
    return hasS3Origin && hasCustomOrigin;
  });
  return targetDistribution;
};

export const getDistributionEtag = async ({
  id,
}: {
  id: string;
}): Promise<string> => {
  const distibution = await getDistribution({ id });
  if (!distibution) {
    return '';
  }
  return distibution.ETag || '';
};

export const existsDistribution = async ({
  endpoint,
  bucketName,
}: {
  endpoint: string;
  bucketName: string;
}) => {
  const distribution = await getTargetDistribution({ endpoint, bucketName });
  return !!distribution;
};

export const updateDistribution = ({
  id,
  etag,
  config,
}: {
  id: string;
  etag: string;
  config: CloudFront.Types.DistributionConfig;
}) => {
  return new Promise((resolve, reject) => {
    const params: CloudFront.Types.UpdateDistributionRequest = {
      Id: id,
      IfMatch: etag,
      DistributionConfig: config,
    };
    cf.updateDistribution(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const printDot = () => {
  process.stdout.write('.');
};

const waitFor = ({
  id,
  status,
}: {
  id: string;
  status: 'distributionDeployed';
}) => {
  return new Promise((resolve, reject) => {
    cf.waitFor(status, { Id: id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const waitForDeployed = async ({ id }: { id: string }) => {
  const dotTimer = setInterval(printDot, 10 * 1000);
  await waitFor({ id, status: 'distributionDeployed' });
  clearInterval(dotTimer);
  process.stdout.write('\n');
};

export const disableDistribution = async ({ id }: { id: string }) => {
  const distributionData = await getDistribution({ id });
  if (!distributionData) {
    return;
  }
  const etag = distributionData.ETag;
  const distribution = distributionData.Distribution;
  if (!etag || !distribution) {
    return;
  }
  const config = distribution.DistributionConfig;
  config.Enabled = false;
  await updateDistribution({
    id,
    etag,
    config,
  });
};

export const deleteDistribution = ({
  id,
  etag,
}: {
  id: string;
  etag: string;
}) => {
  return new Promise((resolve, reject) => {
    cf.deleteDistribution({ Id: id, IfMatch: etag }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
