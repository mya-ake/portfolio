import { translate } from "@shared/i18n/mod.ts";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Flex } from "@shared/ui/layout/Flex.tsx";
import { Copyright } from "./children/Copyright.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import type { WidgetMap } from "@shared/widget/mod.ts";
import { StyledInternalLink } from "../../../link/StyledInternalLink.tsx";

function getSocialItems(): { label: string; name: string; uri: string }[] {
  return [{
    label: translate("social:github"),
    name: translate("social:gitHubName"),
    uri: "https://github.com/mya-ake",
  }, {
    label: translate("social:x"),
    name: translate("social:xName"),
    uri: "https://twitter.com/mya_ake",
  }, {
    label: translate("social:zenn"),
    name: translate("social:zennName"),
    uri: "https://zenn.dev/mya_ake",
  }];
}

export type Props = {
  widgetMap: WidgetMap<"footer_bio">;
};

export function DefaultFooter(props: Props) {
  return (
    <footer>
      <div class="pb-4 px-4">
        <Section
          level="1"
          heading={translate("profile:heading")}
          headingProps={{ fontSize: "2xl" }}
          isContainer
        >
          <Grid templateColumns="auto" gap="16px">
            <Grid
              templateColumns="auto auto"
              justifyContent="start"
              alignItems="center"
              gap="16px"
              class="mt-2"
            >
              <Text
                fontSize="xl"
                leading="none"
                fontWeight="bolder"
                class="order-1"
              >
                {translate("profile:nameWithYomi")}
              </Text>
              <img
                src="/assets/v3/images/avatar.jpg"
                width="60"
                height="60"
                class="rounded-full order-none"
                alt=""
              />
            </Grid>
            <div>
              <RenderHTML html={props.widgetMap.footer_bio} />
            </div>

            <Flex class="gap-8">
              <Section level="2" heading={translate("social:heading")}>
                <Grid
                  templateColumns="auto 1fr"
                  gap="4px 8px"
                  class="mt-4"
                >
                  {getSocialItems().map(({ label, name, uri }) => (
                    <>
                      <Text leading="none">{label}:</Text>
                      <Text leading="none">
                        <StyledExternalLink href={uri}>
                          {name}
                        </StyledExternalLink>
                      </Text>
                    </>
                  ))}
                </Grid>
              </Section>
              <Section
                level="2"
                heading={translate("footer_links:heading")}
              >
                <Grid gap="4px 8px" class="mt-4">
                  <Text>
                    <StyledInternalLink href="/privacy_policy">
                      {translate("footer_links:privacy_policy")}
                    </StyledInternalLink>
                  </Text>
                </Grid>
              </Section>
            </Flex>
          </Grid>
        </Section>
      </div>

      <Copyright />
    </footer>
  );
}
