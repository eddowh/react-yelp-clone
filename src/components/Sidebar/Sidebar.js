/**
 * src/components/Sidebar/Sidebar.js
 */

import React, {Component, PropTypes} from 'react';

import Listing from 'components/Listing/Listing.js';
import styles from './styles.module.css';


class Sidebar extends Component {
  onClick(place, map, google) {
    if (this.props.onListItemClick) {
      place.place = place;
      this.props.onListItemClick(place, map, google)
    }
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>{this.props.title}</h1>
        </div>
        <Listing
          places={this.props.places}
          onClick={this.onClick.bind(this)}
        />
      </div>
    )
  }
}

Sidebar.propTypes = {
  places: PropTypes.array,
  title: PropTypes.string,
  onListItemClick: PropTypes.func
}

Sidebar.defaultProps = {
  title: 'Restaurants'
}

export default Sidebar;
