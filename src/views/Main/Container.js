/**
 * src/views/Main/Container.js
 */

import React, {Component} from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';

import {searchNearby} from 'utils/googleApiHelpers';


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      pagination: null
    }
  }

  /**
   * When the <Map /> loads in the browser,
   * it will call the prop function `onReady()` if it's passed on.
   *
   * This will be used to trigger a call to the google places API
   * using the google script.
   */
  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        // we got some results and a pagination object
        this.setState({
          places: results,
          pagination
        });
      }).catch((status, result) => {
        // there was an error
      })
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-star"></i>
          &nbsp;
          Hello from the container
        </h1>
        <Map
          onReady={this.onReady.bind(this)}
          google={this.props.google}
          visible={false}
        >
          {
            this.state.places.map(place => {
             return (
               <div key={place.id}>{place.name}</div>
             );
            })
          }
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container);
