import type { FC } from 'react';

export type ExternalLinkProps = {
  href: string;
  className?: string;
};

export const ExternalLink: FC<ExternalLinkProps> = ({
  href,
  className = '',
  children,
}) => {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};
