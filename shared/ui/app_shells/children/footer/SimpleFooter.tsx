/** @jsx h */
import { h } from "preact";
import { Copyright } from "./children/Copyright.tsx";

export function SimpleFooter() {
  return (
    <footer>
      <Copyright />
    </footer>
  );
}
