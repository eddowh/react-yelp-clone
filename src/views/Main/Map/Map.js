/**
 * src/views/Main/Map/Map.js
 */

import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Map, {Marker} from 'google-maps-react';

import styles from './styles.module.css';

export default class MapComponent extends React.Component {
  renderMarkers() {
    if (!this.props.places) { return null; }
    return this.props.places.map(place => {
      return <Marker
               key={place.id}
               name={place.id}
               place={place}
               position={place.geometry.location}
               map={this.props.map}
               onClick={this.props.onMarkerClick.bind(this)}
             />
    });
  }

  renderChildren() {
    const {children} = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })
    } else {
      return this.renderMarkers();
    }
  }


  render() {
    console.log('Displaying map! Look!');
    const {children} = this.props;
    return (
      <Map
        map={this.props.map}
        google={this.props.google}
        className={styles.map}
        visible={!children || React.Children.count(children) === 0}
      >
        {this.renderChildren()}
      </Map>
    )
  }
}
