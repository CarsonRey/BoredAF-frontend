import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SavedActivities extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  savedActivityInfo = () => {
    return this.props.user.user_activities.length === 0 ? "No saved activities! Click the button below to discover what you can do." : this.returnActivities()
  }

  returnActivities = () => {
    let associations = this.props.user.user_activities
    let sortedAssociations = associations.sort(function(a, b){return a - b})
    return sortedAssociations.map(association => {
      return this.activityHTML(association)
    } )
  }

  sortAssociationsByUpdated = () => {

  }

  activityHTML = (association) => {
    let activity = this.returnActivity(association.activity_id)[0]
    // debugger
    return <div className="saved-row">
        <div className="td data-activity saved-row" >{activity.activity}</div>
        {/* <div className="activity-info"> */}
          <div className="td data-category">{activity.category}</div>
          <div className="td btn-try tb-btn"  onClick={() => this.props.changeTried(association)}>{association.tried ? "✓" : "✘"}</div>
          <div className="td btn-journal tb-btn">✏️</div>
          <div className="delete" onClick={()=> this.props.delete(association)}>x</div>
        {/* </div> */}

      </div>
  }

  // 📝 or 📖

  // changeTriedClickHandler = (activity) => {
  //   let association = this.returnAssociation(activity.id)[0]
  //   this.props.changeTried(association)
  // }

  returnActivity = (activityId) => {
    return this.props.user.activities.filter(activity => activity.id === activityId)
  }

  render(){

    setTimeout(()=>{ console.log(this.props.user)},0)

    return(
      <React.Fragment>
        <div className="formName" >Saved Activities</div>
        <div className="headers">
          <div className="th table-activity">activity</div>
          <div className="th table-category">category</div>
          <div className="th table-try">tried</div>
          <div className="th table-journal">journal</div>
        </div>
        <div className="savedActivitiesTable">

          <div className="savedActivities">
            {this.props.user && this.savedActivityInfo()}
          </div>
        </div>

        <Link className="link" to="/">
          <div className="navitem">back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default SavedActivities;
