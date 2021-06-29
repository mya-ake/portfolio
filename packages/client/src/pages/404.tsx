import { DefaultLayout } from '~/components/layout';
import { InternalLink } from '~/components/core';
import { LinkText } from '~/components/text';
import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="h-full flex justify-center items-center text-center">
        <div className="pb-12">
          <h1 className="text-4xl">404 Not Found</h1>
          <p className="mt-8">
            <InternalLink href="/" className="text-lg">
              <LinkText>Move to the top</LinkText>
            </InternalLink>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NotFoundPage;
