/** @jsx h */
import { ComponentChildren, h } from "preact";
import { baseListStyle } from "./_style.ts";

type ListStyleType = "disc" | "none";
type Props = {
  children: ComponentChildren;
  listStyleType?: ListStyleType;
};

const computePadding = (listStyleType: ListStyleType) => {
  switch (listStyleType) {
    case "disc":
      return "0 0 0 $4";
    default:
      return "0";
  }
};

export function UnorderList(props: Props) {
  const { children, listStyleType = "disc" } = props;

  return (
    <ul
      class={baseListStyle({
        padding: computePadding(listStyleType),
        listStyleType,
      })}
    >
      {children}
    </ul>
  );
}
