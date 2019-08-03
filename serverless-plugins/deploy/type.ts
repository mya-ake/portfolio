export type Options = {
  config: {
    assetsDirs: AssetsDirContext[];
    deleteFileAge: number;
  };
  s3: {
    name: string;
  };
  cloudfront: {
    comment: string;
    alias: string;
  };
};

export interface FileContext {
  fileName: string;
  absolutePathname: string;
  s3Key: string;
  contentType: string;
  cacheControl: string;
}

export type AssetsDirContext = {
  pathname: string;
  options?: {
    prefix?: string;
    cacheControl?: string;
    includes?: string[];
  };
};
