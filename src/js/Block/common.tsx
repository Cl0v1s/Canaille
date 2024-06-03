import React from 'react';
import { ICommonProps } from '../types/ICommonProps';
import { createUseStyles } from '../helpers/createUseStyles';
import { block as blockCSS } from './style';

const useStyle = createUseStyles({
  canaille: ({ state }) => blockCSS(state),
});

interface IBlock extends ICommonProps {
  state?: 'default' | 'hover',
  children: React.ReactNode,
}

export const Block = React.forwardRef(({
  state = 'default', className, children, ...rest
}: IBlock, ref) => {
  const { canaille } = useStyle({ state });

  return (
    <div {...rest} ref={ref as React.LegacyRef<HTMLDivElement>} className={`${canaille} ${className}`}>
      { children }
    </div>
  );
});
