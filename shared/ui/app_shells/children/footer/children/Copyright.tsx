import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Text } from "@shared/ui/text/Text.tsx";
import { translate } from "@shared/i18n/mod.ts";

export function Copyright() {
  const currentYear = getCurrentYear();
  return (
    <div class="text-center py-2">
      <Text
        font="mono"
        tone="faint"
        leading="none"
        class="text-[0.6875rem] tracking-[0.1em]"
      >
        {translate("footer:copyright", { year: currentYear })}
      </Text>
    </div>
  );
}
