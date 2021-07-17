import { findTargetTagNode } from '@mya-ake-com/parser';
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
  TextLink,
  Blockquote,
} from '../Text';
import { UnorderedList, OrderedList, ListItem } from '../List';
import { Image } from '../Image';
import { CodePresenter } from '../CodePresenter';
import { HorizontalRule } from '../others';
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
    case 'a': {
      return 'href' in attrs ? (
        <TextLink href={attrs.href} {...attrs}>
          {render(childNodes)}
        </TextLink>
      ) : null;
    }
    case 'blockquote':
      return <Blockquote {...attrs}>{render(childNodes)}</Blockquote>;
    case 'ul':
      return <UnorderedList {...attrs}>{render(childNodes)}</UnorderedList>;
    case 'ol':
      return <OrderedList {...attrs}>{render(childNodes)}</OrderedList>;
    case 'li':
      return <ListItem {...attrs}>{render(childNodes)}</ListItem>;
    case 'img': {
      if ('src' in attrs && 'alt' in attrs) {
        const [alt, _, height] = attrs.alt.split(':');
        return <Image {...attrs} src={attrs.src} alt={alt} height={height} />;
      } else {
        return null;
      }
    }
    case 'hr':
      return <HorizontalRule {...attrs} />;
    case 'pre': {
      const codeNode = findTargetTagNode('code', childNodes);
      if (codeNode) {
        return (
          <CodePresenter {...attrs}>
            {render(codeNode.childNodes)}
          </CodePresenter>
        );
      } else {
        return null;
      }
    }
    default:
      return null;
  }
};
