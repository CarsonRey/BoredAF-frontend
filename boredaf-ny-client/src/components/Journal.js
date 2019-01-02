import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Journal extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  journalEntriesInfo = () => {

    return this.props.user.journals.length === 0 ? this.noJournalEntries() : this.returnJournalEntries()
  }

  noJournalEntries = () => {
    return <h2 className="noneMessage">
      You haven't written any entries yet! Check your <Link to="/saved-activities">saved activities</Link> to journal about a specific activity.
    </h2>
  }

  returnJournalEntries = () => {

    let journalEntries = this.props.user.journals
    return journalEntries.map(entry => this.journalEntryHTML(entry) )
  }

  returnActivity = (activityId) => {
    // debugger
    return this.props.user.activities.filter(activity => activity.id === activityId)[0].activity
  }

  returnAssociation = (entry) => {
    // debugger
    return this.props.user.user_activities.filter(association => association.activity_id === entry.activity_id)[0]
  }

  journalEntryHTML = (entry) => {
    let association = this.returnAssociation(entry)
    return   <div className="saved-row">
        <div className="td data-activity" > {this.returnActivity(entry.activity_id)} <br/>
        When: {entry.date} <br/>
        Who: {entry.participants} <br/>
        Learned: {entry.learned} <br/>
        Favorite part:{entry.favorite_part} <br/>
        Least favorite: {entry.least_favorite} <br/>
        </div>
          <Link className="link"  to="/">
          <span className="journal-btn td btn-try tb-btn" >edit</span>
          </Link>
          <Link  className="link"  to="/journal">
          <span className="delete" onClick={() => this.props.deleteJournalEntry(entry, association)} >x</span>
          </Link>
          {/* <div className="delete" onClick={()=> this.props.delete(association)}>x</div> */}
      </div>
    }













  render(){
    console.log(this.props.user)
    return(
      <React.Fragment>
        <div>Journal Entries</div>
        <div className="headers">
          <div className="th table-activity">activity</div>
          <div className="th table-try">edit</div>
          <div className="th table-journal">delete</div>
        </div>
        <div className="container">
          <div className="info">
              {this.props.user && this.journalEntriesInfo()}
          </div>
        </div>

        <Link className="link" to="/">
          <div className="navitem swipe">back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default Journal;
