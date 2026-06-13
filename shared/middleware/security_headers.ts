// Baseline security response headers applied to every response.
//
// Scope is intentionally limited to low-risk, non-breaking headers. The CSP is
// restricted to `frame-ancestors` (clickjacking protection) and deliberately
// does NOT set `script-src` / `style-src`, because the site loads Google
// Analytics and AdSense — enforcing those directives requires a report-only
// rollout first to avoid breaking ads/analytics.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Strict-Transport-Security": "max-age=31536000",
};

// This middleware runs globally over responses it does not own. Some of those
// have immutable headers — a `fetch()` passthrough (the `/posts/images` proxy)
// or `Response.redirect()` — where `headers.set()` throws. So copy the headers
// into a fresh `Headers` and rebuild the response instead of mutating in place.
export function applySecurityHeaders(resp: Response): Response {
  const headers = new Headers(resp.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers,
  });
}
