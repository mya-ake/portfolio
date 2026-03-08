import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";

const builder = new Builder();
tailwind(builder);

if (Deno.args.includes("build")) {
  const finish = await builder.build();
  const { app } = await import("./main.ts");
  finish(app);
} else {
  await builder.listen(() => import("./main.ts"));
}
