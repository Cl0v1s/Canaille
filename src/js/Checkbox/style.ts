import React from 'react';
import { merge } from '../merge';

function stateCSS(state): React.CSSProperties {
    switch(state) {
        case "default":
        default: {
            return {

            }
        }
        case "hover": {
            return {
                "--box-shadow": "var(--dp-25)",
                "&>div": {
                    transform: "translate(2px, -2px)",
                }
            } as React.CSSProperties
        }
        case "checked": {
            return {
                "--check-opacity": 1,
                "--background-color": "var(--brand-primary)",
            } as React.CSSProperties
        }
    }
}

export const checkbox = (state) => merge({
    '--radius': 'var(--rounded-50)',
    '--border': '2px solid var(--grey-100)',
    '--font-size': 'var(--text-100)',
    '--height': '28px',
    '--width': '28px',
    '--background-color': 'var(--additional-primary)',
    '--label-color': 'var(--grey-100)',
    '--box-shadow': 'unset',
    '--pointer-events': 'auto',

    "&:hover": stateCSS("hover"),
    "&>input:checked+div": stateCSS("checked"),
} as React.CSSProperties, stateCSS(state));