import React, { Component } from 'react';
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
    }, this.getNewActivity())
  }

  checkFilter = () => {
    if (this.state.filter === null){
      return ''
    } else if (this.state.filter === 'free') {
      return '?price=0.0'
    } else {
      return `?type=${this.state.filter}`
    }
  }

  getNewActivity(){
    fetch(`https://www.boredapi.com/api/activity${this.checkFilter()}`)
    .then(response => response.json())
    .then(activity => {
      // debugger

      this.setState({
        activity: activity,
        seenActivities: [...this.state.seenActivities, activity]
      })
    })
  }

  addActivityToDB = (activity) => {
    fetch("http://localhost:3001/api/v1/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity: activity.activity, category: activity.category})
    })
  }


  makeChoice = (button, activity) => {
    button === 'try' ? this.tryActivity(activity) : this.declineActivity(activity)
  }

  tryActivity = (activity) => {
    this.findOrCreateActivity(activity)
      // pass in activity object to find the activity (by name) that was saved
      // if it is in the DB, we create an association between the current user and the activity
      //if its not, we add the activity to the database and then create the association
    this.setState({
      savedActivities:[...this.state.savedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  findOrCreateActivity = (activity) => {
    fetch("http://localhost:3001/api/v1/selected_activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity: activity.activity, category: activity.type})
    })
    .then(resp => resp.json())
    .then(activity => {
      console.log("after creating the activity", activity);
    })
  }

  addActivityToUserSaved = (activityId, userId) => {
    fetch("http://localhost:3001/api/v1/selected_activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity: activity.activity, category: activity.type})
    })
  }

  declineActivity = () => {
    this.setState({
      declinedActivities:[...this.state.declinedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  createAssociation = () => {

  }

  render(){
    // console.log("activity id is", this.state.seenActivities)
    // console.log("bye", this.state.declinedActivities)
    console.log("saved", this.state.savedActivities)
    // console.log("in ActivityContainer filter is", this.state.filter)



    return(
      <React.Fragment>
        <div className="ActivityContainer">
          <Filter changeFilter={this.changeFilter}/>
          <Activity activity={this.state.activity} />
          <Choice
           activity={this.state.activity}
           newActivityForm={this.props.newActivityForm} makeChoice={this.makeChoice}/>
        </div>
      </React.Fragment>
    )
  }

}


export default ActivityContainer;
