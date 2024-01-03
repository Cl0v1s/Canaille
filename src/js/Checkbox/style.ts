import React from 'react';
import { merge } from './../merge';

function stateCSS(state) {
    switch(state) {
        case "default": 
        default: {
            return {

            }
        }
        case "hover": {
            return {

            }
        }
        case "checked": {
            return {

            }
        }
        case "checkedHover": {
            return {

            }
        }
    }
}

export const checkbox = (state) => merge({

} as React.CSSProperties, stateCSS(state));