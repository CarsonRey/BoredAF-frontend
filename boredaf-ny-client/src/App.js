import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Form from './components/Form'
import SavedActivities from './components/SavedActivities'
import Nearby from './components/Nearby'
import { Switch, Route, withRouter } from "react-router-dom";

import './App.css';

class App extends Component {

  state = {
    user: null
  }

  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
    this.props.history.push("/");
  };

  loginSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.getUser(userInfo);
    this.props.history.push("/");
  };

  createUser = (userInfo) => {
    fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.signupUsername,
          password: userInfo.signupPassword
        }
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      localStorage.setItem("token", resp.jwt);
      this.setState({
        user: resp.user
      });
    });
  }

  getUser = (userInfo) => {
    fetch("http://localhost:3000/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.loginUsername,
          password: userInfo.loginPassword
        }
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      localStorage.setItem("token", resp.jwt);
      this.setState({
        user: resp.user
      });
    });
  }

  newActivityForm = () => {
    this.props.history.push("/new-activity")
  }

  backToActivities = () => {
    this.props.history.push("/")
  }

  render() {
    return (

      <div className="App">
        <NavBar/>
        {/* <BrowserRouter> */}
        <Switch>
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
                  signupFormSubmitHandler={this.signupSubmitHandler}
                  handleCharacterClick={this.handleCharacterClick}
                />
              )}
            />
          <Route
              path="/new-activity"
              render={() => (
                <Form backToActivities={this.backToActivities}/>
              )}
            />
          <Route
              path="/saved-activities"
              render={() => (
                <SavedActivities />
              )}
            />
          <Route
              path="/nearby"
              render={() => (
                <Nearby />
              )}
            />
          <Route
              path="/"
              render={() => (
                <ActivityContainer newActivityForm={this.newActivityForm} />
              )}
            />
          </Switch>

        {/* </BrowserRouter> */}

      </div>

    );
  }
}

export default withRouter(App);
