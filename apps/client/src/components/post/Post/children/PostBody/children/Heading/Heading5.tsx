import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading5: FC<HeadingProps> = ({ children }) => {
  return <h5 className={clsx(baseHeading, 'text-xl')}>{children}</h5>;
};
