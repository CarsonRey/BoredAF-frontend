import React, { Component } from 'react';
import Activity from '../components/Activity'
import Choice from '../components/Choice'
import Filter from '../components/Filter'

class ActivityContainer extends Component {

  state = {
    activity: {},
    filter: 'all',
    seenActivities: [],
    savedActivities:[],
    declinedActivities: []
  }

  componentDidMount(){
    this.getNewActivity()
  }

  getNewActivity(){
    fetch('https://www.boredapi.com/api/activity')
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
    console.log("seen", this.state.seenActivities)
    console.log("bye", this.state.declinedActivities)
    console.log("saved", this.state.savedActivities)

    return(
      <div className="ActivityContainer">
        <div className="tab">
          <button className="tablinks" onClick={(event) => console.log(event.target.name) } name="all" >All</button>
          <button className="tablinks" onClick={(event) => console.log(event.target.name)} name="nearby">Nearby</button>
          <button className="tablinks" onClick={(event) => console.log(event.target.name)} name="free" >Free</button>
        </div>
        <Activity activity={this.state.activity} />
        <Choice makeChoice={this.makeChoice}/>
        <Filter />
      </div>
    )
  }


}

export default ActivityContainer;
