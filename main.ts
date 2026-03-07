import { App, staticFiles } from "fresh";
import { readNormalizeCss } from "./core/css/mod.ts";

export const app = new App({ root: import.meta.url });

app.use(staticFiles());
app.fsRoutes();

// Pre-warm normalize CSS cache so _app.tsx can access it synchronously
await readNormalizeCss(import.meta.dirname!);

if (import.meta.main) {
  await app.listen({ port: 8000 });
}
