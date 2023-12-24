import React from 'react';
import { merge } from './../merge';

function stateCSS(state: string): React.CSSProperties {
    return {

    }
}

function sizeCSS(size: number): React.CSSProperties {
    return {

    }
}

export const textInputCSS = (state, size) => merge({

    "--background-color": "var(--additional-primary)",
    "--border": "2px solid var(--grey-100)",
    "--border-radius": "var(--rounded-100)",
    "--padding-left": "var(--spacing-3)",
    "--padding-right": "var(--spacing-3)",
    "--padding-bottom": "var(--spacing-2)",
    "--padding-top": "20px",
    "--font-size": "var(--text-100)",

    "--label-background-color": "var(--brand-primary)",
    "--label-padding-x": "var(--spacing-2)",
    "--label-padding-y": "var(--spacing-1)",
    "--label-border-radius": "var(--rounded-50)",
    "--label-border": "1px solid var(--grey-100)",
    "--label-box-shadow": "var(--dp-25)",
    "--label-font-size": "var(--text-50)",



    "--placeholder-color": "hsl(var(--grey-100-h) var(--grey-100-s) var(--grey-100-l) / 0.64)",


    "--text-color": "unset",
    "--padding": "unset",

    "--label-color": "unset",
    "--label-padding": "unset",
}, stateCSS(state), sizeCSS(size)); 