import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';

import MainPage from './components/MainPage/MainPage';
import LeftMenu from './components/LeftMenu/LeftMenu';
import TopBar from './components/TopBar/TopBar';

ReactDOM.render(
  <>
    <Reset/>
    <TopBar/>
    <LeftMenu/>
    <MainPage />
  </>,
  document.getElementById('root')
);