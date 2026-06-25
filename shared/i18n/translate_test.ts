import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { init } from "./core.ts";
import { translate } from "./translate.ts";
import { ja } from "./locales/mod.ts";

// `translate` delegates to the global i18next singleton, which `init` configures.
// `init` is idempotent (guards on `isInitialized`), so each test ensures the
// singleton is initialized before exercising `translate` — this keeps the file
// order-independent even though the singleton state is shared process-wide.

// The key type is intentionally exhaustive in production (`TranslateKey`), so it
// is not exported. Derive it from `translate`'s own signature to reference it
// here without changing production code.
type TranslateArg = Parameters<typeof translate>[0];

describe("translate behavior", () => {
  it("resolves a 'namespace:key' string to its ja value", async () => {
    await init({ lang: "ja" });

    assertEquals(translate("profile:heading"), ja.profile.heading);
  });

  it("resolves keys across multiple namespaces using the ':' separator", async () => {
    await init({ lang: "ja" });

    assertEquals(translate("home:heading"), ja.home.heading);
    assertEquals(translate("social:github"), ja.social.github);
    assertEquals(translate("immutable:updatedDate"), ja.immutable.updatedDate);
  });

  it("resolves an array of keys to the first matching translation", async () => {
    await init({ lang: "ja" });

    assertEquals(
      translate(["profile:heading", "home:heading"]),
      ja.profile.heading,
    );
  });

  it("interpolates {{var}} placeholders from option values", async () => {
    await init({ lang: "ja" });

    // Mirrors the two real interpolation call sites:
    // - Posts.tsx     -> translate("posts:total", { total: String(...) })
    // - Copyright.tsx -> translate("footer:copyright", { year: currentYear })
    // Values are passed as strings to match TranslateOption's `& Record<string,
    // string>` typing (the call sites stringify their inputs, so no new `as` is
    // needed). Expected values are derived from the real ja.* strings via
    // `.replace`, keeping the no-duplicate-literals discipline of this file.
    assertEquals(
      translate("posts:total", { total: "12" }),
      ja.posts.total.replace("{{total}}", "12"),
    );
    assertEquals(
      translate("footer:copyright", { year: "2026" }),
      ja.footer.copyright.replace("{{year}}", "2026"),
    );
  });

  it("returns option.defaultValue for an undefined key", async () => {
    await init({ lang: "ja" });

    // `TranslateKey` is exhaustive over the keys defined in ja.ts, so no valid
    // key resolves to "missing" — there is genuinely no type-safe way to feed
    // `translate` an undefined key. A single, isolated assertion is the lowest
    // cost way to exercise the i18next `defaultValue` fallback path.
    const undefinedKey = "profile:does-not-exist" as TranslateArg;

    assertEquals(
      translate(undefinedKey, { defaultValue: "FALLBACK" }),
      "FALLBACK",
    );
  });

  it("returns a value assignable to string (i18next v26 t() return type guard)", async () => {
    await init({ lang: "ja" });

    // Type-level regression guard: if i18next's `t()` return type stops being
    // assignable to `string`, this assignment fails `deno check`.
    const result: string = translate("profile:heading");

    assertEquals(result, ja.profile.heading);
  });
});
