import { useMemo } from 'react';
import useSWR from 'swr';
import { graphQLSdk } from '~/gateways/graphql';
import { parseHtml } from '@mya-ake-com/parser';
import { DefaultLayout } from '~/components/layout';
import { RenderHTML } from '~/components/core/RenderHTML';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import type { PostDetailsFragment } from '~/graphql';

const fetchPost = (id: string) =>
  graphQLSdk.getPost({ id }).then(({ data }) => data?.post);

type Props = {
  post: PostDetailsFragment;
};

const Home: NextPage<Props> = ({ post: propsPost }) => {
  const { data: post } = useSWR(
    `/posts/${propsPost.id}`,
    () => fetchPost(propsPost.id),
    {
      initialData: propsPost,
      revalidateOnMount: true,
    },
  );

  const parsedBody = useMemo(() => {
    return parseHtml(post?.body ?? '');
  }, [post]);

  return (
    <DefaultLayout>
      <h1>{post?.title}</h1>
      <RenderHTML htmlNodes={parsedBody} />
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await graphQLSdk.getPosts();
  const posts = data?.posts.edges.map(({ node }) => node) ?? [];

  const paths = posts.map((post) => ({ params: { id: post.id } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || !params.id) {
    return { notFound: true };
  }
  const { data } = await graphQLSdk.getPost({
    id: params.id.toString(),
  });
  if (!data) {
    return { notFound: true };
  }
  const { post } = data;
  return {
    props: { post },
    revalidate: 60,
    notFound: false,
  };
};

export default Home;
