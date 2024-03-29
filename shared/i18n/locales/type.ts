export type LocaleResouce = {
  profile: {
    heading: string;
    name: string;
    nameWithYomi: string;
  };
  description: {
    default: string;
  };
  breadcrumbs: {
    heading: string;
  };
  home: {
    name: string;
    heading: string;
  };
  posts: {
    name: string;
    heading: string;
  };
  privacy_policy: {
    name: string;
    heading: string;
  };
  footer: {
    copyright: string;
  };
  footer_links: {
    heading: string;
    privacy_policy: string;
  };
  social: {
    heading: string;
    github: "GitHub";
    gitHubName: string;
    x: "X(Twitter)";
    xName: string;
    zenn: "Zenn";
    zennName: string;
  };
  immutable: {
    updatedDate: string;
  };
};
