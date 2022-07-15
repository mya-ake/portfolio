import { DefaultTreeAdapterMap, parse } from "parse5";

type NodeType = "tag" | "text";
type Attributes = Record<string, string>;
type Document = DefaultTreeAdapterMap["document"];
type ChildNode = Document["childNodes"][number];
type Element = DefaultTreeAdapterMap["element"];
type Parse5TextNode = DefaultTreeAdapterMap["textNode"];

export type TagNode = {
  nodeType: "tag";
  tagName: string;
  attrs: Attributes;
  childNodes: Node[];
};

export type TextNode = {
  nodeType: "text";
  content: string;
};

export type Node = TagNode | TextNode;

const getNodeType = (nodeName: string): NodeType => {
  switch (nodeName) {
    case "#text":
      return "text";
    default:
      return "tag";
  }
};

const createTagNode = (childNode: Element): TagNode => ({
  nodeType: "tag",
  tagName: childNode.tagName,
  attrs: childNode.attrs.reduce<Attributes>((attrs, attrItem) => {
    attrs[attrItem.name] = attrItem.value;
    return attrs;
  }, {}),
  childNodes: convertNodes(childNode.childNodes ?? []),
});

const createTextNode = (childNode: Parse5TextNode): TextNode => ({
  nodeType: "text",
  content: childNode.value,
});

const convertNode = (childNode: ChildNode): Node => {
  const nodeType = getNodeType(childNode.nodeName);
  switch (nodeType) {
    case "tag":
      return createTagNode(childNode as Element);
    case "text":
      return createTextNode(childNode as Parse5TextNode);
  }
};

const convertNodes = (childNodes: ChildNode[]): Node[] =>
  childNodes.map(convertNode);

const extractBaseNodes = (nodes: Node[]): Node[] => {
  return nodes.reduce((currentNodes, node) => {
    if (node.nodeType === "tag") {
      if (["html", "body"].includes(node.tagName)) {
        return extractBaseNodes(node.childNodes);
      }
    }
    return [...currentNodes, node];
  }, [] as Node[]);
};

export type Preprocessor = (html: string) => string;
export type Option = {
  preprocessors?: Preprocessor[];
};

export const parseHtml = (html: string, option?: Option): Node[] => {
  const preprocessors = option?.preprocessors ?? [];
  const processedHtml = preprocessors.reduce(
    (html, processor) => {
      return processor(html);
    },
    html,
  );
  const documentFragment = parse(processedHtml, {});
  const nodes = convertNodes(documentFragment.childNodes);
  return extractBaseNodes(nodes);
};
