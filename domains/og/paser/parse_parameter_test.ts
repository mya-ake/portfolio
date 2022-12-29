import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import { parseParameter } from "./parse_parameter.ts";

describe("validateParameter", () => {
  it("default", () => {
    const parameter = parseParameter(new URL("https://exmaple.com"));
    assertEquals(parameter, { type: "square", size: 640 });
  });

  it("set values", () => {
    const parameter = parseParameter(
      new URL("https://exmaple.com?type=icon&size=1960"),
    );
    assertEquals(parameter, { type: "icon", size: 1960 });
  });

  it("throw error", () => {
    assertThrows(() => {
      parseParameter(new URL("https://example.com?type=s"));
    });
  });

  it("throw error, if size is not number", () => {
    assertThrows(() => {
      parseParameter(new URL("https://example.com?size=s"));
    });
  });
});
