export type ContentMeta = {
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  twitterCardType: string;
};

export type Content = ContentMeta & {
  body: string;
};
