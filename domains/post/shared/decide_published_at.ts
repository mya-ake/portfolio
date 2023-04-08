type PostHasPublishedDates = {
  publishedAt: string;
  manualPublishedAt?: string;
};

export function decidePublishedAt<P extends PostHasPublishedDates>(
  post: P,
): Omit<P, "manualPublishedAt"> {
  return {
    ...post,
    publishedAt: post.manualPublishedAt ?? post.publishedAt,
  };
}
