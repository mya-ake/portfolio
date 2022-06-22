import useSWR from 'swr';
import {
  graphQLSdk,
  handleError,
  convertAppError,
  isGraphQLErrorResponse,
} from '~/gateways/graphql';
import { DefaultLayout } from '~/components/layout';
import { Post } from '~/components/post';
import type { NextPage, GetStaticPaths } from 'next';
import type { PostDetailsFragment } from '~/graphql';
import type { GetStaticPropsWithError } from '~/types';

const fetchPost = (id: string) =>
  graphQLSdk.getPost({ id }).then(({ data }) => data?.post);

type Props = {
  postId: string;
  post?: PostDetailsFragment;
};

const Home: NextPage<Props> = ({ postId, post: propsPost }) => {
  const { data: post } = useSWR(`/posts/${postId}`, () => fetchPost(postId), {
    fallbackData: propsPost,
    revalidateOnMount: true,
  });

  return <DefaultLayout>{post && <Post post={post} />}</DefaultLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await graphQLSdk.getPosts();
  const posts = data?.posts.edges.map(({ node }) => node) ?? [];

  const paths = posts.map((post) => ({ params: { id: post.id } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticPropsWithError<
  Props,
  { id: string }
> = async ({ params }) => {
  if (!params || !params.id) {
    return { notFound: true };
  }
  const postId = params.id;
  const response = await graphQLSdk
    .getPost({
      id: postId,
    })
    .catch(handleError);

  if (isGraphQLErrorResponse(response)) {
    return {
      props: {
        postId,
        error: convertAppError(response.errors),
      },
      notFound: false,
    };
  }

  const { post } = response.data;
  return {
    props: { postId, post },
    revalidate: 60,
    notFound: false,
  };
};

export default Home;