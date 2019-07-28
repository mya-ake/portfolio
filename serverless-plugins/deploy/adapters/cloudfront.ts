import { CloudFront, AWSError } from 'aws-sdk';

const cf = new CloudFront({});

const buildOriginIdentityComment = (bucketName: string) => {
  return `access-identity-${bucketName}.s3.amazonaws.com`;
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
}): Promise<{ id: string; s3CanonicalUserId: string }> => {
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

// type OriginParams = {
//   s3: boolean;
// };

// const createOrigin = async ({ s3 }: OriginParams): CloudFront.Types.Origin => {
//   if (s3) {
//     const identity = await createOriginIdentity();
//     return {
//       S3OriginConfig: {
//         OriginAccessIdentity: identity,
//       },
//     };
//   } else {
//     return {
//       // Id:
//     };
//   }
// };

// type DistributionParams = {
//   comment: string;
// };

// export const createDistribution = ({
//   comment,
// }: DistributionParams): Promise<CloudFront.Types.GetDistributionResult> => {
//   const origins: CloudFront.Types.Origins = {
//     Quantity: 2,
//     Items: [],
//   };

//   return new Promise((resolve, reject) => {
//     const params: CloudFront.Types.DistributionConfig = {
//       CallerReference: new Date().getTime().toString(),
//       Comment: comment,
//       DefaultCacheBehavior: {
//         ForwardedValues: {
//           Cookies: {
//             Forward: 'all',
//           },
//           QueryString: true,
//           TargetOriginId: '',
//         },
//       },
//       Enabled: true,
//       Origins: origins,
//     };

//     cf.createDistribution(
//       params,
//       (err: AWSError, data: CloudFront.Types.CreateDistributionResult) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       },
//     );
//   });
// };
