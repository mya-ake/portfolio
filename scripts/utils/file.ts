import fs from 'fs';
import path from 'path';

export const extractFileName = (pathname: string): string => {
  return pathname.split('/').pop() || '';
};

export const extractExtension = (pathname: string): string => {
  return pathname.split('.').pop() || '';
};

export const isDirectory = async (pathname: string) => {
  const pathState = await fs.promises.stat(pathname);
  return pathState.isDirectory();
};

export const getFilePathnames = async (dirPathname: string) => {
  const pathnames = await fs.promises.readdir(dirPathname);
  let allPathnames: string[] = [];
  for (const pathname of pathnames) {
    const absoluteFilePathname = path.join(dirPathname, pathname);
    if (await isDirectory(absoluteFilePathname)) {
      const nestedFilePathnames = await getFilePathnames(absoluteFilePathname);
      allPathnames = allPathnames.concat(nestedFilePathnames);
    } else {
      allPathnames = allPathnames.concat(absoluteFilePathname);
    }
  }
  return allPathnames;
};

export const readFile = (pathname: string) => {
  return fs.promises.readFile(pathname);
};

export const writeFile = async (pathname: string, data: string) => {
  await ensureWriteProcess(pathname);
  return fs.promises.writeFile(pathname, data, { encoding: 'utf8' });
};

const existPathname = async (pathname: string) => {
  try {
    await fs.promises.stat(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const createDir = (pathname: string) => {
  return fs.promises.mkdir(pathname);
};

const ensureWriteProcess = async (pathname: string) => {
  const fileDirname = path.dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await ensureWriteProcess(fileDirname);
  await createDir(fileDirname);
};
