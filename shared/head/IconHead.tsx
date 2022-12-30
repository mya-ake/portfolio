/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export function IconHead() {
  return (
    <Head>
      <link rel="icon" href="/og?type=icon&size=32" sizes="any"></link>
      <link rel="icon" href="/og?type=icon&ext=svg" type="image/svg+xml"></link>
      <link rel="apple-touch-icon" href="/og?type=icon&size=180"></link>
      <link rel="manifest" href="/manifest.webmanifest"></link>
    </Head>
  );
}
