import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';

import MainPage from './components/MainPage/MainPage';
import TopBar from './components/TopBar/TopBar';

ReactDOM.render(
  <>
    <Reset/>
    <TopBar/>
    <MainPage />
  </>,
  document.getElementById('root')
);