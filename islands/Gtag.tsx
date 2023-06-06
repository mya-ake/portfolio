import { useEffect } from "preact/hooks";
import { gtag } from "@shared/gtag/mod.ts";

function init(gaTagId: string) {
  window.dataLayer = window.dataLayer || [];

  gtag("consent", "default", {
    "ad_storage": "denied",
    "analytics_storage": "denied",
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
