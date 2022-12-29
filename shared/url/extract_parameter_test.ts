import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { extractParameter } from "./extract_parameter.ts";

describe("extractParameter", () => {
  it("retrun {}, if parameters is nothing", () => {
    const result = extractParameter(new URL("https://example.com"));
    assertEquals(result, {});
  });

  it("return parameter object", () => {
    const result = extractParameter(
      new URL("https://example.com?test=1&type=a"),
    );
    assertEquals(result, { test: "1", type: "a" });
  });

  it("return parameter object, if the same key exsits", () => {
    const result = extractParameter(
      new URL("https://example.com?test=1&test=2"),
    );
    assertEquals(result, { test: "2" });
  });
});
