/**
 * src/views/Main/Container.js
 */

import React, {Component, PropTypes} from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';

import {searchNearby} from 'utils/googleApiHelpers';

import Header from 'components/Header/Header.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import styles from './styles.module.css';

class Container extends Component {
  constructor(props, context) {
    super(props, context);
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
        console.log("Error fetching nearby", status);
      })
  }

  onMarkerClick(item) {
    const {place} = item;
    const {push} = this.context.router;
    // not comfortable with hardcoding this
    push(`/map/detail/${place.place_id}`);
  }

  render() {
    let children = null;
    if (this.props.children) {
      // We have children in the Container component
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          router: this.context.router,
          onMarkerClick: this.onMarkerClick.bind(this)
        }
      );
    }
    return (
      <div>
        <Map
          onReady={this.onReady.bind(this)}
          google={this.props.google}
          visible={false}
          className={styles.wrapper}
        >
          <Header />
          <Sidebar
            title={'Restaurants'}
            onListItemClick={this.onMarkerClick.bind(this)}
            places={this.state.places}
          />
          <div className={styles.content}>
            {children}
          </div>
        </Map>
      </div>
    )
  }
}

Container.contextTypes = {
  router: PropTypes.object
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container);
