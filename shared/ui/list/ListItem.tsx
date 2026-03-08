import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function ListItem(props: Props) {
  return <li class="leading-relaxed">{props.children}</li>;
}
