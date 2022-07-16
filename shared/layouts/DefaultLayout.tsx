/** @jsx h */
import { ComponentChildren, h } from "preact";

type Props = {
  children: ComponentChildren;
};

export function DefaultLayout(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}
