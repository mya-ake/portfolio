import { AppProps } from "$fresh/server.ts";
import { DefaultHead } from "@shared/head/DefaultHead.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <DefaultHead />

      <Grid
        templateRows="auto 1fr auto"
        css={{ minHeight: "100dvh", overflow: "auto" }}
      >
        <Component />
      </Grid>
    </>
  );
}
