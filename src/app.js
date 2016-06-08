/**
 * Main entry point
 */


import React, {Component} from 'react';
import ReactDOM from 'react-dom'

import './app.css';
import styles from './styles.module.css';

class App extends Component {
  render() {
    console.log(styles);
    return (
      <div className={styles.wrapper}>
        Hello World!
      </div>
    );
  }
}


const mountNode = document.querySelector('#root');
ReactDOM.render(<App />, mountNode);
