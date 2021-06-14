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
`;

class Button extends Component<P, {}> {
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
        this.props.onClick(ev);
    }

    render() {
        const { label, icon, iconOnly, disabled, border, theme } = this.props;
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
                </button>
            </ButtonStyles>
        );
    }
}

export default Button;