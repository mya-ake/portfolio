/* eslint-disable @typescript-eslint/no-explicit-any */
import parse5 from 'parse5';

type NodeType = 'tag' | 'text';
type Attributes = Record<string, string>;

export type TagNode = {
  nodeType: 'tag';
  tagName: string;
  attrs: Attributes;
  childNodes: Node[];
};

export type TextNode = {
  nodeType: 'text';
  content: string;
};

export type Node = TagNode | TextNode;

const getNodeType = (nodeName: string): NodeType => {
  switch (nodeName) {
    case '#text':
      return 'text';
    default:
      return 'tag';
  }
};

const createTagNode = (childNode: parse5.Element): TagNode => ({
  nodeType: 'tag',
  tagName: childNode.tagName,
  attrs: childNode.attrs.reduce<Attributes>((attrs, attrItem) => {
    attrs[attrItem.name] = attrItem.value;
    return attrs;
  }, {}),
  childNodes: convertNodes((childNode as any).childNodes ?? []),
});

const createTextNode = (childNode: parse5.TextNode): TextNode => ({
  nodeType: 'text',
  content: childNode.value,
});

const convertNode = (childNode: parse5.ChildNode): Node => {
  const nodeType = getNodeType(childNode.nodeName);
  switch (nodeType) {
    case 'tag':
      return createTagNode(childNode as parse5.Element);
    case 'text':
      return createTextNode(childNode as parse5.TextNode);
  }
};

const convertNodes = (childNodes: parse5.ChildNode[]): Node[] =>
  childNodes.map(convertNode);

export const parseHtml = (html: string): Node[] => {
  const documentFragment = parse5.parseFragment(html);
  return convertNodes(documentFragment.childNodes);
};
