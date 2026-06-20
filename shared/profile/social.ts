import { translate } from "@shared/i18n/mod.ts";

export type SocialItem = {
  label: string;
  name: string;
  uri: string;
};

// Single source of truth for the profile's social links — consumed by the Home
// rail and the footer colophon so the labels/handles/URIs can't drift apart.
export function getSocialItems(): SocialItem[] {
  return [
    {
      label: translate("social:github"),
      name: translate("social:gitHubName"),
      uri: "https://github.com/mya-ake",
    },
    {
      label: translate("social:x"),
      name: translate("social:xName"),
      uri: "https://twitter.com/mya_ake",
    },
    {
      label: translate("social:zenn"),
      name: translate("social:zennName"),
      uri: "https://zenn.dev/mya_ake",
    },
  ];
}
