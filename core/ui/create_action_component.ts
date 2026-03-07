import { ComponentChildren, createElement, JSX } from "preact";

type ElementType = "a" | "button";

export function createActionComponent<T extends ElementType>(
  type: T,
  props: JSX.IntrinsicElements[T],
  children: ComponentChildren,
) {
  const component = createElement(type, props, children);
  // Provide some core functionality.

  return component;
}
