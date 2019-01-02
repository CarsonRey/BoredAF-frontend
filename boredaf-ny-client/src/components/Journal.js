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

  journalEntryHTML = (entry) => {
    return <div className="entry">
    <div className="entry">
      {this.returnActivity(entry.activity_id)}
    </div>
    </div>
  }

  returnActivity = (activityId) => {
    return this.props.user.activities.filter(activity => activity.id === activityId)[0].activity
  }




  render(){
    console.log(this.props.user)
    return(
      <React.Fragment>
        <div>Journal Entries</div>
        <div className="journalEntryContainer">
          <div className="journalEntries">
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
