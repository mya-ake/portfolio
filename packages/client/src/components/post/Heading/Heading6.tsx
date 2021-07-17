import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading6: FC = ({ children }) => {
  return <h6 className={clsx(baseHeading, 'text-lg')}>{children}</h6>;
};
