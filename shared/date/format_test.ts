import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { formatDate } from "./format.ts";

describe("formatDate", () => {
  it("formatable", () => {
    const result = formatDate(new Date("2022-11-30"), "YYYY.MM.DD");
    assertEquals(result, "2022.11.30");
  });
});
