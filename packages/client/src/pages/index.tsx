import Link from 'next/link';
import { graphQLSdk } from '~/gateways/graphql';
import type { NextPage, GetStaticProps } from 'next';
import type { PostListItemFragment } from '~/graphql';

type Props = {
  posts: PostListItemFragment[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <h1>Posts</h1>
      <div>
        <Link href="/about">to About</Link>
      </div>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
          </article>
        ))}
      </div>
    </>
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
