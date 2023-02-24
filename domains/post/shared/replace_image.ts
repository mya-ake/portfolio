const REPLACED_URL_PREFIX = "/posts/images";

let originalOrigin = "";

export function replaceToReplacedUrl(originalUrl: URL): string {
  originalOrigin = originalUrl.origin;
  return REPLACED_URL_PREFIX + originalUrl.pathname + originalUrl.search;
}

export function replaceToOriginalUrl(replacedUrl: URL): string {
  replacedUrl.pathname = replacedUrl.pathname.replace(REPLACED_URL_PREFIX, "");
  replacedUrl.searchParams.delete("__frsh_c");
  const originalUrl = new URL(originalOrigin);
  originalUrl.pathname = replacedUrl.pathname;
  originalUrl.search = replacedUrl.search;
  return originalUrl.toString();
}
