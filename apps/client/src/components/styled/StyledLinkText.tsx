import type { FC, ReactNode } from 'react';

type Porps = {
  children: ReactNode;
};

export const StyledLinkText: FC<Porps> = ({ children }) => {
  return <span className="text-blue-400 underline">{children}</span>;
};
