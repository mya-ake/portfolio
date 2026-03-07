import type { PageProps } from "fresh";
import { Head } from "fresh/runtime";
import { DefaultHead } from "@shared/head/DefaultHead.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import Gtag from "@islands/Gtag.tsx";
import { getGAdId, getGATagId } from "@shared/env/mod.ts";
import { getCssText } from "@shared/styles/core.ts";
import { globalStyles } from "@shared/styles/global_styles.ts";
import { getNormalizeCss } from "@core/css/mod.ts";

function InlineStyle({ css }: { css: string }) {
  // deno-lint-ignore react-no-danger
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function App({ Component }: PageProps) {
  const gaTagId = getGATagId();
  const gAdId = getGAdId();
  globalStyles();
  const css = getCssText();
  const normalizeCss = getNormalizeCss();

  return (
    <>
      <Head>
        <InlineStyle css={normalizeCss + css} />
      </Head>
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
