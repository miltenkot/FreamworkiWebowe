import React, { Component } from 'react';
import { FullscreenState } from '../../reducers/FullscreenReducer';
import cx from "classnames";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import logo from './../../assets/react-logo.png';
import Search from '../common/Search/Search';
import NavbarActions from './NavbarActions/NavbarActions';
import { IStore } from '../../store';
import DropdownMenu from './DropdownMenu/DropdownMenu';

type P = FullscreenState;

class Navbar extends Component<P> {
    render() {
        return (
            <header className={cx(styles.Navbar, this.props.isFullscreen ? styles.NavbarHidden : null)} >
                <div className={styles.NavbarMenu}>
                    <Link to="/" className={styles.NavbarLogo}><img src={logo} alt="Website logo" /></Link>
                    <DropdownMenu />
                </div>
                <Search customClass={styles.searchBar} placeholder="Search Legalcluster" />
                <NavbarActions />
            </header>
        );
    }
}

const mapStateToProps = (state: IStore) => ({
    isFullscreen: state.FullscreenReducer.isFullscreen
});

export default connect(mapStateToProps)(Navbar);