import { App, staticFiles } from "fresh";

export const app = new App();

app.use(staticFiles());
app.fsRoutes();

if (import.meta.main) {
  await app.listen({ port: 8000 });
}
