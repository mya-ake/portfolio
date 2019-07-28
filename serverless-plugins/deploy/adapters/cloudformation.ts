import CloufFormation from 'aws-sdk/clients/cloudformation';
import { CloudFormation } from 'aws-sdk/clients/all';

const describeStacks = async (
  cf: CloufFormation,
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
  const cf = new CloufFormation({ region });
  const data = await describeStacks(cf, stackName);

  const statcks = data.Stacks;
  if (!statcks) {
    throw new Error('[CloufFormation]No statkcs');
  }
  const outputs = statcks[0].Outputs;
  if (!outputs) {
    throw new Error('[CloufFormation]No outputs');
  }
  const endpointOutput = outputs.find(
    output => output.OutputKey === 'ServiceEndpoint',
  );
  if (!endpointOutput) {
    throw new Error('[CloufFormation]No endpoint output');
  }
  const endpoint = endpointOutput.OutputValue;
  if (!endpoint) {
    throw new Error('[CloufFormation]No endpoint');
  }
  return endpoint;
};
