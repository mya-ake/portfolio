"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const cf = new aws_sdk_1.CloudFront({});
const buildOriginIdentityComment = (bucketName) => {
    return `access-identity-${bucketName}.s3.amazonaws.com`;
};
exports.createOriginIdentity = ({ bucketName, }) => {
    return new Promise((resolve, reject) => {
        cf.createCloudFrontOriginAccessIdentity({
            CloudFrontOriginAccessIdentityConfig: {
                CallerReference: new Date().getTime().toString(),
                Comment: buildOriginIdentityComment(bucketName),
            },
        }, (err, data) => {
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
        });
    });
};
exports.getOriginIdentityData = ({ bucketName, }) => {
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
exports.deleteOriginIdentity = ({ id }) => {
    return new Promise((resolve, reject) => {
        cf.deleteCloudFrontOriginAccessIdentity({
            Id: id,
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
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
