import React, { Component, RefObject } from 'react';

import { ImSearch } from "react-icons/im";
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';
import { Colors } from '../../../styledHelpers/Colors';

type S = {
    value: string
}

type P = {
    customClass: string,
    placeholder: string,
    onSearchClick: Function,
    onChange: Function
}

const SearchContainer = styled.div`
position: relative;
overflow: hidden;
height: 2rem;
`;

const InputContainer = styled.input`
font-family: Arial, Helvetica, sans-serif;
box-sizing: border-box;
width: 100%;
height: 100%;
padding-right: ${Sizes.spacing5};
padding-left: ${Sizes.spacing2};
transition: border ease-in 0.14s;
border: 1px solid #d3d3d3;
border-radius: 4px;

&:focus {
    border: 1px solid ${Colors.black};
    outline: 0;
}
`;

const SearchButton = styled.button`
font-size: ${Sizes.spacing4};
position: absolute;
top: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
width: 2.5rem;
height: 100%;
cursor: pointer;
transition: background 0.24s, color 0.12s;
color: ${Colors.black};
border: none;
border-radius: 0 4px 4px 0;
background: transparent;
&:focus {
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
    outline: 0;
}
`;

class Search extends Component<P, S> {
    static defaultProps: P = {
        customClass: null,
        placeholder: null,
        onSearchClick: () => null as Function,
        onChange: () => null as Function
    }

    searchInput: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: P) {
        super(props);
        this.state = {
            value: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value !== null) {
            this.setState({
                value: ev.target.value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(ev.target.value);
                }
            })
        }
    }

    render() {
        return (
            <SearchContainer>
                <InputContainer ref={this.searchInput} type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={(ev) => this.onChange(ev)} />
                <SearchButton type="button" onClick={(ev) => this.props.onSearchClick(ev)}>
                    <ImSearch />
                </SearchButton>
            </SearchContainer>
        );
    }
}

export default Search;