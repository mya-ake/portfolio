import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { applySecurityHeaders } from "./security_headers.ts";

describe("applySecurityHeaders", () => {
  it("sets X-Content-Type-Options to nosniff", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(resp.headers.get("x-content-type-options"), "nosniff");
  });

  it("sets Referrer-Policy to strict-origin-when-cross-origin", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(
      resp.headers.get("referrer-policy"),
      "strict-origin-when-cross-origin",
    );
  });

  it("sets X-Frame-Options to SAMEORIGIN", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(resp.headers.get("x-frame-options"), "SAMEORIGIN");
  });

  it("sets a frame-ancestors CSP without restricting scripts or styles", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(
      resp.headers.get("content-security-policy"),
      "frame-ancestors 'self'",
    );
  });

  it("disables unused features via Permissions-Policy", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(
      resp.headers.get("permissions-policy"),
      "camera=(), geolocation=(), microphone=()",
    );
  });

  it("sets HSTS for this host only (no includeSubDomains)", () => {
    const resp = applySecurityHeaders(new Response("ok"));
    assertEquals(
      resp.headers.get("strict-transport-security"),
      "max-age=31536000",
    );
  });

  it("preserves the response status, statusText, and body", async () => {
    const resp = applySecurityHeaders(
      new Response("hello body", { status: 201, statusText: "Created" }),
    );
    assertEquals(resp.status, 201);
    assertEquals(resp.statusText, "Created");
    assertEquals(await resp.text(), "hello body");
  });

  it("preserves headers that were already set", () => {
    const resp = applySecurityHeaders(
      new Response("ok", {
        headers: {
          "content-type": "image/png",
          "cache-control": "public, max-age=60",
        },
      }),
    );
    assertEquals(resp.headers.get("content-type"), "image/png");
    assertEquals(resp.headers.get("cache-control"), "public, max-age=60");
    assertEquals(resp.headers.get("x-content-type-options"), "nosniff");
  });

  it("overwrites a conflicting security header already on the response", () => {
    const resp = applySecurityHeaders(
      new Response("ok", {
        headers: {
          "x-frame-options": "DENY",
          "content-security-policy": "default-src 'none'",
        },
      }),
    );
    // `.set()` (not `.append()`) must win, leaving a single clean value.
    assertEquals(resp.headers.get("x-frame-options"), "SAMEORIGIN");
    assertEquals(
      resp.headers.get("content-security-policy"),
      "frame-ancestors 'self'",
    );
  });

  it("does not throw on a response with immutable headers", () => {
    // `fetch()` passthroughs (the image proxy) and redirects have immutable
    // headers; the middleware must reconstruct rather than throw, while
    // preserving status and pre-existing headers like Location.
    const immutable = Response.redirect("https://example.com/", 302);
    const resp = applySecurityHeaders(immutable);
    assertEquals(resp.status, 302);
    assertEquals(resp.headers.get("location"), "https://example.com/");
    assertEquals(resp.headers.get("x-content-type-options"), "nosniff");
  });
});
