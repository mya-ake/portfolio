import { useEffect } from "preact/hooks";
import { gtag } from "@shared/gtag/mod.ts";
import { getGATagId } from "@shared/env/mod.ts";

function init() {
  const gaTagId = getGATagId();
  if (gaTagId === "") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  gtag("js", new Date());
  gtag("config", getGATagId(), {
    send_page_view: true,
    cookie_expires: 0,
  });
}

export default function Gtag() {
  useEffect(() => {
    init();
  }, []);

  return <div></div>;
}
