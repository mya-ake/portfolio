import { Head } from "$fresh/runtime.ts";
import { getGATagId } from "@shared/env/mod.ts";

export function DefaultHead() {
  const gaTagId = getGATagId();

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display&display=swap"
        rel="stylesheet"
      />
      {gaTagId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaTagId}`}
        >
        </script>
      )}
    </Head>
  );
}
