import React, { Component } from 'react';

import { IconType } from 'react-icons';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSizes';

type P = {
    className: string,
    text: string,
    disabled: boolean,
    icon: IconType,
    actions: number,
    onClick: Function
}

const ActionButtonStyled = styled.button`
font-size: ${FontSize.icon_rem1_25};
display: flex;
align-items: center;
justify-content: center;
width: 2rem;
height: 2rem;
cursor: pointer;
transition: color 0.24s;
color: rgba(${Colors.black}, 0.5);
border: 0;
border-radius: 50%;
outline: 0;
background: rgba(${Colors.black}, 0.15);

&:disabled {
    background: transparent; 
    color: ${Colors.black};
}
`;

class ActionButton extends Component<P, {}> {
    static defaultProps: P = {
        className: null,
        icon: null,
        disabled: false,
        text: null,
        actions: 0,
        onClick: () => null as Function
    }

    render() {
        const { icon, onClick, disabled } = this.props;
        const Icon = icon;
        return (
            <ActionButtonStyled type="button" disabled={disabled} onClick={(ev) => onClick(ev)}>
                {this.props.text}
                {Icon ? <Icon /> : null}
            </ActionButtonStyled>
        );
    }
}

export default ActionButton;