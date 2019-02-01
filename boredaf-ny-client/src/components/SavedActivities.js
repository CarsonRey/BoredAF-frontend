import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class SavedActivities extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  savedActivityInfo = () => {
    if (localStorage.length)
      return this.props.user.user_activities.length === 0 ? this.noSavedActivities() : this.returnActivities()


  }

  noSavedActivities = () => {
    return <h2 className="noneMessage">
      No saved activities! <br/> Click the button below to discover activities <br/> ⇓
    </h2>
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
    // debugger
    let activity = this.returnActivity(association.activity_id)[0]
    return <div key={activity}className="saved-row">
        <div className="td data-activity" >{activity.activity}</div>
        {/* <div className="activity-info"> */}
          <div className="td data-category">{activity.category}</div>
          <span role="img" alt={association.tried? "thumbs up": "thumbs down"} className="td btn-try tb-btn"  onClick={() => this.props.changeTried(association, false)}>{association.tried ? "👍" : "👎"}</span>

          {association.journaled && association.journaled !== null ?
            <Link className="link" onClick={()=> {this.props.setActivityIdForJournal(activity.id)}} to="/journal">
            <span role="img" aria-label="book" className="td btn-journal tb-btn">📖</span>
            </Link>
              :
              <Link className="link" onClick={()=> {this.props.setActivityIdForJournal(activity.id)}} to="/new-journal-entry">
              <span role="img" aria-label="pencil" className="td btn-journal tb-btn">✏️</span>
              </Link>


              }

          <div className="delete" onClick={()=> this.alertMessage(association, association.journaled) }>x</div>
        {/* </div> */}

      </div>
  }

  alertMessage = (association, hasBeenJournaled) => {
    if (hasBeenJournaled){
      if (window.confirm("Deleting an activity with that has been journaled will also delete it's journal entry, are you sure you want to continue?")) {
       this.props.delete(association, hasBeenJournaled)
       }
    } else{
      this.props.delete(association, hasBeenJournaled)
    }

  }

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
        <div className="container">

          <div className="info">
            {/* {this.props.user ? this.savedActivityInfo() : setTimeout(()=> <Redirect to="/login"/>, 100)} */}
            {localStorage.length ? this.savedActivityInfo() :  <Redirect to="/login"/>}
          </div>
        </div>

        <Link className="link" to="/">
          <div className="navitem swipe">back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default SavedActivities;
