import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Text } from "@shared/ui/text/Text.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import { translate } from "@shared/i18n/mod.ts";

export function Copyright() {
  const currentYear = getCurrentYear();
  return (
    <div class="text-center py-2">
      <Text fontSize="sm" leading="none">
        {translate("footer:copyright", { year: currentYear })} <Logo />
      </Text>
    </div>
  );
}
