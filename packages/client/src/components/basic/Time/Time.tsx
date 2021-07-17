import { useMemo, VFC } from 'react';
import { formatDisplayDate, formatDatetimeAttribute } from '~/shared/date';

export type TimeProps = {
  time: string;
  className?: string;
};

export const Time: VFC<TimeProps> = ({ time, className }) => {
  const displayText = useMemo(() => formatDisplayDate(time), [time]);
  const datetimeAttribute = useMemo(
    () => formatDatetimeAttribute(time),
    [time],
  );
  return (
    <time dateTime={datetimeAttribute} className={className}>
      {displayText}
    </time>
  );
};
