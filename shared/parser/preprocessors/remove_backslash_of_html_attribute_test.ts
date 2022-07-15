import { assertEquals } from "std/testing/asserts.ts";
import { removeBackslashOfHTMLAttribute } from "./remove_backslash_of_html_attribute.ts";

Deno.test({
  name: "remove backslash from attributes",
  fn() {
    const result = removeBackslashOfHTMLAttribute(
      `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">https://example.com</a>`
    );
    assertEquals(
      result,
      `<a href="https://example.com" rel="noopener noreferrer">https://example.com</a>`
    );
  },
});

Deno.test({
  name: "don't remove from a content",
  fn() {
    const result = removeBackslashOfHTMLAttribute(
      `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">\\</a>`
    );
    assertEquals(
      result,
      `<a href="https://example.com" rel="noopener noreferrer">\\</a>`
    );
  },
});
