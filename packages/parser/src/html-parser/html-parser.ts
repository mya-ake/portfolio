/* eslint-disable @typescript-eslint/no-explicit-any */
import parse5 from 'parse5';

type NodeType = 'tag' | 'text';
type Attr = {
  name: string;
  value: string;
};

type TagNode = {
  nodeType: 'tag';
  tagName: string;
  attrs: Attr[];
  childNodes: Node[];
};

type TextNode = {
  nodeType: 'text';
  content: string;
};

type Node = TagNode | TextNode;

const getNodeType = (nodeName: string): NodeType => {
  switch (nodeName) {
    case '#text':
      return 'text';
    default:
      return 'tag';
  }
};

const createTagNode = (childNode: parse5.ChildNode): TagNode => ({
  nodeType: 'tag',
  tagName: (childNode as any).tagName as string,
  attrs: (childNode as any).attrs,
  childNodes: convertNodes((childNode as any).childNodes ?? []),
});

const createTextNode = (childNode: parse5.ChildNode): TextNode => ({
  nodeType: 'text',
  content: (childNode as any).value,
});

const convertNode = (childNode: parse5.ChildNode): Node => {
  const nodeType = getNodeType(childNode.nodeName);
  switch (nodeType) {
    case 'tag':
      return createTagNode(childNode);
    case 'text':
      return createTextNode(childNode);
  }
};

const convertNodes = (childNodes: parse5.ChildNode[]): Node[] =>
  childNodes.map(convertNode);

export const parseHtml = (html: string): Node[] => {
  const documentFragment = parse5.parseFragment(html);
  return convertNodes(documentFragment.childNodes);
};
