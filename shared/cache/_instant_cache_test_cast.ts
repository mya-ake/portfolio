import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { assertSpyCalls, spy } from "std/testing/mock.ts";
import type { CreateInstantCache } from "./create_instant_cache.ts";

export function testBasicSpec(createInstantCache: CreateInstantCache) {
  describe("createInstantCacheFactory", () => {
    it("returns the task result", async () => {
      const task = () => "test";

      const execute = createInstantCache(task);
      const result = await execute();

      assertEquals(result, "test");
    });

    it("returns the task result and task is called once", async () => {
      const task = () => "test";
      const taskSpy = spy(task);

      const execute = createInstantCache(taskSpy);
      const result1 = await execute();
      const result2 = await execute();

      assertEquals(result1, result2);
      assertSpyCalls(taskSpy, 1);
    });

    it("returns the task result with an input", async () => {
      type Parameter = { message: string };
      const task = (parameter: Parameter) => parameter.message;
      const taskSpy = spy(task);

      const executer = createInstantCache(taskSpy);
      const result1 = await executer({ message: "a" });
      const result2 = await executer({ message: "b" });

      assertEquals(result1, "a");
      assertEquals(result2, "b");
      assertSpyCalls(taskSpy, 2);
    });
  });
}
