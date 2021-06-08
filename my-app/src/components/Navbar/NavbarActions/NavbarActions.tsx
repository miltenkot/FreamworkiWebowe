import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ActionButton from '../../common/ActionButton/ActionButton';
import { INotification } from "../../../reducers/NotificationReducer";
import { IStore } from './../../../store';
import NavbarNotifications from "./../NavbarNotifications/NavbarNotifications";
import { connect } from 'react-redux';
import styles from "./NavbarActions.module.scss";


class NavbarActions extends Component {

    render() {
        return (
            <>
                <div className={styles.NavbarActions}>
                    <ActionButton className={styles.actionBtn} icon={ImHome} disabled />
                    <ActionButton className={styles.actionBtn} icon={ImBubbles} />
                    <ActionButton className={styles.actionBtn} icon={ImBell} />
                </div>
            </>
        );
    }
}

export default NavbarActions;