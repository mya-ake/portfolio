/** @jsx h */
import { h } from "preact";

import { InternalLink, InternalLinkProps } from "./InternalLink.tsx";
import { css } from "@shared/styles/css.ts";

const style = css({
  color: "$link",
  fontSize: "inherit",
});

export type StyledInternalLinkProps = InternalLinkProps;

export function StyledInternalLink(props: StyledInternalLinkProps) {
  const { children, ...restProps } = props;
  return <InternalLink class={style()} {...restProps}>{children}</InternalLink>;
}
