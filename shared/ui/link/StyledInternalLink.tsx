import { InternalLink, InternalLinkProps } from "./InternalLink.tsx";

export type StyledInternalLinkProps = InternalLinkProps;

export function StyledInternalLink(props: StyledInternalLinkProps) {
  const { children, ...restProps } = props;
  return (
    <InternalLink class="text-link" {...restProps}>{children}</InternalLink>
  );
}
