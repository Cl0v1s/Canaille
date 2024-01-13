import React from 'react';
import { merge } from '../helpers/merge';

function stateCSS(state): React.CSSProperties {
  switch (state) {
    default:
    case 'default': {
      return {

      };
    }
    case 'hover': {
      return {
        '--background-color': 'var(--additional-primary)',
        '--box-shadow': 'var(--dp-25)',
      } as React.CSSProperties;
    }
  }
}

export const block = (state) => merge({
  '--border': '2px solid var(--grey-100)',
  '--padding': 'var(--spacing-3)',
  '--background-color': 'var(--white)',
  '--box-shadow': 'unset',
  '--radius': 'var(--rounded-100)',

  '&:hover': stateCSS('hover'),
} as React.CSSProperties, stateCSS(state));
