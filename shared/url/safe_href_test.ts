import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { safeHref } from "./safe_href.ts";

describe("safeHref", () => {
  describe("allows safe URLs and returns them unchanged", () => {
    const allowed = [
      "https://example.com/x",
      "http://example.com",
      "/relative/path",
      "./rel",
      "../up",
      "#fragment",
      "?q=1",
      "//protocol-relative.com/x",
      "mailto:someone@example.com",
      "tel:+81-90-0000-0000",
    ];
    for (const href of allowed) {
      it(href, () => {
        assertEquals(safeHref(href), href);
      });
    }
  });

  describe("blocks dangerous schemes and returns '#'", () => {
    const blocked = [
      "javascript:alert(1)",
      "  javascript:alert(1)", // leading whitespace
      "JaVaScRiPt:alert(1)", // mixed case
      "java\tscript:alert(1)", // tab inside the scheme
      "java\nscript:alert(1)", // newline inside the scheme
      "javascript:alert(1)", // leading control character
      "data:text/html,<script>alert(1)</script>",
      "vbscript:msgbox(1)",
      "blob:https://example.com/uuid",
    ];
    for (const href of blocked) {
      it(JSON.stringify(href), () => {
        assertEquals(safeHref(href), "#");
      });
    }
  });

  describe("edge cases", () => {
    it("returns an empty string unchanged", () => {
      assertEquals(safeHref(""), "");
    });

    it("returns '#' for a malformed URL that fails to parse", () => {
      assertEquals(safeHref("http://["), "#");
    });
  });
});
