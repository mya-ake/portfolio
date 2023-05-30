export type LocaleResouce = {
  profile: {
    heading: string;
    name: string;
    nameWithYomi: string;
  };
  description: {
    default: string;
  };
  home: {
    name: string;
    heading: string;
  };
  posts: {
    name: string;
    heading: string;
  };
  footer: {
    copyright: string;
  };
  social: {
    heading: string;
    github: "GitHub";
    gitHubName: string;
    twitter: "Twitter";
    twitterName: string;
    zenn: "Zenn";
    zennName: string;
  };
  immutable: {
    updatedDate: string;
  };
};
