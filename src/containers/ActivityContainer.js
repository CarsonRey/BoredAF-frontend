import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Activity from '../components/Activity'
import Choice from '../components/Choice'
import Filter from '../components/Filter'

class ActivityContainer extends Component {

  state = {
    activity: {},
    filter: null,
    seenActivities: [],
    savedActivities:[],
    declinedActivities: []
  }

  componentDidMount(){
    this.getNewActivity()

  }

  changeFilter = (filter) => {
    this.setState({
      filter: filter === 'all' ? null : filter
    }, this.getNewActivity(filter))
  }

  checkFilter = (filter) => {
    let varOrState = filter ? filter : this.state.filter

    if (varOrState === 'all' || varOrState === null){
      return ''
    } else if (varOrState === 'free') {
      return '?price=0.0'
    } else {
      return `?type=${varOrState}`
    }
  }

  getNewActivity(filter){

    fetch(`https://www.boredapi.com/api/activity${this.checkFilter(filter)}`)
    .then(response => response.json())
    .then(activity => {

      this.setState({
        activity: activity,
        seenActivities: [...this.state.seenActivities, activity]
      })
    })
  }

  makeChoice = (button) => {
    button === 'try' ? this.tryActivity(this.state.activity) : this.declineActivity(this.state.activity)
  }

  tryActivity = (activity) => {
    this.findOrCreateActivity(activity, true)

    this.setState({
      savedActivities:[...this.state.savedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  findOrCreateActivity = (activity, userWantsActivity) => {
    fetch("https://boredaf-api.herokuapp.com/api/v1/selected_activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity: activity.activity, category: activity.type, link: activity.link})
    })
    .then(resp => resp.json())
    .then(activity => {
      userWantsActivity && this.addActivityToUserSaved(activity, this.props.user)
    })
  }

  addActivityToUserSaved = (activity, user) => {
    fetch("https://boredaf-api.herokuapp.com/api/v1/user_activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity_id: activity.id, user_id: user && user.id})
    })
    .then(resp => resp.json())
    .then(association => this.props.updateUser(association.user, activity)).catch(console.log)
  }

  declineActivity = () => {
    this.setState({
      declinedActivities:[...this.state.declinedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  logInOrSignUp = () => {
    return <div className="authPrompt">
            <Link to="/login" >
              Log In
            </Link> or <Link to="/signup" >
              Sign Up </Link> to save activities and journal about them!
          </div>
  }

  render(){
    // console.log("in activitycontainer activity type is", this.state.activity.type)
    // console.log("bye", this.state.declinedActivities)
    // console.log("saved", this.state.savedActivities)
    // console.log("in ActivityContainer filter is", this.state.filter)

    return(
      <React.Fragment>
        <React.Fragment>
          <div>{!this.props.user && this.logInOrSignUp()}</div>

        <div className="ActivityContainer">

          <Filter changeFilter={this.changeFilter}/>
          <Activity activity={this.state.activity} />
          <Choice
           activity={this.state.activity}
           newActivityForm={this.props.newActivityForm} makeChoice={this.makeChoice}/>
        </div>

        </React.Fragment>
      </React.Fragment>
    )
  }

}


export default ActivityContainer;
