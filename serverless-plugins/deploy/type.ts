export interface Config {
  assetsDirs: AssetsDirContext[];
  deleteFileAge: number;
  deleteFileIgnore?: string[];
}

export interface S3Option {
  name: string;
}

export interface CloudFrontOption {
  comment: string;
  alias: string;
}

export type Options = {
  config: Config;
  s3: S3Option;
  cloudfront: CloudFrontOption;
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
