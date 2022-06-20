import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const UnorderedList: FC<Props> = ({ children }) => {
  return <ul className="ml-4 list-disc list-inside">{children}</ul>;
};
