import { ComponentChildren, createElement, VNode } from "preact";

type CreateActionComponentParameters = Parameters<typeof createElement>;

type ElementType = "a" | "button";

export function createActionComponent<P = {}>(
  type: ElementType,
  props: P,
  children: ComponentChildren,
): VNode<P> {
  const component = createElement(type, props, children);
  // Provide some core functionality.

  return component;
}
