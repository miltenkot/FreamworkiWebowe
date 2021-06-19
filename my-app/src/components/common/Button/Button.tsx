import React from 'react';

import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

const DefaultButton = styled.button`
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    height: 2rem;
    cursor: pointer;
    transition: color 0.24s, #f2f2f2 0.24s;
    color: #31408a;
    border: 0;
    border-radius: 4px;
    outline: 0;
    background: transparent;
    border: 2px solid transparent;

    .p {
        margin: 0;
    }

    &:hover {
        background: rgba(#31408a, 0.1);
    }

    &:focus {
        border-color: #31408a;
        outline: 0;
    }

    &:disabled {
        color: #fff;
        background: #d3d3d3;
    }

    &.Border {
        border: 1px solid black;
        height: 1.5rem;

        &:focus {
            border-color: #31408a;
            outline: 0;
        }

        &.ButtonIcon {
            border-radius: 4px;
        }
    }

    &.Icon {
        width: 2rem;
        border-radius: 15%;
        svg {
            width: 20rem;  
            font-size: ${Sizes.spacing4};
        }
    }
`;

const Button = (props: any) => {
    const Icon = props.icon

    let colors = {
        backgroundColor: '',
        color: '',
        borderColor: ''
    };



    if (props.theme) {
        colors = {
            backgroundColor: props.theme,
            color: '#31408a',
            borderColor: props.border ? props.theme : ''
        }
    }
    return (
        <div>
            <DefaultButton className={`${props.iconOnly ? 'Icon' : null} ${props.border ? 'Border' : null}`} style={colors} disabled={props.disabled} aria-label={props.label} onClick={(ev) => props.onClick(ev)}>
                {props.icon ? <Icon style={{ color: colors.color }} /> : null}
                {props.label && <p style={{ color: colors.color }}>{props.label}</p>}
            </DefaultButton>
        </div>);
};

Button.defaultProps = {
    label: null,
    icon: null,
    iconOnly: false,
    className: null,
    disabled: false,
    border: false,
    onClick: () => null as Function
}

export default Button;