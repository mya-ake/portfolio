import { PostHeader, PostBody } from './children';
import type { VFC } from 'react';
import type { PostDetailsFragment } from '~/graphql';

export type PostProps = {
  post: PostDetailsFragment;
};

export const Post: VFC<PostProps> = ({ post }) => {
  return (
    <>
      <PostHeader
        title={post?.title ?? ''}
        publishedAt={post?.publishedAt}
        revisedAt={post?.revisedAt}
      />
      <div className="">
        <PostBody body={post?.body ?? ''} />
      </div>
    </>
  );
};
