import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="appName">bored af</p>
        <ActivityContainer />
      </div>
    );
  }
}

export default App;
