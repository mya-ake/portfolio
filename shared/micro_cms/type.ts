export type ContentMetadata = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type CustomDataValue =
  | string
  | RichEditor
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
  body: RichEditor;
  tags: Content<TagData>[];
};

export type Post = Content<PostData>;

/** Rich Editor Object */
export type RichEditorItemText = {
  type: "text";
  value: string;
  attributes: {
    italic?: true;
    bold?: true;
    underline?: true;
    strike?: true;
    code?: true;
    size?: "small" | "large" | "huge";
    background?: string;
  };
};
export type RichEditorItemLinkText = {
  type: "text";
  value: string;
  attributes: {
    link: string;
    target?: "_blank";
    rel?: string;
  };
};
export type RichEditorItemBlock = {
  type: "block";
  value: (RichEditorItemText | RichEditorItemLinkText | RichEditorItemImage)[];
  attributes: {
    header?: 1 | 2 | 3 | 4 | 5;
    align?: "center" | "right" | "justify";
    blockquote?: true;
  };
};
export type RichEditorItemListBlock = {
  type: "block";
  value: RichEditorItemText[];
  attributes: {
    list: "ordered" | "bullet";
    indent: number;
  };
};
export type RichEditorItemCodeBlock = {
  type: "block";
  value: RichEditorItemText;
  attributes: {
    "code-block": true;
  };
};
export type RichEditorItemTextBlock = {
  type: "textBlock";
  value: (RichEditorItemText | RichEditorItemLinkText)[];
};
export type RichEditorItemImage = {
  type: "image";
  value: string;
  attributes: {
    link: string | null;
    target: "_blank" | null;
    alt: string;
    width: string;
    height: string;
  };
};
export type RichEditorRoot =
  | RichEditorItemBlock
  | RichEditorItemListBlock
  | RichEditorItemCodeBlock
  | RichEditorItemTextBlock
  | RichEditorItemImage;

export type RichEditor = {
  contents: RichEditorRoot[];
};
