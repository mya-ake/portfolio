/** @jsx h */
import { h } from "preact";

import { ExternalLink, ExternalLinkProps } from "./ExternalLink.tsx";
import { css } from "@shared/styles/css.ts";

const style = css({});

export type StyledExternalLinkProps = ExternalLinkProps;

export function StyledExternalLink(props: ExternalLinkProps) {
  const { children, ...restProps } = props;
  return <ExternalLink class={style()} {...restProps}>{children}</ExternalLink>;
}
