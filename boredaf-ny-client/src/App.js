import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="appNameContainer">
          <div className="appName">bored af</div>
          <div className="shadow"></div>
        </div>
        <ActivityContainer />
      </div>
    );
  }
}

export default App;
