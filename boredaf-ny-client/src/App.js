import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'
import NavBar from './components/NavBar'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <ActivityContainer />
      </div>
    );
  }
}

export default App;
