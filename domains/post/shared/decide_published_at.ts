type PostHasPublishedDates = {
  publishedAt: string;
  publicationDate?: string;
};

export function decidePublishedAt<P extends PostHasPublishedDates>(
  post: P,
): Omit<P, "publicationDate"> {
  return {
    ...post,
    publishedAt: post.publicationDate ?? post.publishedAt,
  };
}
