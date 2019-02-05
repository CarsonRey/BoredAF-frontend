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
    // const suggest = ["Do you want to...?", "How about you...? ", "Why don't you try to...? ", "Give... a go!"]
// this.sample(suggest).split("...").join(`
    return(
      <div draggable="true" className="activity">
        <h3>{this.props.activity.activity} <br/>
          <a href={this.props.activity.link && this.props.activity.link} target="_blank" rel="noopener noreferrer">{this.props.activity.link && this.props.activity.link}</a>
        </h3>
        {/* <h5>{this.props.activity.type}</h5>
        <h5>{this.props.activity.participants}</h5> */}

        {/* <h5>{this.props.activity.price === 0 ? "Free" : "May cost some money"}</h5> */}
      </div>
    )
  }


}

export default Activity;