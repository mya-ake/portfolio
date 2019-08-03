import { CloudFormation } from 'aws-sdk';

const describeStacks = async (
  cf: CloudFormation,
  stackName: string,
): Promise<CloudFormation.DescribeStacksOutput> => {
  return new Promise((resolve, reject) => {
    cf.describeStacks({ StackName: stackName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getApiEndpoint = async ({
  stackName,
  region,
}: {
  stackName: string;
  region: string;
}) => {
  console.log(stackName, region);
  const cf = new CloudFormation({ region });
  const data = await describeStacks(cf, stackName);

  const statcks = data.Stacks;
  if (!statcks) {
    throw new Error('[CloudFormation]No statkcs');
  }
  const outputs = statcks[0].Outputs;
  if (!outputs) {
    throw new Error('[CloudFormation]No outputs');
  }
  const endpointOutput = outputs.find(
    output => output.OutputKey === 'ServiceEndpoint',
  );
  if (!endpointOutput) {
    throw new Error('[CloudFormation]No endpoint output');
  }
  const endpoint = endpointOutput.OutputValue;
  if (!endpoint) {
    throw new Error('[CloudFormation]No endpoint');
  }
  return endpoint;
};
