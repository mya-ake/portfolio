import type { FC } from 'react';

export const OrderedList: FC = ({ children }) => {
  return <ol className="ml-4 list-decimal list-inside">{children}</ol>;
};
