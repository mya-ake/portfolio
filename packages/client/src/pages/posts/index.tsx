import { graphQLSdk } from '~/gateways/graphql';
import { DefaultLayout } from '~/components/layout';
import { PostList } from '~/components/post-list';
import type { NextPage, GetStaticProps } from 'next';
import type { PostListItemFragment } from '~/graphql';

type Props = {
  posts: PostListItemFragment[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <DefaultLayout>
      <h1>Posts</h1>
      <div>
        <PostList posts={posts} />
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await graphQLSdk.getPosts();
  const posts = data?.posts.edges.map(({ node }) => node) ?? [];
  return {
    props: { posts },
    revalidate: 10,
  };
};

export default Home;
