import { ComponentChildren } from "preact";
import { BasicHeader } from "./children/header/BasicHeader.tsx";
import { SimpleFooter } from "./children/footer/SimpleFooter.tsx";

type Props = {
  children: ComponentChildren;
};

export function SimpleAppShell(props: Props) {
  const { children } = props;

  return (
    <>
      <BasicHeader />

      <main class="w-full mx-auto">{children}</main>

      <SimpleFooter />
    </>
  );
}
