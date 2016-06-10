/**
 * src/components/Listing/Listing.js
 */

import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import Item from 'components/Listing/Item.js';
import styles from './styles.module.css';


export default class Listing extends Component {
  render() {
    return (
      <div className={classnames(styles.container)}>
        {
          this.props.places.map(place => {
            return (
              <Item place={place}
                    onClick={this.props.onClick}
                    key={place.id} />
            )
          })
        }
      </div>
    )
  }
}
