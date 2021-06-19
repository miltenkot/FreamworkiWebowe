import React, { Component, RefObject } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSizes';
import { Sizes } from '../../../styledHelpers/Sizes';

type S = {
    value: string | number | undefined
}

type P = {
    customClass: string,
    placeholder: string,
    required: boolean,
    label?: string,
    type: 'string' | 'number' | 'email' | 'dropdown' | 'date' | 'file',
    value: string | number | undefined,
    values?: string[],
    onChange: Function
}

const FieldContainer = styled.div`
    position: relative;
    overflow: hidden;
    input,
    select {
        font-family: Arial, Helvetica, sans-serif;
        font-size: ${FontSize.icon_rem1_00};
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 ${Sizes.spacing2};
        transition: background 0.14s, border 0.14s;
        color: ${Colors.black};
        border: 2px solid transparent;
        border-radius: 4px;
        background: rgba(${Colors.black}, 0.15);
        min-width: 13rem;
        &:focus {
            border: 2px solid ${Colors.black};
            outline: 0;
            background: rgba(${Colors.black}, 0.15);
        }

        &::-webkit-input-placeholder {
            color: rgba(${Colors.black}, 0.5);
        }

        &:invalid {
            border-color: red;
            background: red, 0.05);
        }
    }

    select {
        padding: 0 ${Sizes.spacing1};
    }
`;

class Field extends Component<P, S> {
    static defaultProps: P = {
        required: false,
        type: 'string',
        value: null,
        customClass: null,
        placeholder: null,
        values: [],
        onChange: () => null as Function
    }

    input: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: P) {
        super(props);
        this.state = {
            value: props.value
        }

        this.onChange = this.onChange.bind(this);
    }

    onSelectChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        if (ev.target.value !== null) {
            this.setState({
                value: ev.target.value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: ev.target.value
                    });
                }
            })
        }
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value !== null) {
            const value = ev.target.value;
            this.setState({
                value: value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: value,
                        valid: this.input.current?.checkValidity()
                    });
                }
            })
        }
    }

    render() {
        const { label, type, placeholder, required, values } = this.props;
        let dropdownValues;
        if (values) {
            dropdownValues = values.map((v, i) => <option key={`option_${i}`} value={v}>{v}</option>);
        }

        return (
            <FieldContainer>
                {type === 'dropdown'
                    ? <select value={this.state.value} onChange={(ev) => this.onSelectChange(ev)}>{dropdownValues}</select>
                    : <input ref={this.input} required={required} type={type} value={this.state.value} placeholder={label || placeholder} onChange={(ev) => this.onChange(ev)} />}
            </FieldContainer>
        );
    }
}

export default Field;