/**
 * src/views/Main/Detail/Detail.js
 */


import React, {Component, PropTypes} from 'react';
import {getDetails} from 'utils/googleApiHelpers';

import styles from './styles.module.css';

export default class Detail extends Component {
  static childContextTypes = {
    router: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      loading: true,
      place: {},
      location: {}
    }
  }

  componentDidMount() {
    if (this.props.map) {
      this.getDetails(this.props.map)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.map &&
        (prevProps.map !== this.props.map ||
         prevProps.params.placeId !== this.props.params.placeId)) {
      this.getDetails(this.props.map);
    }
  }

  getDetails(map) {
    const {google, params} = this.props;
    const {placeId} = params;

    this.setState({
      loading: true
    }, () => {
      getDetails(google, map, placeId)
        .then((place) => {
          const {location} = place.geometry;
          const loc = {
            lat: location.lat(),
            lng: location.lng()
          }

          this.setState({
            place,
            location: loc,
            loading: false
          })
        })
    });
  }

  render() {
    if (this.state.loading) {
      console.log('Loading map');
      return (
        <div className={styles.wrapper}>
          Loading...
        </div>
      );
    }

    // We're no longer loading when we get here
    const {place} = this.state;
    console.log("Place", place);
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{place.name}</h2>
        </div>
      </div>
    );
  }
}
