import React from 'react';
import { merge } from './../merge';

function stateCSS(state): React.CSSProperties {
    switch(state) {
        default:
        case "default": {
            return {

            }
        }
        case "hover": {
            return {
                "--box-shadow": "var(--dp-25)",

                "&>input": {
                    transform: "translate(2px, -2px)",
                }
            } as React.CSSProperties
        }
        case "checked": {
            return {
                '--background-color': 'var(--brand-primary)',
                '--inner-color': 'var(--grey-100)',
            } as React.CSSProperties
        }
    }
}

export const radio = (state) => merge({


    '--background-color': 'var(--additional-primary)',
    '--border': '2px solid',
    '--border-color': 'var(--grey-100)',
    '--inner-color': 'var(--background-color)',
    '--size': '28px',
    '--inner-size': '8.33px',
    '--text-color': 'var(--grey-100)',
    '--box-shadow': 'unset',

    "&>input": {
        transition: "all 0.2s ease",
    },

    "&>input:checked": stateCSS("checked"),
    "&:hover": stateCSS("hover"),
} as React.CSSProperties, stateCSS(state));