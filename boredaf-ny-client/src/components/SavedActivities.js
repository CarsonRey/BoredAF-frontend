import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SavedActivities extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"
  returnActivities = () => {
    this.props.user.activities.map(activity => <div>activity.activity</div>)
  }

  // we have access to the user prop which only has the id, username and password_digest.
  // we might have to fetch the user by the id (with a show method in user_controller) and get the activities from the response
  // with that response we can iterate over the activities and display them

  render(){
    console.log("user prop of SavedActivities",this.props.user);
    return(
      <React.Fragment>
        <div className="formName" >Saved Activities</div>
        <div>
          {/* {this.props.user.activities.length === 0 ? "No saved activities! Click the button below to discover what you can do." : this.returnActivities()} */}
        </div>
        <Link to="/">
          <div>back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default SavedActivities;
