import { useEffect } from "preact/hooks";
import { gtag } from "@shared/gtag/mod.ts";

function init(gaTagId: string) {
  globalThis.dataLayer = globalThis.dataLayer || [];

  gtag("consent", "default", {
    "analytics_storage": "denied",
    "ad_storage": "denied",
  });
  gtag("consent", "default", {
    "analytics_storage": "granted",
    "region": ["JP"],
  });
  gtag("js", new Date());
  gtag("config", gaTagId);
}

type Props = {
  gaTagId: string;
};

export default function Gtag(props: Props) {
  const { gaTagId } = props;

  useEffect(() => {
    if (gaTagId === "") {
      return;
    }
    init(gaTagId);
  }, []);

  return <div></div>;
}
