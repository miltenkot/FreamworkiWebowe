import React, { Component, RefObject } from 'react';

import { IconType } from 'react-icons';
import { LightenDarkenColor } from '../../../utils/colorUtils';
import cx from 'classnames';
import styles from "./Button.module.scss";
import styled , { keyframes, css } from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { Sizes } from '../../../styledHelpers/Sizes';

const ButtonContainer = styled.div`
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

const DefaultButton = styled.button`
    
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
            color: LightenDarkenColor(props.theme, -90),
            borderColor: props.border ? LightenDarkenColor(props.theme, -90) : ''
        }    
    }
//className={cx(styles.Button, props.iconOnly ? styles.ButtonIcon : null, props.border ? styles.ButtonBorder : null)} 
    return (
    <ButtonContainer>
     <DefaultButton className={cx(styles.Button, props.iconOnly ? styles.ButtonIcon : null, props.border ? styles.ButtonBorder : null)} style={colors} disabled={props.disabled} aria-label={props.label}  onClick={(ev) => props.onClick(ev)}>
        {props.icon ? <Icon style={{color: colors.color}} /> : null}
        {props.label && <p style={{color: colors.color}}>{props.label}</p>}
     </DefaultButton>
    </ButtonContainer>);
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