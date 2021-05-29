import React, { Component, RefObject } from 'react';
import { IconType } from 'react-icons';
import styles from "./Button.module.scss";

type P = {
    label: string,
    onClick: Function,
    icon: IconType,
    iconOnly: boolean,
    disabled: boolean,
    border: boolean,
    className: string,
    theme?: string
}

class Button extends Component<P, {}>  {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    static defaultProps: P = {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        disabled: false,
        border: false,
        onClick: () => null as Function
    }

    onClick(ev: React.MouseEvent) {
        const button = ev.currentTarget as HTMLButtonElement;
        const ripple = this.ripple.current;
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        if (ripple) {
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${ev.clientX - button.offsetLeft - radius}px`;
            ripple.style.top = `${ev.clientY - button.offsetTop - radius}px`;
            ripple.className = styles.ripple;
            button.appendChild(ripple);
        }

        this.props.onClick(ev);
    }
}

export default Button;