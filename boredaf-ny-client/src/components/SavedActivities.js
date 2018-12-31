import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SavedActivities extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  savedActivityInfo = () => {
    return this.props.user.user_activities.length === 0 ? "No saved activities! Click the button below to discover what you can do." : this.returnActivities()
  }

  returnActivities = () => {
    return this.props.user.activities.map(activity => {
      return this.activityHTML(activity)
    } )
  }

  activityHTML = (activity) => {
    // debugger
    return <div className="saved-row">
        <div className="data-activity saved-row" >{activity.activity}</div>
        <div>{activity.category}</div>
        <div className="btn-try tb-btn"  onClick={() => this.changeTriedClickHandler(activity) }>{this.returnAssociation(activity.id)[0].tried ? "Check" : "X"}</div>
        <div className="btn-journal tb-btn">no</div>
      </div>
  }

  changeTriedClickHandler = (activity) => {
    let association = this.returnAssociation(activity.id)[0]
    this.props.changeTried(association)
  }

  returnAssociation = (activityId) => {
    return this.props.user.user_activities.filter(association => association.activity_id === activityId)
  }

  renderButton = (tried) => {

  }




  render(){

    setTimeout(()=>{ console.log(this.props.user)},0)

    return(
      <React.Fragment>
        <div className="formName" >Saved Activities</div>

        <table className="savedActivitiesTable">
          <tr>
            <th className="table-activity">activity</th>
            <th className="table-category">category</th>
            <th className="table-try">tried</th>
            <th className="table-try">journaled</th>
          </tr>
          {/* <div className="savedActivities"> */}
            {this.props.user && this.savedActivityInfo()}
          {/* </div> */}
        </table>

        <Link to="/">
          <div>back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default SavedActivities;
