import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Button from '../common/Button/Button';
import styles from "./NotFound.module.scss";

type P = RouteComponentProps;

class NotFound extends Component<P> {

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={styles.NotFound}>
                <span>Site Not Found</span>
                <Button label="return" onClick={() => this.goHome()}/>
            </div>
        );
    }
}

export default withRouter(NotFound);