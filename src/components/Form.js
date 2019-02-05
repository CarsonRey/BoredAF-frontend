import React, { Component } from 'react';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';
import { Link } from "react-router-dom";

class Form extends Component {

constructor(props) {
  super(props)

  let { userClickedEdit, entryToBeChanged } = this.props

  this.state = {
    activity: '',
    link: '',
    category: '',
    saveOrNot: false,
    free: '',
    date: userClickedEdit ? entryToBeChanged.date : '',
    participants: userClickedEdit ? entryToBeChanged.participants : '',
    learned: userClickedEdit ? entryToBeChanged.learned : '',
    favorite_part: userClickedEdit ? entryToBeChanged.favorite_part : '',
    least_favorite: userClickedEdit ? entryToBeChanged.least_favorite : '',
    would_do_again: userClickedEdit ? entryToBeChanged.would_do_again : false,
    id: userClickedEdit && entryToBeChanged !== {} ? entryToBeChanged.id : null
  }
}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  newActivityFormHTML = () => {
    const options = ["Please Select", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]
    return   <form onSubmit={ e => {this.props.newActivity(e, this.state)}} onChange={(e)=> {this.handleChange(e)}} className="form">
      <div className="">new activity</div>
      <label htmlFor="activity">Activity </label>
        <p>Please start the activity with a command/ verb</p>
      <input  name="activity" className="input" type="text"/> <br/>

      <label htmlFor="link">Link </label>
        <p>(optional)</p>
      <input  name="link" className="input" type="text"/> <br/>

      <label htmlFor="category">Category </label> <br/>
      <select  name="category" id="">
        {options.map((option) => <option key={option} value={option.toLowerCase()}  >{option}</option>)}
      </select> <br/>

      {/* <label htmlFor="participants">Participants </label>
          <p>Minmum amount of participants is 1!</p>
      <input className="input" name="participants" type="number"/> */}

      <div  onChange={(e)=> {this.handleChange(e)}} className="">
        <p>Would you like to save this to your activities?</p>
        <div>No <input  className="radio" type="radio"  value={false} defaultChecked name="saveOrNot"/></div>
        <div>Yes <input  className="radio" type="radio"  value={true} name="saveOrNot"/></div>
      </div> <br/>

      {/* <div onChange={(e)=> {this.handleChange(e)}} className="">
        <p>Is this activity free?</p>
        <div>No <input className="radio" type="radio" value={false} defaultChecked name="free"/></div>
        <div>Yes <input className="radio" type="radio" value={true} name="free"/></div>
      </div> <br/> */}

      <input className="input" type="submit" value="Add Activity"/> <br/>

      <Link className="link" to="/" >
        <div className="">cancel</div>
      </Link>

    </form>
  }

  returnActivityName = (activityId) => {

      return this.props.user && this.props.user.activities.filter(activity => activity.id === activityId)[0].activity

  }

  journalEntryFormHTML = () => {
    return <form  onChange={(e)=> {this.handleChange(e)}} className="form">

      <label htmlFor="date">When did you... <br/> <span className="specific-activity"  >{this.returnActivityName(this.props.activityId)}</span>?</label>
      <input value={this.state.date}  name="date" className="input" type="date"/>

      <label htmlFor="participants">Who were you with?</label>
      <input value={this.state.participants} name="participants" className="input" type="text"/>

      <label htmlFor="learned">What did you learn?</label>
      <textarea value={this.state.learned} name="learned" className="input" id="" cols="30" rows="10"/>

      <label htmlFor="favorite_part">Favorite part?</label>
      <input value={this.state.favorite_part} name="favorite_part" className="input" type="text"/>

      <label htmlFor="least_favorite">Least favorite?</label>
      <input value={this.state.least_favorite} name="least_favorite" className="input" type="text"/>

      <div onChange={(e)=> {this.handleChange(e)}} className="">
        <p>Would you do it again?</p>
        <div>No <input className="radio" type="radio" value={false} defaultChecked name="would_do_again"/></div>
        <div>Yes <input className="radio" type="radio" value={true} name="would_do_again"/></div>
      </div>
{
  this.props.userClickedEdit ?
  <input className="input" type="submit" value="Edit Journal Entry" onClick={ e => {this.props.editEntry(e, this.state)}} />
  :
  <input className="input" type="submit" value="New Journal Entry" onClick={ e => {this.props.newEntry(e, this.state)}}/>
}



      <Link to="/saved-activities" >
        <div className="">cancel</div>
      </Link>

    </form>
  }

  // when a user clicks on the button to write a journal, it should
  // set the state in app to the activity_id of the association that the user clicked
  // bring them to the route for newjournalEntry
  // that form will get the prop of user and a prop of the activity_id so that the form can search through the user, find that matching activity and display it for the form!

  render(){
  console.log("in form",this.props.entryToBeChanged)
  // console.log("in form, the activityid is",this.props.activityId)

    return(
        <React.Fragment>
          {this.props.context === "NewActivityContainer" ? this.newActivityFormHTML() : this.journalEntryFormHTML()}
      </React.Fragment>
    )
  }
}

export default Form;
