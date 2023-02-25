import { describe, it } from "std/testing/bdd.ts";
import {
  assertEquals,
  assertObjectMatch,
  assertThrows,
} from "std/testing/asserts.ts";
import { z } from "zod";
import { parseParameter } from "./parse_parameter.ts";

describe("validateParameter", () => {
  it("default", () => {
    const parameter = parseParameter(new URL("https://exmaple.com"));
    assertEquals(parameter, {
      type: "square",
      ext: "png",
      size: 640,
      text: "",
    });
  });

  it("set values", () => {
    const parameter = parseParameter(
      new URL("https://exmaple.com?type=icon&ext=svg&size=1960"),
    );
    assertEquals(parameter, { type: "icon", ext: "svg", size: 1960, text: "" });
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

  describe("if type is text", () => {
    it("text is required", () => {
      assertThrows(
        () => {
          parseParameter(new URL("https://example.com?type=text"));
        },
        z.ZodError,
        "When type is text, text is required.",
      );
    });

    it("success if text exsits", () => {
      const parameter = parseParameter(
        new URL("https://exmaple.com?type=text&text=test"),
      );
      assertObjectMatch(parameter, {
        type: "text",
        text: "test",
      });
    });

    it("text is trimed", () => {
      const parameter = parseParameter(
        new URL("https://exmaple.com?type=text&text= test "),
      );
      assertObjectMatch(parameter, {
        type: "text",
        text: "test",
      });
    });
  });
});
