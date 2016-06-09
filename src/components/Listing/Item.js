/**
 * src/components/Listing/Item.js
 */

import React, {Components, PropTypes} from 'react';
import classnames from 'classnames';

import Rating from 'components/Rating/Rating';
import styles from './styles.module.css';

export default class Item extends React.Component {
  render() {
    const {place} = this.props;
    return (
      <div className={styles.item}>
        <h1 className={classnames(styles.title)}>{place.name}</h1>
        <Rating className={styles.rating} percentage={(place.rating/5)} />
      </div>
    )
  }
}
