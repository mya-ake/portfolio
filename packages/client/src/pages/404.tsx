import { DefaultLayout } from '~/components/layout';
import { NotFoundScreen } from '~/components/screen';
import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NotFoundScreen />
    </DefaultLayout>
  );
};

export default NotFoundPage;
