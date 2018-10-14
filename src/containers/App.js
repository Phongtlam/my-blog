import React from 'react';

import SideBar from '../components/SideBar';
import Main from './Main';

import '../styles/App.scss';

const App = () => (
  <div className="App">
    <SideBar className="App-sidebar-container" />
    <Main className="App-content-container" />
  </div>
);

export default App;
