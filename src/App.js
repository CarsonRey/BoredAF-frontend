import React, { Component } from 'react';
import ActivityContainer from './containers/ActivityContainer'
import NewActivityContainer from './containers/NewActivityContainer'
import NewJournalEntryContainer from './containers/NewJournalEntryContainer'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import SavedActivities from './components/SavedActivities'
import Journal from './components/Journal'
import Logout from './components/Logout'
import { Switch, Route, withRouter } from "react-router-dom";
import video from './bored1.mov'

import './App.css';

class App extends Component {

  state = {
    userLocalStorage: null,
    userSavedActivities: [],
    userInfo: null,
    activityId: null,
    userClickedEdit: false,
    entryToBeChanged: {}
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

  newJournalEntrySubmitHandler = (e, form) => {
    e.preventDefault();
    this.createEntry(form)

  };

  editEntrySubmitHandler = (e, form) => {
    e.preventDefault();
    this.editEntry(form)
  }

  createEntry = (form) => {
    // debugger
    fetch("https://boredaf-api.herokuapp.com/api/v1/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        journal: {
          date: form.date,
          participants: form.participants,
          learned: form.learned,
          favorite_part: form.favorite_part,
          least_favorite: form.least_favorite,
          would_do_again: form.would_do_again,
          user_id: this.state.userInfo.id,
          activity_id: this.state.activityId
        }
      })
    })
    .then(resp=> resp.json())
    .then(entry => {
      let association = this.state.userInfo.user_activities.filter(association => association.activity_id === this.state.activityId)[0]
      this.fetchUser()
      this.changeTriedOrJournaled(association, true)
      this.props.history.push("/journal");
    })
  }

  editEntry = (form, id) => {
    // debugger
    fetch(`https://boredaf-api.herokuapp.com/api/v1/journals/${form.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        journal: {
          date: form.date,
          participants: form.participants,
          learned: form.learned,
          favorite_part: form.favorite_part,
          least_favorite: form.least_favorite,
          would_do_again: form.would_do_again,
          user_id: this.state.userInfo.id,
          activity_id: this.state.activityId
        }
      })
    })
    .then(resp=> resp.json())
    .then(entry => {
      this.fetchUser()
      this.props.history.push("/journal");
    })
  }

  newActivitySubmitHandler = (e, form) => {
    e.preventDefault();
    let activity = {activity: form.activity, category: form.category, link: form.link }
    this.newActivity(activity, form.saveOrNot)
    this.props.history.push("/saved-activities");

  };

  newActivity = (activity, userWantsActivity) => {
    fetch("https://boredaf-api.herokuapp.com/api/v1/selected_activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity: activity.activity, category: activity.category, link: activity.link})
    })
    .then(resp => resp.json())
    .then(activity => {
      console.log("the activity", activity, "has been added or found")
      userWantsActivity && this.addActivityToUserSaved(activity, this.state.userInfo)
    })
  }

  addActivityToUserSaved = (activity, user) => {
    let body = {activity_id: activity.id , user_id: user.id}

    fetch("https://boredaf-api.herokuapp.com/api/v1/user_activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(association => {
      console.log("the association has been made")
      this.fetchUser()
    })
  }

  setActivityIdForJournal = (activityId) => {
    this.setState({
      activityId: activityId
    })
  }

  createUser = (userInfo) => {
    fetch("https://boredaf-api.herokuapp.com/api/v1/users", {
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

      localStorage.clear()
      localStorage.setItem("token", resp.jwt);
      localStorage.setItem("bored", "af");
      this.setState({
        userLocalStorage: resp.user
      },this.componentDidMount());
    });
  }

  getUser = (userInfo) => {
    // debugger
    fetch("https://boredaf-api.herokuapp.com/api/v1/login", {
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
      localStorage.clear()
      if (resp !== "noUser"){
        localStorage.setItem("bored", "af")
        localStorage.setItem("token", resp.jwt);
      }


      this.setState({
        userLocalStorage: resp.user
      }, this.componentDidMount());
    }).catch(console.log);
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


  componentDidMount(){
    localStorage.token === "undefined" && localStorage.clear()
    if (localStorage.bored){
      let token = localStorage.getItem("token");
      fetch("https://boredaf-api.herokuapp.com/api/v1/current_user", {
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
  }

  showUser = () => {
    setTimeout(() => {this.fetchUser()}, 1)
  }

  fetchUser = () => {
    fetch(`https://boredaf-api.herokuapp.com/api/v1/users/${this.state.userLocalStorage && this.state.userLocalStorage.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(resp =>resp.json()).then(user => {
      if (this.state.userLocalStorage){
        this.setState({
          userInfo: user,
          userSavedActivities: [...this.state.userSavedActivities, ...user.activities]
        })
      }
    })
  }

  changeTriedOrJournaled = (association, fromJournal) => {
    // debugger
    let journalCondition = fromJournal? !association.journaled : association.journaled
    let triedCondition = fromJournal ? association.tried : !association.tried
    let body = {tried: triedCondition , journaled: journalCondition}

    fetch(`https://boredaf-api.herokuapp.com/api/v1/user_activities/${association.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body})
    })
    .then(resp => resp.json())
    .then(changedAssociation => {
      // debugger
      this.fetchUser()
    })
  }

  deleteAssociation = (association, hasBeenJournaled) => {
    fetch(`https://boredaf-api.herokuapp.com/api/v1/delete_association/${association.id}`, {method: "POST"})
    .then(resp => resp.json())
    .then(()=> {
      if (hasBeenJournaled){
        let journalEntry = this.state.userInfo.journals.filter(journal => journal.activity_id === association.activity_id)[0]
        this.deleteJournalEntry(journalEntry, association, false)
      }
      this.fetchUser()
    })
  }

  deleteJournalEntry = (journalEntry, association, fromJournal) => {
// debugger

    fetch(`https://boredaf-api.herokuapp.com/api/v1/delete_journal_entry/${journalEntry.id}`, {method: "POST"})
    .then(resp => resp.json())
    .then((resp)=> {
      // debugger
      // if the request is coming from savedActivities, we will not run the changeTriedOrJournaled.
      fromJournal && this.changeTriedOrJournaled(association, true)
      this.fetchUser()
    })
  }

  filterUserSaved = () => {
    return this.state.userSavedActivities
  }

  logout = () => {
    localStorage.clear()

    this.setState({
      userInfo: null,
      userLocalStorage: null
    }, this.props.history.push("/login"))
  }

  changeForm = (entry) => {
    this.setState({
      userClickedEdit: !this.state.userClickedEdit,
      entryToBeChanged: entry
    })
  }

  render() {
    // console.log("userLocalStorage", this.state.userLocalStorage )
    // console.log("userInfo", this.state.userInfo )
    return (
      <div className="App">
        <video className="myVideo" loop autoPlay muted >
          <source src={video} type="video/mp4"/>
          <source src={video} type="video/ogg"/>
          Your browser does not support the video tag.
        </video>
        {this.state.userLocalStorage && (localStorage.length > 0) && <Logout logout={this.logout}/>}
        <NavBar user={this.state.userInfo}/>
        <Switch>
          <Route
              path="/login"
              render={() => (
                <LoginForm
                  loginSubmitHandler={this.loginSubmitHandler}
                  user={this.state.userLocalStorage}
                />
              )}
            />
          <Route
              path="/signup"
              render={() => (
                <SignUpForm
                  signupFormSubmitHandler={this.signupFormSubmitHandler}
                  user={this.state.userLocalStorage}
                />
              )}
            />
          <Route
              path="/new-activity"
              render={() => (
                <NewActivityContainer
                backToActivities={this.backToActivities}
                newActivitySubmitHandler={this.newActivitySubmitHandler}/>

              )}
            />
            <Route
                path="/new-journal-entry"
                render={() => (
                  <NewJournalEntryContainer
                   user={this.state.userInfo}
                   newJournalEntrySubmitHandler={this.newJournalEntrySubmitHandler}
                  activityId={this.state.activityId}
                  userClickedEdit={this.state.userClickedEdit}
                  entryToBeChanged={this.state.entryToBeChanged}
                  editEntry={this.editEntrySubmitHandler}
                 />
                )}
              />
          <Route
              path="/saved-activities"
              onEnter={this.requireAuth}
              render={() => (
                <SavedActivities
                 setActivityIdForJournal={this.setActivityIdForJournal}
                 delete={this.deleteAssociation}
                 changeTried={this.changeTriedOrJournaled}
                 user={this.state.userInfo}/>
              )}
            />
          <Route
              path="/journal"
              render={() => (
                <Journal
                user={this.state.userInfo}
                deleteJournalEntry={this.deleteJournalEntry}
                activityId={this.state.activityId}
                changeForm={this.changeForm}
               />
              )}
            />
          <Route
              path="/"
              render={() => (
                <ActivityContainer
                  ref={this.child}
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
