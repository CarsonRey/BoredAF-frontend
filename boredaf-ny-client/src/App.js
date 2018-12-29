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
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.signupUsername,
          password: userInfo.signupPassword
        }
      })
    }).then(resp => resp.json()).then(resp => {
      localStorage.setItem("token", resp.jwt);
      this.setState({
        user: resp.user
      });
    });
  }

  getUser = (userInfo) => {
    // debugger
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
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

  requireAuth = () => {
    console.log("hi")
  }

  componentDidMount(){
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/api/v1/current_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Action': "application/json",
        'Authorization': `${token}`
      }
    })
    .then(response => response.json())
    .then(resp => {
      this.setState({
      user: resp.user
    })
  })
  }

  render() {
    console.log("in app, user is", this.state.user )
    return (

      <div className="App">
        <NavBar/>
        <Switch>
          <Route
              path="/login"
              render={() => (
                <LoginForm
                  loginSubmitHandler={this.loginSubmitHandler}
                />
              )}
            />
          <Route
              path="/signup"
              render={() => (
                <SignUpForm
                  signupFormSubmitHandler={this.signupFormSubmitHandler}
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
              onEnter={this.requireAuth}
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
        </div>
    );
  }
}

export default withRouter(App);
