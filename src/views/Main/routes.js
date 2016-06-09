import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Container from './Container';

import Map from './Map/Map.js';


const mainRoutes = (
  <Route path="/" component={Container}>
    <Route path="map" component={Map} />
    <IndexRoute component={Map} />
  </Route>
);

export default mainRoutes;
