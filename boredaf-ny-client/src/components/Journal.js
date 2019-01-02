import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Journal extends Component {


  // this will have a user prop passed down from app where we can access the user's activivies and iterate through them;
  // display activity, states and button that says "tried yet?"

  journalEntriesInfo = () => {
    return this.props.user.journals.length === 0 ? this.noJournalEntries() : this.returnActivities()
  }

  noJournalEntries = () => {
    return <div className="noneMessage">
      You haven't written any entries yet! Check your <Link to="/saved-activities">saved activities</Link> to journal about a specific activity.
    </div>
  }

  returnJournalEntries = () => {
    let journalEntries = this.props.user.journals

  }

  journalEntryHTML = (journalEntry) => {

  }


  render(){
    console.log(this.props.user)
    return(
      <React.Fragment>
        <div>Journal Entries</div>
        <div className="journalEntries">
            {this.props.user && this.journalEntriesInfo()}
        </div>
        <Link className="link" to="/">
          <div className="navitem">back to swiping!</div>
        </Link>
      </React.Fragment>
    )
  }
}

export default Journal;
