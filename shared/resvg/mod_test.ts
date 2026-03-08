import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { render } from "./mod.ts";

describe("render", () => {
  it("renders SVG to PNG bytes", async () => {
    const svg =
      '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="red"/></svg>';
    const png = await render(svg);
    assertEquals(png instanceof Uint8Array, true);
    // PNG magic bytes: 137 80 78 71
    assertEquals(png[0], 137);
    assertEquals(png[1], 80);
    assertEquals(png[2], 78);
    assertEquals(png[3], 71);
  });
});
