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
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
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
