import React from 'react';

import { merge } from '../helpers/merge';

function variantCSS(variant, state) {
  switch (variant) {
    default:
    case 'primary': {
      return {
        '--background-color': 'var(--brand-primary)',
        '--border': '2px solid var(--grey-100)',
        '--border-radius': 'var(--rounded-100)',
      };
    }
    case 'secondary': {
      return {
        '--background-color': 'transparent',
        '--box-shadow': 'none',
      };
    }
    case 'light': {
      return {
        '--background-color': 'var(--additional-primary)',
        '--border': '2px solid var(--grey-100)',
        '--border-radius': 'var(--rounded-100)',
      };
    }
  }
}

function stateCSS(state, size, variant) {
  switch (state) {
    default:
    case 'default': {
      return {
        '--box-shadow': size === 50 ? 'var(--dp-25)' : 'var(--dp-75)',
      };
    }
    case 'hover': {
      return {
        '--box-shadow': size === 50 ? 'var(--dp-75)' : 'var(--dp-100)',
        transform: 'translate(2px, -2px)',
        ...(variant === 'secondary'
          ? { '--background-color': 'var(--brand-primary)' }
          : {}),
      };
    }
  }
}

function sizeCSS(size) {
  switch (size) {
    default:
    case 100: {
      return {
        '--padding': 'var(--spacing-3)',
        '--gap': 'var(--spacing-2)',
        '--font-size': 'var(--text-125)',
      };
    }
    case 50: {
      return {
        '--padding': 'var(--spacing-2)',
        '--gap': 'var(--spacing-2)',
        '--font-size': 'var(--text-100)',
        '--border-radius': 'var(--rounded-50)',
      };
    }
  }
}

export function buttonCSS(variant, state, size) {
  return merge(
    {
      '--text-color': 'var(--grey-100)',
      transition: 'all 0.2s ease',

      '&:hover': stateCSS('hover', size, variant),
    } as React.CSSProperties,
    stateCSS(state, size, variant),
    variantCSS(variant, state),
    sizeCSS(size),
  );
}
