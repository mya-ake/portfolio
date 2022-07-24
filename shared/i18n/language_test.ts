import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import { detectLang, getCurrentLang } from "./language.ts";

const samples = {
  acceptHeader: {
    onlyOne: "ja",
    multiple: "fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5",
  },
};

describe("language module behavior", () => {
  it("throws an error if the language is undetected", () => {
    assertThrows(() => {
      getCurrentLang();
    }, Error);
  });

  it("[temporary] return 'ja'", () => {
    const lang = detectLang({
      acceptLanguageHeader: samples.acceptHeader.onlyOne,
    });
    assertEquals(lang, "ja");
  });

  it("return a detected language", () => {
    const lang = getCurrentLang();
    assertEquals(lang, "ja");
  });
});

describe("detect language behavior", () => {
  // TODO
});
