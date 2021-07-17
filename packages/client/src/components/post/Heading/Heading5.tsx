import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading5: FC = ({ children }) => {
  return <h5 className={clsx(baseHeading, 'text-xl')}>{children}</h5>;
};
