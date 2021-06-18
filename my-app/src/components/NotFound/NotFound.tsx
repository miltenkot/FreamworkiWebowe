import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Button from '../common/Button/Button';
import styled from 'styled-components';

const EmptySiteContainer = styled.div`
    position: relative;
    display: flex;
    overflow-x: hidden;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    p {
        margin: 0;
    }
`;

type P = RouteComponentProps;

class NotFound extends Component<P> {

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <EmptySiteContainer>
                <span>Site Not Found</span>
                <Button label="return" onClick={() => this.goHome()} />
            </EmptySiteContainer>
        );
    }
}

export default withRouter(NotFound);