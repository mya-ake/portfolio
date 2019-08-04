import consola from 'consola';
import dayjs from 'dayjs';
import { listObjects, deleteObjects } from './../adapters/s3';

type S3ObjectContext = {
  key: string;
  lastModified: Date;
};

const buildLastModified = (lastModified: Date | undefined): Date => {
  if (typeof lastModified === 'undefined') {
    return new Date(0);
  }
  return lastModified;
};

const listS3Objects = async ({
  bucketName,
}: {
  bucketName: string;
}): Promise<S3ObjectContext[]> => {
  const objects = await listObjects({ name: bucketName });
  return objects.map(({ Key, LastModified }) => ({
    key: Key || '',
    lastModified: buildLastModified(LastModified),
  }));
};

const isObjectToDelete = (
  s3ObjectContext: S3ObjectContext,
  deleteFileAge: number,
) => {
  const { lastModified } = s3ObjectContext;
  const currentDate = dayjs(new Date());
  const modifiedDate = dayjs(lastModified);
  return currentDate.diff(modifiedDate, 'millisecond') > deleteFileAge;
};

const deleteS3Objects = async ({
  bucketName,
  objectsToDelete,
}: {
  bucketName: string;
  objectsToDelete: S3ObjectContext[];
}): Promise<void> => {
  const objects = objectsToDelete.map(({ key }) => ({ Key: key }));
  await deleteObjects({
    name: bucketName,
    objects,
  });
  objectsToDelete.forEach(({ key }) => consola.success(`Deleted: ${key}`));
};

export const deleteOldObjectsTask = async ({
  bucketName,
  deleteFileAge,
}: {
  bucketName: string;
  deleteFileAge: number;
}) => {
  const objects = await listS3Objects({ bucketName });
  const objectsToDelete = objects.filter(s3ObjectContext =>
    isObjectToDelete(s3ObjectContext, deleteFileAge),
  );
  if (objectsToDelete.length === 0) {
    consola.info('There is no old object.');
    return;
  }
  await deleteS3Objects({ bucketName, objectsToDelete });
};
