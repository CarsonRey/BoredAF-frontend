import React, { Component } from 'react';
import Activity from '../components/Activity'
import Choice from '../components/Choice'

class ActivityContainer extends Component {

  state = {
    activity: {},
    filter: 'all',
    seenActivities: []
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
    return(
      <div className="ActivityContainer">
        <Activity activity={this.state.activity} />
        <Choice />
      </div>
    )
  }


}

export default ActivityContainer;
