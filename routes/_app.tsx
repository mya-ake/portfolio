import type { PageProps } from "fresh";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import Gtag from "@islands/Gtag.tsx";
import { getGAdId, getGATagId } from "@shared/env/mod.ts";

export default function App({ Component }: PageProps) {
  const gaTagId = getGATagId();
  const gAdId = getGAdId();

  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display&display=swap"
          rel="stylesheet"
        />
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
