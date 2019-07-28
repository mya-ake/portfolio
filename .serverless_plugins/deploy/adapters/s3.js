"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3();
exports.createBucket = ({ name, region, }) => {
    return new Promise((resolve, reject) => {
        s3.createBucket({
            Bucket: name,
            CreateBucketConfiguration: {
                LocationConstraint: region,
            },
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
exports.setuPublicAccessBlock = ({ name }) => {
    return new Promise((resolve, reject) => {
        s3.putPublicAccessBlock({
            Bucket: name,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: true,
                BlockPublicPolicy: true,
                IgnorePublicAcls: true,
                RestrictPublicBuckets: true,
            },
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
exports.setupBucketPolicy = ({ name, identityId, }) => {
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
        s3.putBucketPolicy({
            Bucket: name,
            Policy: JSON.stringify(policy),
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
exports.deleteBucket = ({ name }) => {
    return new Promise((resolve, reject) => {
        s3.deleteBucket({
            Bucket: name,
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
exports.listObjects = (params) => {
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
exports.putObject = (params) => {
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.deleteObjects = (params) => {
    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
