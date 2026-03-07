import { BasicHeader } from "./BasicHeader.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
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
      <Box
        css={{
          marginTop: "$4",
          border: "1px $border solid",
          borderLeft: "0",
          borderRight: "0",
          py: "$2",
        }}
      >
        <Breadcrumbs items={props.breadcrumbs} />
      </Box>
    </BasicHeader>
  );
}
