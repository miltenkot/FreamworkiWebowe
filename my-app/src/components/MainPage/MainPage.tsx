import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';

const MainContainer = styled.div`
  background: ${Colors.black};
  width: 100%;
  height: 100;

`;

function MainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <MainContainer />
      </header>
    </div>
  );
}

export default MainPage;
