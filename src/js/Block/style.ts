import React from 'react';
import { merge } from '../helpers/merge';

function stateCSS(state): React.CSSProperties {
  switch (state) {
    case 'hover': {
      return {
        '---background-color': 'var(--additional-primary)',
        '---box-shadow': 'var(--dp-25)',
      } as React.CSSProperties;
    }
    case 'default':
    default: {
      return {

      };
    }
  }
}

export const block = (state) => merge({
  '---border': '2px solid var(--grey-100)',
  '---padding': 'var(--spacing-3)',
  '---background-color': 'var(--white)',
  '---box-shadow': 'unset',
  '---radius': 'var(--rounded-100)',

  border: 'var(---border)',
  padding: 'var(---padding)',
  backgroundColor: 'var(---background-color)',
  boxShadow: 'var(---box-shadow)',
  borderRadius: 'var(---radius)',

  '&:hover': stateCSS('hover'),
} as React.CSSProperties, stateCSS(state));
