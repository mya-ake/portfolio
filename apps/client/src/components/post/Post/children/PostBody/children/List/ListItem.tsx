import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ListItem: FC<Props> = ({ children }) => {
  return <li>{children}</li>;
};
