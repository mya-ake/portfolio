import { ExternalLink, ExternalLinkProps } from "./ExternalLink.tsx";

export type StyledExternalLinkProps = ExternalLinkProps;

export function StyledExternalLink(props: ExternalLinkProps) {
  const { children, ...restProps } = props;
  return (
    <ExternalLink class="text-link" {...restProps}>{children}</ExternalLink>
  );
}
