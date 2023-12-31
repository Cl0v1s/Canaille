import React from 'react';
import { createUseStyles } from './../createUseStyles';
import { ICommonProps } from './../types/ICommonProps';
import { link } from './style'

import './../../scss/index.scss';

const useStyle = createUseStyles({
    link: {
        "--text-decoration": "unset",
        "--background-color": "unset",
        "--font-size": "unset",
        "--line-height": "unset",

        border: "none",
        textDecoration: "var(--text-decoration)",
        backgroundColor: "var(--background-color)",
        fontSize: "var(--font-size)",
        lineHeight: "var(--line-height)",
        display: "inline-block",
        padding: "1px",
        color: "currentcolor",
        fontFamily: "inherit",
        cursor: "pointer",
    } as React.CSSProperties, 
    canaille: ({ state, size }) => link(state, size),
});

interface ILink extends ICommonProps {
    size?: 50 | 100,
    state?: "default" | "hover",
    href?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode,
    target?: string,
}

const Link = React.forwardRef(({ className = '', href, onClick, size=100, state = "default", children, target, ...rest }: ILink, ref) => {
    const { link, canaille} = useStyle({ state, size });
    if(href) {
        return (
            <a {...rest} ref={ref as React.LegacyRef<HTMLAnchorElement>} target={target} href={href} className={`${link} ${canaille} ${className}`}>{ children }</a>
        );
    } 
    return (
        <button {...rest} ref={ref as React.LegacyRef<HTMLButtonElement>} onClick={onClick} className={`${link} ${canaille} ${className}`}>{ children }</button>
    )
});

export { Link };