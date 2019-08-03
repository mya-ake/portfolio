import path from 'path';
import minimatch from 'minimatch';
import {
  extractFileName,
  extractExtension,
  isDirectory,
  getFilePathnames,
} from './../utils/file';
import { CONTENT_TYPES } from './../constants';
import { AssetsDirContext, FileContext } from './../type';

const selectContentType = (extension: string): string => {
  return extension in CONTENT_TYPES
    ? CONTENT_TYPES[extension]
    : CONTENT_TYPES['plane'];
};

const buildFileContext = ({
  absolutePathname,
  assetsDirContext,
}: {
  absolutePathname: string;
  assetsDirContext: AssetsDirContext;
}): FileContext => {
  const { pathname: dirPathname } = assetsDirContext;
  const { options = { prefix: '' } } = assetsDirContext;
  const fileName = extractFileName(absolutePathname);
  const extension = extractExtension(fileName);
  const { prefix = '', cacheControl = '' } = options;
  const relativePathname = absolutePathname.replace(dirPathname, '');
  const s3Key = path.join(prefix, relativePathname).replace(/^\//, '');
  const contentType = selectContentType(extension);
  return {
    fileName,
    absolutePathname,
    s3Key,
    contentType,
    cacheControl,
  };
};

const isMatch = ({
  pathname,
  assetsDirContext,
}: {
  pathname: string;
  assetsDirContext: AssetsDirContext;
}) => {
  if (assetsDirContext.options == null) {
    return true;
  }
  const { includes = [] } = assetsDirContext.options;
  if (includes.length === 0) {
    return true;
  }
  return includes.some(match => {
    return minimatch(pathname, match, { matchBase: true, dot: true });
  });
};

const buildFileContexts = async (
  assetsDirContext: AssetsDirContext,
): Promise<FileContext[]> => {
  const isFile = !(await isDirectory(assetsDirContext.pathname));
  const pathnames = isFile
    ? [assetsDirContext.pathname]
    : await getFilePathnames(assetsDirContext.pathname);

  const contexts: FileContext[] = pathnames
    .filter(pathname => {
      return isMatch({ pathname, assetsDirContext });
    })
    .map(pathname => {
      return buildFileContext({
        absolutePathname: pathname,
        assetsDirContext,
      });
    });
  return contexts;
};

export const buildFileContextsTask = async (
  assetsDirContexts: AssetsDirContext[],
): Promise<FileContext[]> => {
  let contexts: FileContext[] = [];
  for (const assetsDirContext of assetsDirContexts) {
    contexts = contexts.concat(await buildFileContexts(assetsDirContext));
  }
  return contexts;
};
