export type ContentMetadata = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type CustomDataValue = string;
type EmptyCustomData = Record<string, never>;
export type Content<
  CustomData extends Record<string, CustomDataValue> = EmptyCustomData,
> =
  & ContentMetadata
  & CustomData;

export type MicroCMSList<
  CustomData extends Record<string, CustomDataValue> = EmptyCustomData,
  PickValues extends keyof Content<CustomData> = never,
> = {
  contents: Pick<Content<CustomData>, PickValues>[];
  totalCount: number;
  offset: number;
  limit: number;
};

type PostData = {
  title: string;
  description: string;
  body: string;
};

export type Post = Content<PostData>;
export type Posts<PickValues extends keyof Content<PostData>> = MicroCMSList<
  PostData,
  PickValues
>;
