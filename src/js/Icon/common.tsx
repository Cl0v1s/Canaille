/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ICommonProps } from './../types/ICommonProps';
import { IAccessibilityProps } from './../types/IAccessibilityProps';
import { createUseStyles } from './../createUseStyles';

const SIZES = {
  150: 30,
  100: 20,
  75: 16,
  50: 10,
};

type color = string | 'transparent' | 'current';

export interface IIcon extends ICommonProps, IAccessibilityProps {
  icon: string;
  /**
   * Icon size (10px, 16px, 20px, 30px). Custom size (css values) can be passed too (eg: '23px').
   */
  size?: 150 | 100 | 75 | 50 | string;
  /**
   * Any color supported by boto, please check Style/Colors section
   * A boolean allows you to edit icon's colors with css variables
   * Special values are: transparent, and current (current being the active color set by css color property)
   */
  color?: color | Array<color> | boolean;
  /**
   * Color to apply when hover
   * Any color supported by boto, please check Style/Colors section
   * Special values are: transparent, and current (current being the active color set by css color property)
   */
  hoverColor?: color | Array<color>;
  /**
   * Thickness of lines
   */
  strokeWidth?: number;
  /**
   * Icon role
   */
  role?: string;
}

const useStyles = createUseStyles({
  icon: ({ strokeWidth, size, colors, hoverColors }) => ({
    display: 'inline-flex',
    '--stroke-width': strokeWidth,
    width: size,
    height: size,
    ...colors,

    '&:hover': {
      ...hoverColors,
    },
  }),
});

function parseColor(color: color | boolean) {
  if (color === true || color === 'current') return 'currentColor';
  if (color === 'transparent') return color;
  return `var(--${color})`;
}

function colorize(color) {
  if (!color) return {};
  if (!Array.isArray(color)) {
    return {
      '--icon-color-0': parseColor(color),
      '--icon-color-1': parseColor(color),
    };
  }
  const result = {};
  (color as string[]).forEach((c, index) => {
    result[`--icon-color-${index}`] = parseColor(c);
  });
  return result;
}

const Icon = React.forwardRef(
  (
    {
      id,
      ariaHidden = true,
      ariaLabel,
      className = '',
      icon,
      size = 100,
      color,
      strokeWidth = 2,
      testId,
      style,
      role,
      hoverColor,
    }: IIcon,
    ref
  ) => {
    const actualSize = React.useMemo(() => (SIZES[size] ? `${SIZES[size]}px` : size), [size]);

    const colors = React.useMemo(() => colorize(color), [color]);
    const hoverColors = React.useMemo(() => colorize(hoverColor), [hoverColor]);

    const classes = useStyles({
      strokeWidth,
      colors,
      hoverColors,
      size: actualSize,
    } as any);

    return (
      <div
        role={role}
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${classes.icon} ${color ? 'icon-color' : ''} ${className}`}
        id={id}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel || 'Icon'}
        dangerouslySetInnerHTML={{ __html: icon }}
        data-testid={testId}
        style={style}
      />
    );
  }
);

export const ICON_DISPLAYNAME = 'Icon';

Icon.displayName = ICON_DISPLAYNAME;

export { Icon };
