import Link from 'next/link';
import { graphQLSdk } from '~/gateways/graphql';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import type { PostDetailsFragment } from '~/graphql';

type Props = {
  post: PostDetailsFragment;
};

const Home: NextPage<Props> = ({ post }) => {
  return (
    <>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
      <div>
        <Link href="/">to Home</Link>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await graphQLSdk.getPosts();
  const posts = data?.posts.edges.map(({ node }) => node) ?? [];

  const paths = posts.map((post) => ({ params: { id: post.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || !params.id) {
    return { notFound: true };
  }
  const { data } = await graphQLSdk.getPost({ id: params.id.toString() });
  if (!data) {
    return { notFound: true };
  }
  const { post } = data;
  return {
    props: { post },
    revalidate: 10,
    notFound: false,
  };
};

export default Home;