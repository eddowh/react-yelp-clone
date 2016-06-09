/**
 * Main entry point
 */


import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import 'font-awesome/css/font-awesome.css';
import 'app.css';

import App from 'containers/App/App.js';

import routes from './routes.js';


ReactDOM.render(
  <App history={browserHistory} routes={routes} />,
  document.querySelector('#root')
);
