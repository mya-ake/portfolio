export type ContentMetadata = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type CustomDataValue =
  | string
  | Content<
    Record<string, string>
  >
  | Content<
    Record<string, string>
  >[];
type EmptyCustomData = Record<string, never>;

export type Content<
  CustomData extends Record<string, CustomDataValue> = EmptyCustomData,
> =
  & ContentMetadata
  & CustomData;

export type MicroCMSList<
  // deno-lint-ignore no-explicit-any
  C extends Content<any>,
> = {
  contents: C[];
  totalCount: number;
  offset: number;
  limit: number;
};

type TagData = {
  title: string;
};

export type Tag = Content<TagData>;

type PostData = {
  title: string;
  description: string;
  body: string;
  tags: Content<TagData>[];
};

export type Post = Content<PostData>;
