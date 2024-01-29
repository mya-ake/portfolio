import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { createFields } from "./utils.ts";
import type { Content } from "./type.ts";

type Model = Content<{
  id: string;
  models: NestedModel[];
  models2: NestedModel2;
}>;

type NestedModel = Content<{
  name: string;
}>;
type NestedModel2 = Content<{
  title: string;
}>;

describe("createFields", () => {
  it("only root", () => {
    const result = createFields<Model>(["id", "updatedAt"]);
    assertEquals(result, "id,updatedAt");
  });

  it("with nested", () => {
    const result = createFields<Model>(["id", "updatedAt"], {
      models: ["name", "publishedAt"],
      models2: ["title"],
    });
    assertEquals(
      result,
      "id,updatedAt,models.name,models.publishedAt,models2.title",
    );
  });
});
