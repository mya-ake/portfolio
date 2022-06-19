import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const OrderedList: FC<Props> = ({ children }) => {
  return <ol className="ml-4 list-decimal list-inside">{children}</ol>;
};
