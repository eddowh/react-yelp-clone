/**
 * src/components/Rating/Rating.js
 */

import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

const RatingIcon = (props) => (<span>★</span>);

export default class Rating extends Component {
  render() {
    const {percentage} = this.props;
    const style = {
      width: `${(percentage || 0) * 14.34 * 5}%`  // hardcoded makes me puke
    }
    return (
      <div className={styles.sprite}>
        <div className={styles.top} style={style}>
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
        </div>
        <div className={styles.bottom}>
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
        </div>
      </div>
    )
  }
}
