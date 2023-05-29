import { Head } from "$fresh/runtime.ts";

export function DefaultMeta() {
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
    </Head>
  );
}
