import Link from 'next/link';
import { DefaultLayout } from '~/components/layout';
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <DefaultLayout>
      <h1>About</h1>
      <Link href="/">to Home</Link>
    </DefaultLayout>
  );
};

export default About;
