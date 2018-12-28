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

  makeChoice = (button) => {
    button === 'try' ? this.tryActivity() : this.declineActivity()
  }

  tryActivity = () => {
    this.setState({
      savedActivities:[...this.state.savedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  declineActivity = () => {
    this.setState({
      declinedActivities:[...this.state.declinedActivities, this.state.activity]
    }, this.getNewActivity())
  }

  render(){
    // console.log("seen", this.state.seenActivities)
    // console.log("bye", this.state.declinedActivities)
    // console.log("saved", this.state.savedActivities)
    console.log("in ActivityContainer filter is", this.state.filter)



    return(
      <React.Fragment>
        <div className="ActivityContainer">
          <Filter changeFilter={this.changeFilter}/>
          <Activity activity={this.state.activity} />
          <Choice makeChoice={this.makeChoice}/>
        </div>
      </React.Fragment>
    )
  }


}

// when a user clicks on the plus sign, the activity container should switch

export default ActivityContainer;
