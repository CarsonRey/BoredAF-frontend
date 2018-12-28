import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Form from './components/Form'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (

      <div className="App">
        <NavBar/>
        <BrowserRouter>
        <Switch>
          <Route
              path="/activities"
              render={() => (
                <ActivityContainer/>
              )}
            />
          <Route
              path="/login"
              render={() => (
                <LoginForm
                  loginSubmitHandler={this.loginSubmitHandler}
                  handleCharacterClick={this.handleCharacterClick}
                />
              )}
            />
          <Route
              path="/signup"
              render={() => (
                <SignUpForm
                  signupFormSubmitHandler={this.signupFormSubmitHandler}
                  handleCharacterClick={this.handleCharacterClick}
                />
              )}
            />
          <Route
              path="/new-activity"
              render={() => (
                <Form/>
              )}
            />
          </Switch>

        </BrowserRouter>

      </div>

    );
  }
}

export default App;
