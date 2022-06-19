import type { Node, TagNode, TextNode } from './html-parser';

export const isTagNode = (node: Node): node is TagNode => {
  return node.nodeType === 'tag';
};

export const isTextNode = (node: Node): node is TextNode => {
  return node.nodeType === 'text';
};

export const findTargetTagNode = (
  targetTagName: string,
  nodes: Node[],
): TagNode | undefined => {
  return nodes.filter(isTagNode).find((node) => {
    return node.tagName === targetTagName;
  });
};

export const hasTargetTagNode = (
  targetTagName: string,
  nodes: Node[],
): boolean => {
  return !!findTargetTagNode(targetTagName, nodes);
};
