/** @jsx h */
import { ComponentChildren, h } from "preact";

type Props = {
  href: string;
  class?: string;
  children: ComponentChildren;
};

export function InternalLink(props: Props) {
  const { children, ...restProps } = props;
  return <a {...restProps}>{children}</a>;
}
