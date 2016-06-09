/**
 * Routing with `react-router`
 */


import React, {Component} from 'react';
import {browserHistory, Router, Route, Redirect} from 'react-router';

class Home extends React.Component {
  render() {
    return (<div>Hello world</div>)
  }
}

const routes = (
  <Router>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Router>
 )

export default routes;
