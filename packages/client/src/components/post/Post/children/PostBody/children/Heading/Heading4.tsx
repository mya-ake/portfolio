import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading4: FC = ({ children }) => {
  return <h4 className={clsx(baseHeading, 'text-2xl')}>{children}</h4>;
};
