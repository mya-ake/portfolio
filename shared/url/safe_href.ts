// Returns `href` unchanged when it uses a safe scheme (or is relative), and a
// neutral "#" otherwise. Post content comes from MicroCMS (trusted authoring),
// so this is defense-in-depth against a `javascript:` / `data:` URL slipping
// into a rendered link.
//
// Detection goes through the URL parser so obfuscated schemes — leading
// whitespace/control characters, `java\tscript:`, mixed case — are normalized
// the same way a browser resolves them. The base is only used to resolve
// relative refs for protocol detection; safe values are returned verbatim, so
// it never leaks into the output.
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function safeHref(href: string): string {
  try {
    const { protocol } = new URL(href, "https://base.invalid");
    return SAFE_PROTOCOLS.has(protocol) ? href : "#";
  } catch {
    return "#";
  }
}
