import React, { Component, RefObject } from 'react';

import { IconType } from 'react-icons';
import { LightenDarkenColor } from '../../../utils/colorUtils';
import cx from 'classnames';
import styles from "./Button.module.scss";
import styled , { keyframes } from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { Sizes } from '../../../styledHelpers/Sizes';

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

const ripple = keyframes`
    to {
        transform: scale(4);
        opacity: 0;
    }
`;

const ButtonStyles = styled.div`
position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    height: 2rem;
    cursor: pointer;
    transition: color 0.24s, border-color 0.24s;
    color: ${Colors.black};
    border: 1;
    border-radius: 3px;
    outline: 0;
    border: 1px solid transparent;
    animation: ${ripple};

    >
    svg {
        font-size: ${Sizes.iconSize2}};
    }

    > p {
        margin: 0;
    }

    &:hover {
        background: rgba(${Colors.black}, 0.1);
    }

    &:focus {
        border-color: ${Colors.black};
        outline: 0;
    }

    &:disabled {
        color: ${Colors.black};
        background: ${Colors.black};
    }

    .ripple {
        position: absolute;
        transform: scale(0);
        animation: ripple 600ms linear;
        border-radius: 50%;
        background-color: rgba(${Colors.black}, 0.25);
    }

    &.ButtonBorder {
        border: 1px solid ${Colors.black};
        height: 1.5rem;

        &:focus {
            border-color: ${Colors.black};
            outline: 0;
        }

        &.ButtonIcon {
            border-radius: 4px;
        }
    }

    &Icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        svg {
            margin: 0;
        }
    }
`;

class Button extends Component<P, {}> {
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

    render() {
        const { label, icon, iconOnly, className, disabled, border, theme } = this.props;
        const Icon = icon;
        let colors = {
            backgroundColor: '',
            color: '',
            borderColor: ''
        };
        if (theme) {
            colors = {
                backgroundColor: theme,
                color: LightenDarkenColor(theme, -90),
                borderColor: border ? LightenDarkenColor(theme, -90) : ''
            }    
        }

        return (
            <ButtonStyles>
                <button style={colors} disabled={disabled} aria-label={label} type="button" className={cx(styles.Button, iconOnly ? styles.ButtonIcon : null, border ? styles.ButtonBorder : null)} onClick={(ev) => this.onClick(ev)}>
                    {Icon ? <Icon style={{color: colors.color}} /> : null}
                    {label && <p style={{color: colors.color}}>{label}</p>}
                    <span ref={this.ripple} className={styles.ripple}></span>
                </button>
            </ButtonStyles>
        );
    }
}

export default Button;