/**
 * src/components/Header/Header.js
 */


import React, {Component} from 'react';
import {Link} from 'react-router';

import styles from './styles.module.css';


export default class Header extends Component {
  render() {
    return (
      <div className={styles.topbar}>
        <Link to="/">
          <h1>
            <i className="fa fa-star"></i>
            &nbsp;
            Yelp
          </h1>
        </Link>
        <section>
          Fullstack.io
        </section>
      </div>
    )
  }
}
