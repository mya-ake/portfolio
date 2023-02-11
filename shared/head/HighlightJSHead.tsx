/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export function HighlightJSHead() {
  return (
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark-dimmed.min.css"
      />
    </Head>
  );
}
