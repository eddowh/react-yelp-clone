import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Container from './Container';

import Map from './Map/Map.js';
import Detail from './Detail/Detail.js';


const mainRoutes = (
  <Route path="/" component={Container}>
    <Route path="map" component={Map}>
      <Route path="detail/:placeId" component={Detail} />
    </Route>
    <IndexRoute component={Map} />
  </Route>
);

export default mainRoutes;
