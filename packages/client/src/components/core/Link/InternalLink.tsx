import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export type InternalLinkPorps = {
  href: string;
  className?: string;
  children: ReactNode;
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
