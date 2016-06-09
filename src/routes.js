/**
 * Routing with `react-router`
 */


import React, {Component} from 'react';
import {browserHistory, Router, Route, Redirect} from 'react-router';

import mainRoutes from 'views/Main/routes.js';

const routes = (
  <Router>
    {mainRoutes}
    <Redirect from="*" to="/" />
  </Router>
 )

export default routes;
