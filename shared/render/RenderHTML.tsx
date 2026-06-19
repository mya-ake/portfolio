import { Fragment } from "preact";
import { Node, parseHtml } from "@shared/parser/html_parser.ts";
import { Heading, Level } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { replaceToReplacedUrl } from "@post/shared/replace_image.ts";
import { safeHref } from "@shared/url/safe_href.ts";
import { ListItem, OrderList, UnorderList } from "@shared/ui/list/mod.ts";
import { clsx } from "clsx";

type Props = {
  html: string;
};

function render(nodes: Node[]) {
  return nodes.map((node, index) => {
    if (node.nodeType === "text") {
      return <Fragment key={index}>{node.content}</Fragment>;
    }
    switch (node.tagName) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const level = node.tagName.substring(1) as Level;
        const marginClass = ["h1", "h2"].includes(node.tagName)
          ? "mt-12 mb-4"
          : "mt-8 mb-4";
        return (
          <Heading
            id={node.attrs.id}
            level={level}
            class={clsx(marginClass, "text-text")}
            style={node.attrs.style}
          >
            {render(node.childNodes)}
          </Heading>
        );
      }
      case "p": {
        return (
          <Text
            class={clsx("rh-p", node.attrs.class)}
            style={node.attrs.style}
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
        // Block code (inside <pre>, carries a `language-*` class) is left plain
        // for highlight.js / the code-block chrome; only inline code gets the
        // editorial accent chip.
        const isBlockCode = (node.attrs.class ?? "").includes("language");
        return (
          <code
            style={node.attrs.style}
            class={isBlockCode ? node.attrs.class : clsx(
              node.attrs.class,
              "text-accent px-[7px] py-px bg-code-bg rounded",
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
            class="my-7 border-l-2 border-accent pl-[22px] italic text-muted leading-relaxed"
          >
            {render(node.childNodes)}
          </blockquote>
        );
      }
      case "figure": {
        return (
          <figure class="my-7" style={node.attrs.style}>
            {render(node.childNodes)}
          </figure>
        );
      }
      case "figcaption": {
        return (
          <figcaption
            class="mt-2.5 text-center font-mono text-muted text-xs"
            style={node.attrs.style}
          >
            {render(node.childNodes)}
          </figcaption>
        );
      }
      case "img": {
        const src = replaceToReplacedUrl(new URL(node.attrs.src));
        return (
          <img
            src={src}
            alt={node.attrs.alt}
            class="w-full"
            style={{
              maxWidth: `${node.attrs.width}px`,
              maxHeight: `${node.attrs.height}px`,
            }}
          />
        );
      }
      case "a": {
        const href = safeHref(node.attrs.href ?? "");
        const isExternal = Boolean(node.attrs.target);
        return isExternal
          ? (
            <StyledExternalLink href={href}>
              {render(node.childNodes)}
            </StyledExternalLink>
          )
          : (
            <StyledInternalLink href={href}>
              {render(node.childNodes)}
            </StyledInternalLink>
          );
      }
      case "ul": {
        return (
          <UnorderList class="rh-ul">
            {render(node.childNodes)}
          </UnorderList>
        );
      }
      case "ol": {
        return (
          <OrderList class="rh-ol">
            {render(node.childNodes)}
          </OrderList>
        );
      }
      case "li": {
        return <ListItem>{render(node.childNodes)}</ListItem>;
      }
      case "pre": {
        return (
          <pre class="block m-0 my-7 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-xl border border-rule bg-surface p-[18px] font-mono text-[0.8125rem] leading-[1.85] text-code">
            {render(node.childNodes)}
          </pre>
        );
      }
      case "hr": {
        return <hr class="my-12 border-0 border-t border-hr" />;
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
