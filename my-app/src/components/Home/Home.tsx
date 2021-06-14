import React, { Component } from 'react';

import Publications from './Publications/Publications';
import Work from '../Work/Work';
import WorkspacesSlider from './WorkspacesSlider/WorkspacesSlider';
import styled from 'styled-components';

const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

class Home extends Component {

    render() {
        return (
            <HomeContainer>
                <Publications/>
                <WorkspacesSlider/>
                <Work/>
            </HomeContainer>
        );
    }
}

export default Home;