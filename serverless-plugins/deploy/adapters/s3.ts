import { S3 } from 'aws-sdk';

const s3 = new S3();

export const createBucket = ({
  name,
  region,
}: {
  name: string;
  region: string;
}) => {
  return new Promise((resolve, reject) => {
    s3.createBucket(
      {
        Bucket: name,
        CreateBucketConfiguration: {
          LocationConstraint: region,
        },
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

export const setuPublicAccessBlock = ({ name }: { name: string }) => {
  return new Promise((resolve, reject) => {
    s3.putPublicAccessBlock(
      {
        Bucket: name,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
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

export const setupBucketPolicy = ({
  name,
  identityId,
}: {
  name: string;
  identityId: string;
}) => {
  return new Promise((resolve, reject) => {
    const policy = {
      Version: '2012-10-17',
      Id: 'PolicyForCloudFrontPrivateContent',
      Statement: [
        {
          Sid: '1',
          Effect: 'Allow',
          Principal: {
            AWS: `arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${identityId}`,
          },
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${name}/*`,
        },
      ],
    };
    console.log(JSON.stringify(policy));
    s3.putBucketPolicy(
      {
        Bucket: name,
        Policy: JSON.stringify(policy),
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

export const deleteBucket = ({ name }: { name: string }) => {
  return new Promise((resolve, reject) => {
    s3.deleteBucket(
      {
        Bucket: name,
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

export const listObjects = (
  params: S3.ListObjectsV2Request,
): Promise<S3.Object[]> => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (typeof data.Contents === 'undefined') {
        resolve([]);
        return;
      }
      resolve(data.Contents);
    });
  });
};

export const putObject = (params: S3.PutObjectRequest) => {
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const deleteObjects = (params: S3.DeleteObjectsRequest) => {
  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
