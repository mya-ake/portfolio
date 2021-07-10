import { useMemo, FC } from 'react';
import { InternalLink, InternalLinkPorps } from './InternalLink';
import { ExternalLink, ExternalLinkProps } from './ExternalLink';
import { decideExternalUrl } from '~/shared/validators';

export type AutoSwitchLink = InternalLinkPorps & ExternalLinkProps;

export const AutoSwitchLink: FC<AutoSwitchLink> = ({
  href,
  children,
  ...restProps
}) => {
  const isExternalUrl = useMemo(() => decideExternalUrl(href), [href]);

  return isExternalUrl ? (
    <ExternalLink href={href} {...restProps}>
      {children}
    </ExternalLink>
  ) : (
    <InternalLink href={href} {...restProps}>
      {children}
    </InternalLink>
  );
};
