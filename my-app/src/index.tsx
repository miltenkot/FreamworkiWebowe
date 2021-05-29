// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Reset } from 'styled-reset';

// import MainPage from './components/MainPage/MainPage';
// import LeftProfileMenu from './components/LeftProfileMenu/LeftProfileMenu';
//import TopBar from './components/TopBar/TopBar';
// import styled from 'styled-components';
// import { Colors } from "./styledHelpers/Colors"

// const Container = styled.div`
// 	padding: 1.5em 2em;
// 	display: flex;
//   background: ${Colors.white}
//   height: 100%;
//   width: 100%;
// `;

// const Content = styled.main`
// 	width: 300px;
//   height: 300px;
//   background: ${Colors.gray}
// `;

// const Content2 = styled.main`
// 	flex-grow: 1;
// 	margin: 0em 3em 1em 1em;
//   height: 300px;
//   background: ${Colors.lightGray}
// `;

// ReactDOM.render(
//   <>
//     <Reset />
//     <TopBar />
//     <Container>
//       <LeftProfileMenu />
//       <Content>
//         <MainPage />
//       </Content>
//       <Content2>
//       </Content2>
//     </Container>
//   </>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);