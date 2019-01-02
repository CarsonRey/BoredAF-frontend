import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'
import NewActivityContainer from './containers/NewActivityContainer'
import NewJournalEntryContainer from './containers/NewJournalEntryContainer'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import SavedActivities from './components/SavedActivities'
import Journal from './components/Journal'
import { Switch, Route, withRouter } from "react-router-dom";
import video from './bored1.mov'

import './App.css';

class App extends Component {

  state = {
    userLocalStorage: null,
    userSavedActivities: [],
    userInfo: null,
    activityId: null
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

  setActivityIdForJournal = (activityId) => {
    this.setState({
      activityId: activityId
    })
  }

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
        userLocalStorage: resp.user
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
        userLocalStorage: resp.user
      });
    });
  }

  updateUser = (user, activity) => {
    this.fetchUser()
    this.setState({
      userInfo: user,
      userSavedActivities: [...this.state.userSavedActivities, activity]

    })
  }

  newActivityForm = () => {
    this.props.history.push("/new-activity")
  }

  backToActivities = () => {
    this.props.history.push("/")
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
      userLocalStorage: resp.user
    }, this.showUser())
  })
  }

  showUser = () => {
    setTimeout(() => {this.fetchUser()}, 2000)
  }

  fetchUser = () => {
    fetch(`http://localhost:3001/api/v1/users/${this.state.userLocalStorage.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(resp =>resp.json()).then(user => {
      // debugger
      this.setState({
        userInfo: user,
        userSavedActivities: [...this.state.userSavedActivities, ...user.activities]
      })
    })
  }

  changeTried = (association) => {
    console.log("before the fetch the activity tried is", association.tried)
    fetch(`http://localhost:3001/api/v1/user_activities/${association.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tried: !association.tried
      })
    })
    .then(resp => resp.json())
    .then(changedAssociation => {
      console.log("after the fetch the activity tried is", changedAssociation.tried)
      this.fetchUser()
    })
  }

  deleteAssociation = (association) => {
    fetch(`http://localhost:3001/api/v1/delete_association/${association.id}`, {method: "POST"})
    .then(resp => resp.json())
    .then(()=> this.fetchUser() )

  }

  filterUserSaved = () => {
    return this.state.userSavedActivities
  }

  render() {
    console.log("activity to be journaled", this.state.activityId )

    return (
// frontend-bored-af-ny/boredaf-ny-client/src/App.js
// frontend-bored-af-ny/boredaf-ny-client/src/bored.mp4
      <div className="App">
        <video className="myVideo" loop autoPlay muted >
          <source src={video} type="video/mp4"/>
          <source src={video} type="video/ogg"/>
          Your browser does not support the video tag.
        </video>
        <NavBar user={this.state.userInfo}/>
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
                <NewActivityContainer backToActivities={this.backToActivities}/>

              )}
            />
            <Route
                path="/new-journal-entry"
                render={() => (
                  <NewJournalEntryContainer user={this.state.userInfo}
                  activityId={this.state.activityId} />
                )}
              />
          <Route
              path="/saved-activities"
              onEnter={this.requireAuth}
              render={() => (
                <SavedActivities
                 setActivityIdForJournal={this.setActivityIdForJournal}
                 delete={this.deleteAssociation}
                 changeTried={this.changeTried}
                 user={this.state.userInfo}/>
              )}
            />
          <Route
              path="/journal"
              render={() => (
                <Journal user={this.state.userInfo} />
              )}
            />
          <Route
              path="/"
              render={() => (
                <ActivityContainer
                  updateUser={this.updateUser}
                  user={this.state.userLocalStorage} newActivityForm={this.newActivityForm} />
              )}
            />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
