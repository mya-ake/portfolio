import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '../Heading';
import {
  Paragraph,
  Emphasis,
  Strong,
  Underline,
  Strikethrough,
  Code,
} from '../Text';
import type { RenderHTMLProps } from '~/components/core';

type Replacer = Required<RenderHTMLProps>['replacer'];

export const replacer: Replacer = ({ tagNode, childNodes, attrs, render }) => {
  switch (tagNode.tagName) {
    case 'h1':
      return <Heading1 {...attrs}>{render(childNodes)}</Heading1>;
    case 'h2':
      return <Heading2 {...attrs}>{render(childNodes)}</Heading2>;
    case 'h3':
      return <Heading3 {...attrs}>{render(childNodes)}</Heading3>;
    case 'h4':
      return <Heading4 {...attrs}>{render(childNodes)}</Heading4>;
    case 'h5':
      return <Heading5 {...attrs}>{render(childNodes)}</Heading5>;
    case 'h6':
      return <Heading6 {...attrs}>{render(childNodes)}</Heading6>;
    case 'p':
      return <Paragraph {...attrs}>{render(childNodes)}</Paragraph>;
    case 'em':
      return <Emphasis {...attrs}>{render(childNodes)}</Emphasis>;
    case 'strong':
      return <Strong {...attrs}>{render(childNodes)}</Strong>;
    case 'u':
      return <Underline {...attrs}>{render(childNodes)}</Underline>;
    case 's':
      return <Strikethrough {...attrs}>{render(childNodes)}</Strikethrough>;
    case 'code':
      return <Code {...attrs}>{render(childNodes)}</Code>;
    default:
      return null;
  }
};
