/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './styles/index.scss';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import history from './utils/history';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
