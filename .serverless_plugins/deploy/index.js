"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const consola_1 = __importDefault(require("consola"));
const cloudformation_1 = require("./adapters/cloudformation");
const cloudfront_1 = require("./adapters/cloudfront");
const s3_1 = require("./adapters/s3");
const buildStackName = ({ name, stage }) => {
    return `${name}-${stage}`;
};
class DeployPlugin {
    constructor(serverless) {
        this.serverless = serverless;
        this.options = serverless.service.custom.deploy || {};
        this.commands = {
            deploy: {
                lifecycleEvents: ['resources', 'functions'],
            },
        };
        this.hooks = {
            'before:deploy:deploy': this.beforeDeployDeploy.bind(this),
            'after:deploy:deploy': this.afterDeployDeploy.bind(this),
            'after:remove:remove': this.afterRemoveRemove.bind(this),
        };
    }
    beforeDeployDeploy() {
        console.log(this.serverless);
    }
    afterDeployDeploy() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = this.serverless.service.getServiceName();
            const { stage, region } = this.serverless.service.provider;
            const stackName = buildStackName({ name, stage });
            const endpoint = yield cloudformation_1.getApiEndpoint({ stackName, region });
            console.log(endpoint);
            const originIdentityId = yield cloudfront_1.createOriginIdentity({
                bucketName: this.options.bucket,
            });
            // await createOriginIdentity({
            //   bucketName: this.options.bucket,
            // });
            // const { s3CanonicalUserId } = await getOriginIdentityData({
            //   bucketName: this.options.bucket,
            // });
            yield s3_1.createBucket({ name: this.options.bucket, region });
            yield s3_1.setuPublicAccessBlock({ name: this.options.bucket });
            yield s3_1.setupBucketPolicy({
                name: this.options.bucket,
                identityId: originIdentityId,
            });
            consola_1.default.info(`Created bucket: ${this.options.bucket}`);
            // await createDistribution();
        });
    }
    afterRemoveRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            yield s3_1.deleteBucket({ name: this.options.bucket });
            consola_1.default.info(`Deleted bucket: ${this.options.bucket}`);
            const { id: identityId } = yield cloudfront_1.getOriginIdentityData({
                bucketName: this.options.bucket,
            });
            consola_1.default.info(identityId);
            yield cloudfront_1.deleteOriginIdentity({ id: identityId });
            consola_1.default.info(`Deleted Origin Access Identity`);
        });
    }
}
module.exports = DeployPlugin;
