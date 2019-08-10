type ContentMeta = {
  title: string;
  description: string;
  thumbnailUrl: string;
};

export type Content = ContentMeta & {
  body: string;
};
