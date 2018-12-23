import React, { Component } from 'react';

class Activity extends Component {



// tie filter to state so that we can pass it into our fetch call, have a default filter upon sign-in that will show all activities
//
// {
//   "activity": "Learn Express.js",
//   "accessibility": 0.25,
//   "type": "education",
//   "participants": 1,
//   "price": 0.1,
//   "link": "https://expressjs.com/",
//   "key": "3943506"
// }


  render(){
    return(
      <div draggable="true" className="activity">
        <h5>{this.props.activity.activity}</h5>
        <h5>{this.props.activity.type}</h5>
        <h5>{this.props.activity.participants}</h5>
        <a href={this.props.activity.link && this.props.activity.link} target="_blank" rel="noopener noreferrer">{this.props.activity.link && this.props.activity.link}</a>
        <h5>{this.props.activity.price === 0 ? "Free" : "May cost some money"}</h5>
      </div>
    )
  }


}

export default Activity;
