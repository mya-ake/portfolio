import Link from 'next/link';
import type { FC } from 'react';

export type InternalLinkPorps = {
  href: string;
  className?: string;
};

export const InternalLink: FC<InternalLinkPorps> = ({
  href,
  className = '',
  children,
}) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};
