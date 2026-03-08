import type { ComponentChildren } from "preact";
import { DefaultHeader } from "./children/header/DefaultHeader.tsx";
import { BreadcrumbItem } from "@shared/breadcrumbs/components/Breadcrumbs.tsx";
import {
  DefaultFooter,
  Props as DefaultFooterProps,
} from "./children/footer/DefaultFooter.tsx";
import { IconHead } from "@shared/head/IconHead.tsx";

export type Props = {
  children: ComponentChildren;
  widgetMap: DefaultFooterProps["widgetMap"];
  breadcrumbs: BreadcrumbItem[];
};

export function DefaultAppShell(props: Props) {
  const { children, breadcrumbs } = props;
  return (
    <>
      <IconHead />

      <DefaultHeader breadcrumbs={breadcrumbs} />

      <main class="w-full mt-8 mx-auto">{children}</main>

      <div class="mt-16">
        <DefaultFooter widgetMap={props.widgetMap} />
      </div>
    </>
  );
}
