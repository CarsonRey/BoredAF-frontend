import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SavedActivities extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  render(){
    return(
      <React.Fragment>
        <div>Saved Activities</div>
        <Link to="/">
          <div>back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default SavedActivities;
