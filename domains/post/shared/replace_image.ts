const REPLACED_URL_PREFIX = "/posts/images";

// MicroCMS serves uploaded images from this fixed assets CDN. Pinning it as a
// constant (instead of carrying the origin in module state or in the proxied
// URL) keeps the rewrite stateless and means the image proxy can only ever
// fetch from this trusted host — the request can influence the path, never the
// origin, so there is no SSRF surface.
const ASSETS_ORIGIN = "https://images.microcms-assets.io";

export function replaceToReplacedUrl(originalUrl: URL): string {
  // Only proxy MicroCMS assets; any other image is returned untouched so the
  // browser loads it directly and the proxy is never pointed elsewhere.
  if (originalUrl.origin !== ASSETS_ORIGIN) {
    return originalUrl.toString();
  }
  return REPLACED_URL_PREFIX + originalUrl.pathname + originalUrl.search;
}

export function replaceToOriginalUrl(replacedUrl: URL): string {
  const pathname = replacedUrl.pathname.startsWith(REPLACED_URL_PREFIX)
    ? replacedUrl.pathname.slice(REPLACED_URL_PREFIX.length)
    : replacedUrl.pathname;
  const originalUrl = new URL(ASSETS_ORIGIN);
  originalUrl.pathname = pathname;
  originalUrl.search = replacedUrl.search;
  originalUrl.searchParams.delete("__frsh_c");
  return originalUrl.toString();
}
