/**
 * src/components/Sidebar/Sidebar.js
 */

import React, {Component, PropTypes} from 'react';

import Listing from 'components/Listing/Listing.js';
import styles from './styles.module.css';


export default class Sidebar extends Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>{this.props.title}</h1>
        </div>
        <Listing places={this.props.places} />
      </div>
    )
  }
}
