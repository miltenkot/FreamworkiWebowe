import React, { Component, RefObject } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';
import { Colors } from '../../../styledHelpers/Colors';

const DropDownContainer = styled.div`
    position: relative;
`;

const Button = styled.button`
font-size: 0.85rem;
position: relative;
display: flex;
overflow: hidden;
align-items: center;
justify-content: space-between;
min-width: 8rem;
height: 2rem;
padding: ${Sizes.spacing1} ${Sizes.spacing2};
cursor: pointer;
transition: color 0.24s, border-color 0.24s;
color: ${Colors.electronBlue};
border: 1px solid transparent;
outline: 0;
background: transparent;
background: rgba(${Colors.electronBlue}, 0.1);
border-bottom: 2x solid;

    svg {
        font-size: 20px;
        flex-shrink: 0;
        flex-shrink: 0;
        margin-left: ${Sizes.spacing1};
    }

    &:hover,
    &:focus {
        border: 1 solid;
        border-radius: 4px; 
        border-color:  ${Colors.infoBlue};
    }
`;

const Value = styled.div`
    font-size: 0.85rem;
    position: absolute;
    z-index: 1;
    right: 0;
    left: 0;
    color: ${Colors.electronBlue};
    border-radius: 0 0 4px 4px;
    background: rgb(243, 245, 252);

    backdrop-filter: blur(4px);
`;

const Item = styled.div`
    padding: ${Sizes.spacing1} ${Sizes.spacing2};
    cursor: pointer;
`;

export interface IDropdownItem {
    label: String | React.ReactNode,
    value: any
}

type S = {
    isListOpen: boolean
}

type P = {
    items?: IDropdownItem[],
    onChange?: Function,
    value?: IDropdownItem
    disabled?: boolean,
    className?: string
}

class Dropdown extends Component<P, S> {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    static defaultProps: P = {
        disabled: false,
        className: null,
        onChange: () => null as Function
    }

    constructor(props: P) {
        super(props);
        this.state = {
            isListOpen: false,
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this); 
    }

    componentDidUpdate(prevProps: P) {
        const { isListOpen } = this.state;
        setTimeout(() => {
            if (isListOpen) {
                window.addEventListener('click', this.closeDropdown)
            }
            else {
                window.removeEventListener('click', this.closeDropdown)
            }
        }, 0)
    }

    onClick(ev: React.MouseEvent) {
        this.setState((prevState) => {
            return {
                isListOpen: !prevState.isListOpen
            }
        });
    }

    onChange(value: any) {
        this.closeDropdown();
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }

    closeDropdown() {
        this.setState({
            isListOpen: false
        });
    }

    render() {
        const { disabled, items, value } = this.props;

        return (
            <DropDownContainer  >
                <Button disabled={disabled} type="button" onClick={(ev) => this.onClick(ev)}>
                    {value?.label} <MdArrowDropDown />
                </Button>
                {this.state.isListOpen &&
                    <Value >
                        {items.map((v, i) => <Item key={`dropOpt_${i}`} onClick={() => this.onChange(v.value)}>
                            {v.label}
                        </Item>)}
                    </Value>
                }
            </DropDownContainer>
        );
    }  

}

export { Dropdown };