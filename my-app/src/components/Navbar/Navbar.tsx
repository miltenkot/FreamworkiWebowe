import React, { Component } from 'react';
import { FullscreenState } from '../../reducers/FullscreenReducer';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import logo from './../../assets/react-logo.png';
import Search from '../common/Search/Search';
import NavbarActions from './NavbarActions/NavbarActions';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';
import { Sizes } from '../../styledHelpers/Sizes';


const NavbarContainer = styled.div`
font-size: 1.2rem;
position: sticky;
z-index: 2;
top: 0;
display: flex;
align-items: center;
flex-shrink: 0;
justify-content: space-between;
height: ${Sizes.headerHeight};
padding: 0 ${Sizes.spacing2}};
background-color: ${Colors.white}};
box-shadow: ${Colors.shadow1}};
`;

const MenuContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const LogoContainer = styled.img`
        width: 2rem;
        height: 2rem;
`;

const SearchContainer = styled.div`
width: 50vw;
max-width: 100%;
margin: 0 ${Sizes.spacing2};

input {
    &::-webkit-input-placeholder {
        text-align: center;
    }
}
`;

class Navbar extends Component {
    render() {
        return (
            <NavbarContainer>
                <MenuContainer>
                    <Link to="/"><LogoContainer src={logo} alt="Website logo" /></Link>
                    <DropdownMenu />
                </MenuContainer>
                <SearchContainer><Search placeholder="Search Legalcluster" /></SearchContainer>
                <NavbarActions />
            </NavbarContainer>
        );
    }
}

export default Navbar;