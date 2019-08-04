import { listObjects, deleteObjects } from './../adapters/s3';

const hasKey = (object: any): object is { Key: string } => {
  return 'Key' in object;
};

export const deleteAllObjectsTask = async ({
  bucketName,
}: {
  bucketName: string;
}) => {
  const objects = await listObjects({
    name: bucketName,
  });
  const objectsToDelete = objects.filter(hasKey).map(({ Key }) => ({ Key }));

  await deleteObjects({
    name: bucketName,
    objects: objectsToDelete,
  });
};
