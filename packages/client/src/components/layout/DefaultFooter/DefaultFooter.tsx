import { useMemo } from 'react';
import { InternalLink } from '~/components/core';
import { Logo } from '~/components/symbol';
import { getCurrentYear } from '~/shared/date';
import type { VFC } from 'react';

export const DefaultFooter: VFC = () => {
  const currentYear = useMemo(() => getCurrentYear(), []);

  return (
    <footer className="bg-gray-700 text-gray-50 pt-2 px-4">
      <nav>
        <h1 className="sr-only">Global Navigation</h1>
        <ul>
          <li>
            <InternalLink href="/">Home</InternalLink>
          </li>
          <li>
            <InternalLink href="/posts">Posts</InternalLink>
          </li>
          <li>
            <InternalLink href="/slides">Slides</InternalLink>
          </li>
          <li>
            <InternalLink href="/privacy-policy">Privacy Policy</InternalLink>
          </li>
        </ul>
      </nav>
      <div className="text-center py-1">
        <span className="text-sm leading-none">
          &copy; {currentYear} <Logo />
        </span>
      </div>
    </footer>
  );
};
