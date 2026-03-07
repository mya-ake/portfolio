import { Builder } from "fresh/dev";

const builder = new Builder();
if (Deno.args.includes("build")) {
  const finish = await builder.build();
  const { app } = await import("./main.ts");
  finish(app);
} else {
  await builder.listen(() => import("./main.ts"));
}
