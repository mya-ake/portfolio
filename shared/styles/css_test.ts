import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { CSS, filterInvalidStyle } from "./css.ts";

describe("filterInvalidStyle", () => {
  it("remove undefied value", () => {
    const inputCSS: CSS = { gap: "4px", gridTemplate: undefined };
    const outputCSS = filterInvalidStyle(inputCSS);
    assertEquals(outputCSS, { gap: "4px" });
  });
});
