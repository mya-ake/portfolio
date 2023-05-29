import { Node, parseHtml } from "@shared/parser/html_parser.ts";
import { Heading, Level } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { replaceToReplacedUrl } from "@post/shared/replace_image.ts";
import { ListItem, OrderList, UnorderList } from "@shared/ui/list/mod.ts";
import { CSS, css } from "@shared/styles/css.ts";

type Props = {
  html: string;
};

function render(nodes: Node[]) {
  return nodes.map((node) => {
    if (node.nodeType === "text") {
      return <>{node.content}</>;
    }
    switch (node.tagName) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const level = node.tagName.substring(1) as Level;
        const style: CSS = ["h1", "h2"].includes(node.tagName)
          ? {
            marginTop: "$12",
            marginBottom: "$4",
          }
          : {
            marginTop: "$4",
            marginBottom: "$2",
          };
        return (
          <Heading level={level} css={style} style={node.attrs.style}>
            {render(node.childNodes)}
          </Heading>
        );
      }
      case "p": {
        return (
          <Text
            style={node.attrs.style}
          >
            {render(node.childNodes)}
          </Text>
        );
      }
      case "span": {
        return <span style={node.attrs.style}>{render(node.childNodes)}</span>;
      }
      case "br": {
        return <br />;
      }
      case "em": {
        return <em style={node.attrs.style}>{render(node.childNodes)}</em>;
      }
      case "strong": {
        return (
          <strong style={node.attrs.style}>{render(node.childNodes)}</strong>
        );
      }
      case "u": {
        return <u style={node.attrs.style}>{render(node.childNodes)}</u>;
      }
      case "s": {
        return <s style={node.attrs.style}>{render(node.childNodes)}</s>;
      }
      case "code": {
        return (
          <code
            style={node.attrs.style}
            class={css({
              color: "$code",
              px: "7px",
              backgroundColor: "$codeBackground",
              borderRadius: "$4",
            })()}
          >
            {render(node.childNodes)}
          </code>
        );
      }
      case "blockquote": {
        return (
          <blockquote
            style={node.attrs.style}
            class={css({
              margin: "$4 0",
              borderLeft: "4px solid $text",
            })()}
          >
            {render(node.childNodes)}
          </blockquote>
        );
      }
      case "img": {
        const src = replaceToReplacedUrl(new URL(node.attrs.src));
        return (
          <img
            src={src}
            alt={node.attrs.alt}
            class={css({
              width: "100%",
              maxWidth: `${node.attrs.width}px`,
              maxHeight: `${node.attrs.height}px`,
            })()}
          />
        );
      }
      case "a": {
        const isExternal = Boolean(node.attrs.target);
        return isExternal
          ? (
            <StyledExternalLink href={node.attrs.href}>
              {render(node.childNodes)}
            </StyledExternalLink>
          )
          : (
            <StyledInternalLink href={node.attrs.href}>
              {render(node.childNodes)}
            </StyledInternalLink>
          );
      }
      case "ul": {
        return <UnorderList>{render(node.childNodes)}</UnorderList>;
      }
      case "ol": {
        return <OrderList>{render(node.childNodes)}</OrderList>;
      }
      case "li": {
        return <ListItem>{render(node.childNodes)}</ListItem>;
      }
      case "pre": {
        return <pre>{render(node.childNodes)}</pre>;
      }
      default: {
        console.log(node);
      }
    }
    return null;
  });
}

export function RenderHTML({ html }: Props) {
  const nodes = parseHtml(html);
  const elements = render(nodes);
  return <>{elements}</>;
}
