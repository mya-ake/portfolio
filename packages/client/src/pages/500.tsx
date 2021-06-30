import { DefaultLayout } from '~/components/layout';
import { InternalServerErrorScreen } from '~/components/screen';
import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <DefaultLayout>
      <InternalServerErrorScreen />
    </DefaultLayout>
  );
};

export default NotFoundPage;
