import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import type { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
};

export function BasicHeader(props: Props) {
  return (
    <header>
      <div class="text-center mt-4">
        <InternalLink
          href="/"
          class="leading-none text-2xl text-inherit no-underline"
        >
          <Logo />
        </InternalLink>
      </div>
      {props.children}
    </header>
  );
}
