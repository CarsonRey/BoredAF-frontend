import React, { Component } from 'react';
import { Link , Redirect} from "react-router-dom";

class Journal extends Component {


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

        <div className="journalEntry td data-activity" >
        <span className="journal-activity">{this.returnActivity(entry.activity_id)}</span> <br/> <br/>
        When:  <span className="entryText">{entry.date}</span> <br/>
        Who:  <span className="entryText">{entry.participants}</span> <br/>
        Learned:  <span className="entryText">{entry.learned}</span> <br/>
        Favorite part: <span className="entryText">{entry.favorite_part}</span> <br/>
        Least favorite:  <span className="entryText">{entry.least_favorite} </span><br/>
        </div>

        <div className="btn-position">
          <Link className="link"  to="/">
            <span className="journal-btn td btn-try tb-btn" >edit</span>
          </Link>
          <Link  className="link"  to="/journal">
            <span className="journal-btn delete" onClick={() => this.props.deleteJournalEntry(entry, association, true)} >x</span>
          </Link>
        </div>

          {/* <div className="delete" onClick={()=> this.props.delete(association)}>x</div> */}
      </div>
    }

  render(){
    console.log(this.props.user)
    return(
      <React.Fragment>
        <div className="formName">Journal Entries</div>
        <div className="headers">
          <div className="th table-activity-j">activity</div>
          <div className="th table-try">edit</div>
          <div className="th table-journal">delete</div>
        </div>
        <div className="container">
          <div className="info">
              { this.props.user? this.journalEntriesInfo() : <Redirect to="login"/>}
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