import React, { Component } from 'react';

import Button from '../Button/Button';
import { IconType } from 'react-icons';
import styled from "styled-components";
import { Sizes } from '../../../styledHelpers/Sizes';

const SwitcherContainer = styled.div`
    display: flex;
`;

const ButtonStyled = styled(Button)`
        display: flex;
        align-items: center;
        padding: ${Sizes.spacing1} ${Sizes.spacing2};
        color: black;
        border: 0;
        border: 1px solid rgba(142, 156, 229, 0.2);
        background: transparent;
        p {
            font-weight: 600;
            overflow: hidden;
            width: 0;
            height: 0;
            transition: opacity 0.24s;
                opacity: 0;
            }
            svg {
                margin: 0;
            }
            &.active {
            button {
                border-color: transparent;
                background: rgba($active, 0.2);
                p {
                    width: auto;
                    height: auto;
                    opacity: 1;
                }

                svg {
                    margin-right: $spacing-02;
                }
            }
        }

        &:focus {
            border-color: $active;
            outline: 0;
        }

        &:first-of-type {
            >
            button {
                border-radius: 4px 0 0 4px;
            }
        }

        &:last-of-type {
            >
            button {
                border-radius: 0 4px 4px 0;
            }
        }
`;

export interface ISwitcherOption {
    label: string,
    icon: IconType,
    value: boolean
}

type P = {
    value: boolean,
    onChange: Function,
    options: ISwitcherOption[]
}

class Switcher extends Component<P, {}> {
    static defaultProps = {
        value: false,
    }
    render() {
        const { options, value, onChange } = this.props;
        return (
            <SwitcherContainer >
                {options.map((option, i) => <ButtonStyled
                    key={`switcher_${i}`}
                    aria-label={option.label}
                    icon={option.icon}
                    label={option.label}
                    className={option.value === value ? 'active' : null}
                    onClick={() => onChange(option.value)}>
                </ButtonStyled>)}
            </SwitcherContainer>
        );
    }
}

export { Switcher };