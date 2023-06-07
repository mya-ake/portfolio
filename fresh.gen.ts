// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/og.tsx";
import * as $6 from "./routes/posts/[id].tsx";
import * as $7 from "./routes/posts/images/[...path].ts";
import * as $8 from "./routes/posts/index.tsx";
import * as $9 from "./routes/privacy_policy.tsx";
import * as $$0 from "./islands/Gtag.tsx";
import * as $$1 from "./islands/Highlight.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/index.tsx": $4,
    "./routes/og.tsx": $5,
    "./routes/posts/[id].tsx": $6,
    "./routes/posts/images/[...path].ts": $7,
    "./routes/posts/index.tsx": $8,
    "./routes/privacy_policy.tsx": $9,
  },
  islands: {
    "./islands/Gtag.tsx": $$0,
    "./islands/Highlight.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
