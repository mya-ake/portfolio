import { AppProps } from "$fresh/server.ts";
import { DefaultHead } from "@shared/head/DefaultHead.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import Gtag from "@islands/Gtag.tsx";
import { getGAdId, getGATagId } from "@shared/env/mod.ts";

export default function App({ Component }: AppProps) {
  const gaTagId = getGATagId();
  const gAdId = getGAdId();

  return (
    <>
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

      <DefaultHead />
      <Gtag gaTagId={gaTagId} />

      <Grid
        templateRows="auto 1fr auto"
        css={{ minHeight: "100dvh", overflow: "auto" }}
      >
        <Component />
      </Grid>
    </>
  );
}
