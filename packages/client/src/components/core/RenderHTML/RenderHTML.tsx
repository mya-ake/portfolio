import { createElement, Fragment, VFC, ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import type { Node as HTMLNode, TagNode } from '@mya-ake-com/parser';

type Render = (
  nodes: HTMLNode[],
  replacer?: Replacer,
) => ReactElement<unknown, string>;

type Replacer = (args: {
  tagNode: TagNode;
  childNodes: HTMLNode[];
  attrs: Record<string, string>;
  render: Render;
}) => ReactElement<unknown, string> | null | undefined;

export type RenderHTMLProps = {
  htmlNodes: HTMLNode[];
  replacer?: Replacer;
};

const render: Render = (nodes, replacer) => {
  const elements = nodes.map((node) => {
    switch (node.nodeType) {
      case 'tag': {
        const attrs: Record<string, string> = {
          ...node.attrs,
          key: uuid(),
        };
        if ('class' in attrs) {
          attrs.className = node.attrs.class;
          delete attrs.class;
        }

        const replacerResult = replacer?.({
          tagNode: node,
          childNodes: node.childNodes,
          attrs,
          render: (ns) => render(ns, replacer),
        });
        if (replacerResult) {
          return replacerResult;
        }

        switch (node.tagName) {
          case 'img':
          case 'br':
          case 'hr':
            return createElement(node.tagName, attrs);
          case 'script':
          case 'style':
            return null;
          default:
            return createElement(
              node.tagName,
              attrs,
              render(node.childNodes, replacer),
            );
        }
      }
      case 'text':
        return createElement(Fragment, { key: uuid() }, node.content);
      default:
        return null;
    }
  });
  return <>{elements}</>;
};

export const RenderHTML: VFC<RenderHTMLProps> = ({ htmlNodes, replacer }) => {
  return render(htmlNodes, replacer);
};
