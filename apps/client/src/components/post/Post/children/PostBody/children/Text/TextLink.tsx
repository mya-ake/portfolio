import { AutoSwitchLink } from '~/components/core';
import { StyledLinkText } from '~/components/styled';
import type { FC, ReactNode } from 'react';

export type TextLinkProps = {
  href: string;
  children: ReactNode;
};

export const TextLink: FC<TextLinkProps> = ({ href, children }) => {
  return (
    <AutoSwitchLink href={href}>
      <StyledLinkText>{children}</StyledLinkText>
    </AutoSwitchLink>
  );
};
