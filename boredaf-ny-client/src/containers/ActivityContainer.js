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
    fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(activity => {
      this.setState({
        activity: activity,
        seenActivities: [...this.state.seenActivities, activity]
      })
    })
  }

  render(){
    console.log(this.state.seenActivities)
    return(
      <div className="ActivityContainer">
        <div className="tab">
          <button className="tablinks" onClick={(event) => {
            (event.target).toggleClass("active")
          } } name="all" >All</button>
          <button className="tablinks" onClick={(event) => console.log(event.target.name)} name="nearby">Nearby</button>
          <button className="tablinks" onClick={(event) => console.log(event.target.name)} name="free" >Free</button>
        </div>
        <Activity activity={this.state.activity} />
        <Choice />
        <Filter />
      </div>
    )
  }


}

export default ActivityContainer;
