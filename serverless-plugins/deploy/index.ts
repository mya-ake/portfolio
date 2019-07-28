import consola from 'consola';
import Serverless from 'serverless';
import { Options } from './type';
import { getApiEndpoint } from './adapters/cloudformation';
import {
  createOriginIdentity,
  getOriginIdentityData,
  deleteOriginIdentity,
} from './adapters/cloudfront';
import {
  createBucket,
  setupBucketPolicy,
  setuPublicAccessBlock,
  deleteBucket,
} from './adapters/s3';

const buildStackName = ({ name, stage }: { name: string; stage: string }) => {
  return `${name}-${stage}`;
};

class DeployPlugin {
  commands: unknown;
  hooks: unknown;
  serverless: Serverless;
  options: Options;

  constructor(serverless: Serverless) {
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

  async afterDeployDeploy() {
    const name = this.serverless.service.getServiceName();
    const { stage, region } = this.serverless.service.provider;
    const stackName = buildStackName({ name, stage });
    const endpoint = await getApiEndpoint({ stackName, region });
    console.log(endpoint);
    const originIdentityId = await createOriginIdentity({
      bucketName: this.options.bucket,
    });
    // await createOriginIdentity({
    //   bucketName: this.options.bucket,
    // });
    // const { s3CanonicalUserId } = await getOriginIdentityData({
    //   bucketName: this.options.bucket,
    // });
    await createBucket({ name: this.options.bucket, region });
    await setuPublicAccessBlock({ name: this.options.bucket });
    await setupBucketPolicy({
      name: this.options.bucket,
      identityId: originIdentityId,
    });
    consola.info(`Created bucket: ${this.options.bucket}`);
    // await createDistribution();
  }

  async afterRemoveRemove() {
    await deleteBucket({ name: this.options.bucket });
    consola.info(`Deleted bucket: ${this.options.bucket}`);

    const { id: identityId } = await getOriginIdentityData({
      bucketName: this.options.bucket,
    });
    consola.info(identityId);
    await deleteOriginIdentity({ id: identityId });
    consola.info(`Deleted Origin Access Identity`);
  }
}

export = DeployPlugin;
