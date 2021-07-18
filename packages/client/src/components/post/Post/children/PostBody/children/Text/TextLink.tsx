import { AutoSwitchLink } from '~/components/core';
import { StyledLinkText } from '~/components/styled';
import type { FC } from 'react';

export type TextLinkProps = {
  href: string;
};

export const TextLink: FC<TextLinkProps> = ({ href, children }) => {
  return (
    <AutoSwitchLink href={href}>
      <StyledLinkText>{children}</StyledLinkText>
    </AutoSwitchLink>
  );
};
