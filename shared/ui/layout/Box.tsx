import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
  class?: string;
};

export function Box(props: Props) {
  return <div class={props.class}>{props.children}</div>;
}
