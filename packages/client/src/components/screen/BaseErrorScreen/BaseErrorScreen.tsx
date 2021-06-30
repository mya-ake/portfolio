import { InternalLink } from '~/components/core';
import { LinkText } from '~/components/text';
import type { VFC } from 'react';

export type BaseErrorScreenProps = {
  title: string;
};

export const BaseErrorScreen: VFC<BaseErrorScreenProps> = ({ title }) => {
  return (
    <div className="h-full flex justify-center items-center text-center">
      <div className="pb-12">
        <h1 className="text-4xl">{title}</h1>
        <p className="mt-8">
          <InternalLink href="/" className="text-lg">
            <LinkText>Move to the top</LinkText>
          </InternalLink>
        </p>
      </div>
    </div>
  );
};
