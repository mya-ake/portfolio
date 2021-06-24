import { Logo } from '~/components/symbol';
import { InternalLink } from '~/components/core';
import type { VFC } from 'react';

export const DefaultHeader: VFC = () => {
  return (
    <header className="text-center py-2">
      <InternalLink href="/" className="text-2xl leading-none">
        <Logo />
      </InternalLink>
    </header>
  );
};
