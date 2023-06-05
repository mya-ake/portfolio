import { AppProps } from "$fresh/server.ts";
import { DefaultHead } from "@shared/head/DefaultHead.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import Gtag from "@islands/Gtag.tsx";
import { getGATagId } from "@shared/env/mod.ts";

export default function App({ Component }: AppProps) {
  const gaTagId = getGATagId();

  return (
    <>
      {gaTagId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaTagId}`}
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
