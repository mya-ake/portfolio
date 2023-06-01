import { Node, parseHtml } from "@shared/parser/html_parser.ts";
import { Heading, Level } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { replaceToReplacedUrl } from "@post/shared/replace_image.ts";
import { ListItem, OrderList, UnorderList } from "@shared/ui/list/mod.ts";
import { CSS, css } from "@shared/styles/css.ts";
import { clsx } from "clsx";

const customClasses = {
  spacer: "cms-space",
};

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
            marginTop: "$8",
            marginBottom: "$4",
          };
        return (
          <Heading
            id={node.attrs.id}
            level={level}
            css={style}
            style={node.attrs.style}
          >
            {render(node.childNodes)}
          </Heading>
        );
      }
      case "p": {
        return (
          <Text
            css={{
              "& + ul": { marginTop: "$4" },
              "& + ol": { marginTop: "$4" },
              [`&:has(span.${customClasses.spacer})`]: { marginTop: "$4" },
            }}
            style={node.attrs.style}
            class={node.attrs.class}
          >
            {render(node.childNodes)}
          </Text>
        );
      }
      case "span": {
        return (
          <span class={node.attrs.class ?? ""} style={node.attrs.style}>
            {render(node.childNodes)}
          </span>
        );
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
            class={clsx(
              node.attrs.class,
              css({
                color: "$code",
                px: "7px",
                backgroundColor: "$codeBackground",
                borderRadius: "$4",
              })().toString(),
            )}
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
              lineHeight: "1.6",
            })()}
          >
            {render(node.childNodes)}
          </blockquote>
        );
      }
      case "figure": {
        return (
          <figure class={css({ margin: "$4 0" })()}>
            {render(node.childNodes)}
          </figure>
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
        return (
          <UnorderList css={{ "& + p": { marginTop: "$4" } }}>
            {render(node.childNodes)}
          </UnorderList>
        );
      }
      case "ol": {
        return (
          <OrderList css={{ "& + p": { marginTop: "$4" } }}>
            {render(node.childNodes)}
          </OrderList>
        );
      }
      case "li": {
        return <ListItem>{render(node.childNodes)}</ListItem>;
      }
      case "pre": {
        return (
          <pre
            class={css({
              display: "block",
              margin: "0",
              my: "$4",
              maxWidth: "calc(100vw - calc($4 * 2))",
            })()}
          >{render(node.childNodes)}</pre>
        );
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
