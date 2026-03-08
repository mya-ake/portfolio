import type { PageProps } from "fresh";
import { DefaultHead } from "@shared/head/DefaultHead.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import Gtag from "@islands/Gtag.tsx";
import { getGAdId, getGATagId } from "@shared/env/mod.ts";

export default function App({ Component }: PageProps) {
  const gaTagId = getGATagId();
  const gAdId = getGAdId();

  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="/styles.css" />
        {gaTagId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTagId}`}
          >
          </script>
        )}
        {gAdId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${gAdId}`}
            crossOrigin="anonymous"
          >
          </script>
        )}
      </head>
      <body>
        <DefaultHead />
        <Gtag gaTagId={gaTagId} />
        <Grid
          templateRows="auto 1fr auto"
          class="min-h-dvh overflow-auto"
        >
          <Component />
        </Grid>
      </body>
    </html>
  );
}
