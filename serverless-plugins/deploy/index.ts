import Serverless from 'serverless';
import { Options } from './type';
import {
  createBucketTask,
  createDistributinTask,
  deleteDistributionTask,
  deleteBucketTask,
  buildFileContextsTask,
  uploadAssetsTask,
  deleteOldObjectsTask,
  deleteAllObjectsTask,
} from './tasks';
import { getApiEndpoint } from './adapters/cloudformation';

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
      'before:remove:remove': this.beforeRemoveRemove.bind(this),
      'after:remove:remove': this.afterRemoveRemove.bind(this),
    };
  }

  async beforeDeployDeploy() {
    const { region } = this.serverless.service.provider;
    const bucketName = this.options.s3.name;
    const config = this.options.config;

    await createBucketTask({ bucketName, region });

    const fileContexts = await buildFileContextsTask(config.assetsDirs);
    await uploadAssetsTask({ fileContexts, bucketName });
  }

  async afterDeployDeploy() {
    const name = this.serverless.service.getServiceName();
    const bucketName = this.options.s3.name;
    const comment = this.options.cloudfront.comment;
    const deleteFileAge = this.options.config.deleteFileAge;
    const { stage, region } = this.serverless.service.provider;

    const stackName = buildStackName({ name, stage });
    const endpoint = await getApiEndpoint({ stackName, region });

    await createDistributinTask({
      endpoint,
      bucketName,
      comment,
    });
    await deleteOldObjectsTask({ bucketName, deleteFileAge });
  }

  async beforeRemoveRemove() {
    const name = this.serverless.service.getServiceName();
    const { stage, region } = this.serverless.service.provider;
    const bucketName = this.options.s3.name;

    const stackName = buildStackName({ name, stage });
    const endpoint = await getApiEndpoint({ stackName, region });

    await deleteDistributionTask({ endpoint, bucketName });
  }

  async afterRemoveRemove() {
    const bucketName = this.options.s3.name;
    await deleteAllObjectsTask({ bucketName });
    await deleteBucketTask({ bucketName });
  }
}

export = DeployPlugin;
