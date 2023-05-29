import { Head } from "$fresh/runtime.ts";

const siteName = "neko-note′";
const twitterAccount = "@mya_ake";
const origin = "https://mya-ake.com";
const defaultImagePath = "/og?type=square&size=640";

export type SEOHeadProps = {
  title?: string;
  description: string;
  path: string;
  imagePath?: string;
  twitterCardType?: "summary" | "summary_large_image";
};

export function SEOHead(props: SEOHeadProps) {
  const { title, description, path, imagePath, twitterCardType = "summary" } =
    props;

  const displayTitle = title ? `${title} | ${siteName}` : siteName;
  const url = new URL(path, origin);
  const displayImagePath = `${origin}${imagePath ?? defaultImagePath}`;

  return (
    <Head>
      <title>{displayTitle}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:site" content={twitterAccount} />
      <meta name="twitter:creator" content={twitterAccount} />
      <meta property="og:url" content={url.toString()} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={displayImagePath} />
    </Head>
  );
}
