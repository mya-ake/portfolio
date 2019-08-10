import { S3 } from 'aws-sdk';

const s3 = new S3();

type S3GetOutput = {
  status: number;
  code: string;
  data: string | null;
};

export const getObject = ({
  name,
  key,
}: {
  name: string;
  key: string;
}): Promise<S3GetOutput> => {
  return new Promise(resolve => {
    s3.getObject(
      {
        Bucket: name,
        Key: key,
      },
      (err, data) => {
        if (err) {
          const response = {
            status: err.statusCode,
            code: err.code,
            data: null,
          };
          resolve(response);
          return;
        }
        const body = String(data.Body);
        const response = {
          status: 200,
          code: 'ok',
          data: body,
        };
        resolve(response);
      },
    );
  });
};
