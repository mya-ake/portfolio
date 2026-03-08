import { BasicHeader } from "./BasicHeader.tsx";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@shared/breadcrumbs/components/Breadcrumbs.tsx";

type Props = {
  breadcrumbs: BreadcrumbItem[];
};

export function DefaultHeader(props: Props) {
  return (
    <BasicHeader>
      <div class="mt-4 border-y border-border py-2">
        <Breadcrumbs items={props.breadcrumbs} />
      </div>
    </BasicHeader>
  );
}
