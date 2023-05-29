import { useEffect } from "preact/hooks";
import hljs from "hljs";

interface hljs {
  highlightAll(): void;
}

export default function Highlight() {
  useEffect(() => {
    (hljs as hljs).highlightAll();
  }, []);
  // If you don't render something, you'll get an error.
  return <div></div>;
}
