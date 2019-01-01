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

      this.setState({
        activity: activity,
        seenActivities: [...this.state.seenActivities, activity]
      })
    })
  }

  makeChoice = (button, activity) => {
    button === 'try' ? this.tryActivity(activity) : this.declineActivity(activity)
  }

  tryActivity = (activity) => {
    this.findOrCreateActivity(activity)

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
      this.addActivityToUserSaved(activity, this.props.user)
    })
  }

  addActivityToUserSaved = (activity, user) => {
    fetch("http://localhost:3001/api/v1/user_activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({activity_id: activity.id, user_id: user.id})
    })
    .then(resp => resp.json())
    .then(association => this.props.updateUser(association.user, activity))
  }

  declineActivity = () => {
    this.setState({
      declinedActivities:[...this.state.declinedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  render(){
    // console.log("activity id is", this.state.seenActivities)
    // console.log("bye", this.state.declinedActivities)
    // console.log("saved", this.state.savedActivities)
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
