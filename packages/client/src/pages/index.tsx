import Link from 'next/link';
// import { graphQLSdk } from '~/gateways/graphql';
import type { NextPage, GetStaticProps } from 'next';

type Props = {
  message: string;
};

const Home: NextPage<Props> = ({ message }) => {
  return (
    <>
      <h1>Home</h1>
      <p>{message}</p>
      <div>
        <Link href="/about">to About</Link>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { message: '' },
    revalidate: 10,
  };
};

export default Home;
