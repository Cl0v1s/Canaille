import React from 'react';

import { merge  } from './../merge';

function variantCSS(variant, state) {
    switch(variant) {
        default:
        case "primary": {
            return {
                "--background-color": state !== "hover" ? "var(--brand-primary-light)" : "var(--brand-primary)",
                "--border": "2px solid var(--grey-100)",
                "--border-radius": "var(--rounded-100)",
            }       
        }
        case "secondary": {
            return {
                "--background-color": "transparent",
                "--box-shadow": "none",
            }
        }
        case "light": {
            return {
                "--background-color": "var(--additional-primary)",
                "--border": "2px solid var(--grey-100)",
                "--border-radius": "var(--rounded-100)"
            }
        }
    }
}

function stateCSS(state, variant) {
    switch(state) {
        default:
        case "default": {
            return {
                "--box-shadow": "var(--dp-25)",
            }
        }
        case "hover": {
            return {
                "--box-shadow": "var(--dp-75)",
                "transform": "translate(2px, -2px)",
                "transition": "all 0.2s ease",
                "--background-color": variant === "primary" ? "var(--brand-primary)" : undefined,
            }
        }
    }
}

function sizeCSS(size) {
    switch(size) {
        default:
        case 100: {
            return {
                "--padding": "var(--spacing-3)",
                "--gap": "var(--spacing-2)",
                "--font-size": "var(--text-125)"
            }
        }
        case 50: {
            return {
                "--padding": "var(--spacing-2)",
                "--gap": "var(--spacing-2)",
                "--font-size": "var(--text-100)"
            }
        }
    }

}

export function buttonCSS(variant, state, size) {
    return merge({
        "--text-color": "var(--grey-100)",

        "&:hover": variant !== "secondary" ? stateCSS("hover", variant) : {},
    } as React.CSSProperties, stateCSS(state, variant), variantCSS(variant, state), sizeCSS(size));
}