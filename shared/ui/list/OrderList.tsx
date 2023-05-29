import { ComponentChildren } from "preact";
import { baseListStyle } from "./_style.ts";

type Props = {
  children: ComponentChildren;
};

export function OrderList(props: Props) {
  const { children } = props;

  return (
    <ol
      class={baseListStyle({
        padding: "0 0 0 $4",
      })}
    >
      {children}
    </ol>
  );
}
