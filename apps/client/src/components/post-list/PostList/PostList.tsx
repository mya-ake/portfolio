import { VFC } from 'react';
import { InternalLink } from '~/components/core';
import type { PostListItemFragment } from '~/graphql';

export type PostListType = {
  posts: PostListItemFragment[];
};

export const PostList: VFC<PostListType> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <InternalLink href={`/posts/${post.id}`}>
            <span>{post.title}</span>
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};
