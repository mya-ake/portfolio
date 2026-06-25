import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import i18n from "i18next";
import { init } from "./core.ts";
import { translate } from "./translate.ts";
import { ja } from "./locales/mod.ts";

// `i18next` is a global singleton shared by core.ts, translate.ts and this test.
// `init` guards on `i18n.isInitialized`, so once any test (here or elsewhere in
// the same `deno test` run) initializes it, the instance stays initialized.
// These tests therefore ensure initialization themselves and assert behavior
// that holds regardless of which test ran first.
describe("i18n init behavior", () => {
  it("marks i18next as initialized after init", async () => {
    await init({ lang: "ja" });

    assertEquals(i18n.isInitialized, true);
  });

  it("sets the language to the passed lang", async () => {
    await init({ lang: "ja" });

    assertEquals(i18n.language, "ja");
  });

  it("configures 'ja' as the fallback language", async () => {
    await init({ lang: "ja" });

    // i18next normalizes `fallbackLng` to an array internally.
    assertEquals(i18n.options.fallbackLng, ["ja"]);
  });

  it("loads the ja resources so real keys resolve to their ja values", async () => {
    // Indirect verification that `resources: { ja }` was registered: a real key
    // from ja.ts must resolve to its ja value after init.
    await init({ lang: "ja" });

    assertEquals(translate("profile:heading"), ja.profile.heading);
  });

  it("is a no-op when called again while already initialized", async () => {
    // Reach a known-initialized state first (idempotent thanks to the guard).
    await init({ lang: "ja" });
    assertEquals(i18n.isInitialized, true);

    // A second call with a different lang must hit the `isInitialized` guard and
    // return early: it must not throw, must not re-initialize, and must not
    // change the already-resolved language.
    await init({ lang: "en" });

    assertEquals(i18n.isInitialized, true);
    assertEquals(i18n.language, "ja");
  });
});
