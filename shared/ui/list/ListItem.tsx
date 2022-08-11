/** @jsx h */
import { ComponentChildren, h } from "preact";
import { css } from "@shared/styles/css.ts";

const style = css({});

type Props = {
  children: ComponentChildren;
};

export function ListItem(props: Props) {
  const { children } = props;
  return <li class={style()}>{children}</li>;
}
