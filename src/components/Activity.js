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
  //
  // sample = (array) => {
  //   return array[Math.floor ( Math.random() * array.length )]
  // }
  //



  render(){
    let {activity} = this.props
    return(
      <div className="center-activity">
        <div draggable="true" className="activity">
          <h3 className={activity.activity && activity.activity.split("").length > 30 ? "longActivity" : "shortActivity"}>{activity.activity}<br/>
            <a href={activity.link && activity.link} target="_blank" rel="noopener noreferrer">{activity.link && activity.link}</a>
          </h3>
        </div>
      </div>
    )
  }


}

export default Activity;
